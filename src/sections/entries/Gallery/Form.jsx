import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import * as Yup from "yup";
import { RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { Upload } from "../../../components/upload";
import { createBlog, updateBlog } from "../../../redux/slices/blogSlice";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import { fetchInclusive } from "../../../redux/slices/inclusiveSlice";

const Form = ({
  handleClose,
  data,
  isEdit = false,
  refresh,
  setRefresh,
  isView = false,
}) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState(null);

  const [content, setContent] = useState(null);

  const [variants, setVairants] = useState([
    {
      size_id: "",
      price: "",
      selling_price: "",
      color_id: "",
    },
  ]);
  const [documents, setDocuments] = useState([]);

  // TODO: get the data from slice

  const createProductLoading = useSelector((state) => state.product.isLoading);
  const inclusives = useSelector((state) => state.inclusive.inclusive);
  const sizes = useSelector((state) => state.size.sizes);
  const categories = useSelector((state) => state.category.categories);
  const mainCategories = useSelector((state) => state.category.mainCategories);
  const colors = useSelector((state) => state.color.colors);

  const Schema = Yup.object().shape({
    country: Yup.string().required("Fact's country is required"),
    duration: Yup.string().required("Fact's duration is required"),
    difficulty: Yup.string().required("Fact's difficulty is required"),
    activity: Yup.string().required("Fact's activity is required"),
    altitude: Yup.string().required("Fact's altitude is required"),
    best_season: Yup.string().required("Fact's best_season is required"),
    accomodation: Yup.string().required("Fact's accomodation is required"),
    meals: Yup.string().required("Fact's meals is required"),
    start_end_point: Yup.string().required(
      "Fact's start_end_point is required"
    ),
    package_id: Yup.string().required("Fact's package_id is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      title: data?.title || "",
      duration: data?.duration || "",
      description: data?.description || "",
      image: data?.image || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });
  console.log(defaultValues, data);
  const { handleSubmit, reset, watch, setValue } = methods;

  // TODO: useEffects, write the useEffect codes here

  // TODO: fetch the brand, categories, size and color
  useEffect(() => {
    dispatch(fetchInclusive({ enqueueSnackbar, page: 0, limit: 100 }));
    dispatch(fetchCategories({ enqueueSnackbar }));
  }, [dispatch, enqueueSnackbar]);

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

  const onCreateVehicle = (values) => {
    // TODO: dispatch the action to create a product
    const formData = new FormData();
    if (values?.title) {
      const slug = slugify(values.title, {
        lower: true,
        remove: /[*+~.()'"!:@]/,
        strict: true,
      });
      formData.append("slug", slug);
    }
    const jsonContent = JSON.stringify(content);

    formData.append("category_id", values.category_id);

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("content", jsonContent);
    // formData.
    if (photo) {
      formData.append("image", photo);
    }

    dispatch(createBlog({ data: formData, enqueueSnackbar, handleClose }));
  };

  const onUpdateProduct = (values) => {
    dispatch(
      updateBlog({
        data: values,
        enqueueSnackbar,
        handleClose,
        id: data?.id,
        setRefresh,
      })
    );
  };

  useMemo(() => {
    console.log(data);
    setDescription(data?.description);
    setPhoto(data?.image);
  }, [data]);
  console.log(defaultValues?.category_id);

  return (
    <Box p={3}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(isEdit ? onUpdateProduct : onCreateVehicle)}
      >
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          }}
        >
          {/* <Autocomplete
            defaultValue={defaultValues?.category_id}
            disabled={isView}
            name="category_id"
            disablePortal
            id="combo-box-main-category"
            options={
              categories?.data?.map((page) => ({
                label: page?.name,
                id: page?.id,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField
                name={"category_id"}
                {...params}
                label="Category *"
                disabled={isView}
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue("category_id", newValues ? newValues.id : null)
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          /> */}
          <Autocomplete
            defaultValue={defaultValues?.category_id}
            disabled={isView}
            name="package_id"
            disablePortal
            id="combo-box-main-package"
            options={
              categories?.data?.map((page) => ({
                label: page?.name,
                id: page?.id,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField
                name={"package_id"}
                {...params}
                label="Package *"
                disabled={isView}
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue("package_id", newValues ? newValues.id : null)
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
          <Autocomplete
            defaultValue={defaultValues?.category_id}
            disabled={isView}
            name="vehicle_id"
            disablePortal
            id="combo-box-main-package"
            options={
              categories?.data?.map((page) => ({
                label: page?.name,
                id: page?.id,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField
                name={"vehicle_id"}
                {...params}
                label="Vehicle *"
                disabled={isView}
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue("vehicle_id", newValues ? newValues.id : null)
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
        </Box>
        <Box mt={3}>
          <Upload
            isAvatar={false}
            text={"Upload picture"}
            file={photo || defaultValues.photo}
            name="photo"
            accept="image/*"
            maxSize={1}
            onDrop={handleDropPhoto}
          />
        </Box>{" "}
        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createProductLoading}
            disabled={createProductLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update blog" : "Create blog"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
