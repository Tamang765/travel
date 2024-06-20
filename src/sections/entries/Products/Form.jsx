import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Divider, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  RHFEditor,
  RHFSwitch,
  RHFTextField,
} from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import Iconify from "../../../components/iconify";
import { Upload } from "../../../components/upload";
import { fetchBrands } from "../../../redux/slices/brandSlice";
import {
  fetchCategories,
  fetchMainCategories,
} from "../../../redux/slices/categorySlice";
import { fetchColors } from "../../../redux/slices/colorSlice";
import {
  createProduct,
  updateProduct,
} from "../../../redux/slices/productSlice";
import { fetchSizes } from "../../../redux/slices/sizeSlice";
import { appendFormValuesToFormData } from "../../../utils/appendFormData";

const Form = ({ handleClose, data, isEdit = false }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [photo, setPhoto] = useState(null);
  const [variants, setVairants] = useState([
    {
      size_id: "",
      price: "",
      selling_price: "",
      color_id: "",
    },
  ]);
  const [documents, setDocuments] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [filteredSubCategoryData, setFilteredSubCategoryData] = useState([]);

  // TODO: get the data from slice

  const createProductLoading = useSelector((state) => state.product.isLoading);
  const brands = useSelector((state) => state.brand.brands);
  const sizes = useSelector((state) => state.size.sizes);
  const categories = useSelector((state) => state.category.categories);
  const mainCategories = useSelector((state) => state.category.mainCategories);
  const colors = useSelector((state) => state.color.colors);

  const Schema = Yup.object().shape({
    name: Yup.string().required("product's name is required"),
    sku: Yup.string().required("product's sku is required"),
    main_category_id: Yup.string().required("who the product is intended for?"),
    sub_category_id: Yup.string().required("select the product's category"),
    brand_id: Yup.string().required("product's brand is required"),
    description: Yup.string().required("product's description is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      name: data?.name || "",
      sku: data?.sku || "",
      brand_id: data?.brand?.id || "",
      category_id: data?.category?.id || "",
      description: data?.description || "",
      status: data?.status || 0,
      featured: data?.featured || 0,
      new: data?.new || 0,
      trending: data?.trending || 0,
      galleries: data?.gallery || [],
      photo: data?.photo || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { handleSubmit, reset, watch, setValue } = methods;
  const selectedMainCategory = watch("main_category_id");

  // TODO: useEffects, write the useEffect codes here

  // TODO: fetch the brand, categories, size and color
  useEffect(() => {
    dispatch(fetchBrands({ enqueueSnackbar, page: 0, limit: 100 }));
    dispatch(fetchCategories({ enqueueSnackbar, page: 0, limit: 1000 }));
    dispatch(fetchMainCategories({ enqueueSnackbar }));
    dispatch(fetchSizes({ enqueueSnackbar, page: 0, limit: 100 }));
    dispatch(fetchColors({ enqueueSnackbar, page: 0, limit: 100 }));
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    setGalleries(data?.gallery || []);

    if (isEdit && data) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, data]);

  useEffect(() => {
    const newVariants = data?.variations?.map((variation) => ({
      size_id: variation?.size_id,
      price: variation?.price,
      selling_price: variation?.selling_price,
      color_id: variation?.color_id,
    }));

    if (newVariants?.length) {
      setVairants(newVariants);
    }
  }, [data?.variations]);

  React.useEffect(() => {
    if (selectedMainCategory) {
      const filteredSubCategories = categories?.data
        ?.filter((category) => category.parent_id === selectedMainCategory)
        ?.map((category) => ({
          label: category?.name,
          value: category?.id,
        }));

      setFilteredSubCategoryData(filteredSubCategories);
      setValue("sub_category_id", ""); // Clear sub-category selection when main category changes
    }
  }, [selectedMainCategory, categories, setValue]);

  // ======

  // TODO: functions

  // TODO: handle upload image
  const handleDropPhoto = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setPhoto(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
      setPhoto(acceptedFiles[0]);
    }
  }, []);

  // TODO: handle upload galleries

  const handleDropGallery = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setDocuments((prev) => [
        ...prev,
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
          key: prev.length,
        }),
      ]);
    }
  }, []);

  // TODO: handle add and remove variants
  const handleAddFields = () => {
    setVairants((prev) => [
      ...prev,
      { size_id: "", price: "", selling_price: "", color_id: "" },
    ]);
  };

  const handleRemoveFields = (index) => {
    setVairants((prev) => prev.filter((_, i) => i !== index));
  };

  const onCreateProduct = (values) => {
    // TODO: dispatch the action to create a product
    const formData = new FormData();

    appendFormValuesToFormData(formData, {
      ...values,
      status: values.status ? 1 : 0,
      trending: values.trending ? 1 : 0,
      new: values.new ? 1 : 0,
      featured: values.featured ? 1 : 0,
      category_id: values?.sub_category_id,
    });

    if (photo) {
      formData.append("photo", photo);
    }

    if (documents.length) {
      documents.forEach((doc) => {
        formData.append("gallery[]", doc);
      });
    }

    variants.forEach((v, index) => {
      Object.keys(v).forEach((each) => {
        formData.append(`variations[${index}][${each}]`, v[each]);
      });
    });

    dispatch(createProduct({ data: formData, enqueueSnackbar, handleClose }));
  };

  const onUpdateProduct = (values) => {
    // TODO: dispatch the action to update a product
    const formData = new FormData();

    appendFormValuesToFormData(formData, {
      ...values,
      status: values.status ? 1 : 0,
      trending: values.trending ? 1 : 0,
      new: values.new ? 1 : 0,
      featured: values.featured ? 1 : 0,
    });

    if (photo) {
      formData.append("photo", photo);
    }

    if (documents.length) {
      documents.forEach((doc) => {
        formData.append("gallery[]", doc);
      });
    }

    variants.forEach((v, index) => {
      Object.keys(v).forEach((each) => {
        formData.append(`variations[${index}][${each}]`, v[each]);
      });
    });

    dispatch(
      updateProduct({
        data: formData,
        enqueueSnackbar,
        handleClose,
        id: data?.slug,
      })
    );
  };

  // console.log

  return (
    <Box p={3}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(isEdit ? onUpdateProduct : onCreateProduct)}
      >
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(3, 1fr)",
          }}
        >
          <RHFTextField name={"name"} label={"Product's name *"} />
          <RHFTextField name={"sku"} label={"Product's sku *"} />

          {/* TODO: brand */}
          <Autocomplete
            defaultValue={{
              label: data?.brand?.name || "",
              id: data?.brand?.id || "",
            }}
            name="brand_id"
            disablePortal
            id="combo-box-demo"
            options={
              brands?.data?.map((brand) => ({
                label: brand?.name,
                id: brand?.id,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField
                name={"brand_id"}
                {...params}
                label="Search brand *"
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue("brand_id", newValues ? newValues.id : null)
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />

          {/* TODO: main category */}
          <Autocomplete
            defaultValue={{
              label: data?.category?.name || "",
              id: data?.category?.id || "",
            }}
            name="main_category_id"
            disablePortal
            id="combo-box-demo"
            options={
              mainCategories?.data?.map((category) => ({
                label: category?.name,
                id: category?.id,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField
                name={"main_category_id"}
                {...params}
                label="Who is this product intended for? *"
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue(
                "main_category_id",
                newValues ? newValues.id : null
              )
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
          {/* TODO: sub category */}
          <Autocomplete
            disabled={!selectedMainCategory}
            defaultValue={{
              label: data?.category?.name || "",
              id: data?.category?.id || "",
            }}
            name="sub_category_id"
            disablePortal
            id="combo-box-demo"
            options={
              filteredSubCategoryData?.map((category) => ({
                label: category?.label,
                id: category?.value,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField
                name={"sub_category_id"}
                {...params}
                label="Search category *"
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue(
                "sub_category_id",
                newValues ? newValues.id : null
              )
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
        </Box>

        <Stack mt={3}>
          <Divider />

          <span className="mt-3">Stasuses</span>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(2, 1fr)",
              sm: "repeat(4, 1fr)",
            }}
          >
            <div className="border-2 w-fit p-2 rounded-xl">
              <RHFSwitch
                name={"status"}
                label={<span>Make the product visible?</span>}
                labelPlacement="start"
              />
            </div>

            <div className="border-2 w-fit p-2 rounded-xl">
              <RHFSwitch
                name={"featured"}
                label={<span>Is this featured product?</span>}
                labelPlacement="start"
              />
            </div>

            <div className="border-2 w-fit p-2 rounded-xl">
              <RHFSwitch
                name={"trending"}
                label={<span>Is this trending product?</span>}
                labelPlacement="start"
              />
            </div>

            <div className="border-2 w-fit p-2 rounded-xl">
              <RHFSwitch
                name={"new"}
                label={<span>Is this new product?</span>}
                labelPlacement="start"
              />
            </div>
          </Box>
        </Stack>

        <Stack mt={3}>
          <Divider />

          <span className="mt-3">Write description *</span>
          <RHFEditor
            placeholder="Write description here..."
            name={"description"}
          />
        </Stack>

        <Stack mt={3}>
          <Divider />
          <span className="mt-3">Variations</span>

          <Stack gap={3}>
            {variants?.map((size, index) => {
              return (
                <Stack
                  key={index}
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={5}
                >
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <div className="flex-1">
                      <Autocomplete
                        fullWidth
                        key={
                          sizes?.data?.find((s) => s?.id === size?.size_id)?.id
                        }
                        defaultValue={
                          sizes?.data?.find((s) => s?.id === size?.size_id)
                            ?.name
                        }
                        name="size_id"
                        disablePortal
                        id="combo-box-demo"
                        options={
                          sizes?.data?.map((s) => ({
                            label: s?.name,
                            id: s?.id,
                          })) || []
                        }
                        renderInput={(params) => (
                          <RHFTextField
                            value={size?.size_id}
                            name={"size_id"}
                            {...params}
                            label="Search Size *"
                          />
                        )}
                        onChange={(event, newValues) => {
                          setVairants((prev) => {
                            return prev?.map((field, i) => {
                              if (i === index) {
                                return {
                                  ...field,
                                  size_id: newValues?.id,
                                };
                              } else {
                                return field;
                              }
                            });
                          });
                        }}
                        renderOption={(props, option) => (
                          <li {...props} key={option.id}>
                            {option.label}
                          </li>
                        )}
                      />
                    </div>
                    <Divider style={{ width: "3%" }} />

                    <div className="flex-1">
                      <Autocomplete
                        fullWidth
                        key={
                          colors?.data?.filter(
                            (s) => s?.id === size?.color_id
                          )?.[0]?.name
                        }
                        defaultValue={
                          colors?.data?.filter(
                            (s) => s?.id === size?.color_id
                          )?.[0]?.name
                        }
                        name="color_id"
                        disablePortal
                        id="combo-box-demo"
                        options={
                          colors?.data?.map((h) => ({
                            label: h?.name,
                            id: h?.id,
                          })) || []
                        }
                        renderInput={(params) => (
                          <RHFTextField
                            value={size.id}
                            name={"color_id"}
                            {...params}
                            label="Search Color *"
                          />
                        )}
                        onChange={(event, newValues) => {
                          setVairants((prev) => {
                            return prev?.map((field, i) => {
                              if (i === index) {
                                return {
                                  ...field,
                                  color_id: newValues?.id,
                                };
                              } else {
                                return field;
                              }
                            });
                          });
                        }}
                        renderOption={(props, option) => (
                          <li {...props} key={option.id}>
                            {option.label}
                          </li>
                        )}
                      />
                    </div>

                    <Divider style={{ width: "3%" }} />

                    <div className="flex-1">
                      <RHFTextField
                        value={size?.price}
                        // key={row?.variations?.[index]?.price}
                        defaultValue={data?.variations?.[index]?.price}
                        fullWidth
                        onChange={(event) => {
                          setVairants((prev) => {
                            return prev?.map((field, i) => {
                              if (i === index) {
                                return {
                                  ...field,
                                  price: event.target.value,
                                };
                              } else {
                                return field;
                              }
                            });
                          });
                        }}
                        type="number"
                        name="price"
                        label="Price *"
                      />
                    </div>

                    <Divider style={{ width: "3%" }} />

                    <div className="flex-1">
                      <RHFTextField
                        value={size?.selling_price}
                        key={data?.variations?.[index]?.selling_price}
                        defaultValue={data?.variations?.[index]?.selling_price}
                        fullWidth
                        onChange={(event) => {
                          setVairants((prev) => {
                            return prev?.map((field, i) => {
                              if (i === index) {
                                return {
                                  ...field,
                                  selling_price: event.target.value,
                                };
                              } else {
                                return field;
                              }
                            });
                          });
                        }}
                        type="number"
                        name="selling_price"
                        label="Selling Price *"
                      />
                    </div>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={2}>
                    <Button
                      onClick={() => handleRemoveFields(index)}
                      disabled={variants?.length === 1}
                    >
                      <Iconify icon="streamline:subtract-1-solid" />
                    </Button>

                    <Button
                      onClick={handleAddFields}
                      disabled={
                        variants.slice(-1)[0].size_id === "" ||
                        variants.slice(-1)[0].color_id === "" ||
                        variants.slice(-1)[0].selling_price === "" ||
                        variants.slice(-1)[0].price === ""
                      }
                    >
                      <Iconify icon="teenyicons:add-solid" />
                    </Button>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>

        <Box mt={3}>
          <Stack flexDirection={"row"} gap={3}>
            <Upload
              isAvatar={false}
              text={"Upload picture"}
              file={photo || defaultValues.photo}
              name="photo"
              accept="image/*"
              maxSize={1}
              onDrop={handleDropPhoto}
            />

            <Upload
              maxSize={1}
              onRemove={(file) =>
                setDocuments((prev) => prev.filter((f) => f.key !== file.key))
              }
              thumbnail={true}
              files={
                documents?.length ? [...galleries, ...documents] : galleries
              }
              multiple={true}
              text="Drop or Select Photos"
              name="gallery"
              onDrop={handleDropGallery}
            />
          </Stack>
        </Box>

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createProductLoading}
            disabled={createProductLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update Product" : "Create Product"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
