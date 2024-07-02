import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFTextArea, RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { Upload } from "../../../components/upload";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import { fetchColors } from "../../../redux/slices/colorSlice";
import { fetchInclusive } from "../../../redux/slices/inclusiveSlice";
import { updateProduct } from "../../../redux/slices/productSlice";
import { fetchSizes } from "../../../redux/slices/sizeSlice";
import { createVehicle } from "../../../redux/slices/vehicleSlice";
import { appendFormValuesToFormData } from "../../../utils/appendFormData";

const Form = ({ handleClose, data, isEdit = false, refresh, setRefresh }) => {
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

  // TODO: get the data from slice

  const createProductLoading = useSelector((state) => state.product.isLoading);
  const inclusives = useSelector((state) => state.inclusive.inclusive);
  const sizes = useSelector((state) => state.size.sizes);
  const categories = useSelector((state) => state.category.categories);
  const mainCategories = useSelector((state) => state.category.mainCategories);
  const colors = useSelector((state) => state.color.colors);

  const Schema = Yup.object().shape({
    name: Yup.string().required("vehicle's name is required"),
    title: Yup.string().required("vehicle's title is required"),

    type: Yup.string().required("vehicle's type is required"),
    capacity: Yup.string().required("vehicle's capacity is required"),
    price: Yup.string().required("vehicle's price is required"),
    description: Yup.string().required("vehicle's description is required"),
    // image: Yup.string().required("vehicle's image is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      // name: data?.name || "",
      // sku: data?.sku || "",
      // brand_id: data?.brand?.id || "",
      // category_id: data?.category?.id || "",
      // sub_category_id: data?.sub_category?.id || "",
      // sub_sub_category_id: data?.sub_sub_category?.id || "",
      // description: data?.description || "",
      // status: data?.status || 0,
      // featured: data?.featured || 0,
      // new: data?.new || 0,
      // trending: data?.trending || 0,
      // galleries: data?.gallery || [],
      // image: data?.image || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { handleSubmit, reset, watch, setValue } = methods;
  const selectedMainCategory = watch("category_id");
  const selectedSubCategory = watch("sub_category_id");

  // TODO: useEffects, write the useEffect codes here

  // TODO: fetch the brand, categories, size and color
  useEffect(() => {
    dispatch(fetchInclusive({ enqueueSnackbar, page: 0, limit: 100 }));
    dispatch(fetchCategories({ enqueueSnackbar }));
    dispatch(fetchSizes({ enqueueSnackbar, page: 0, limit: 100 }));
    dispatch(fetchColors({ enqueueSnackbar, page: 0, limit: 100 }));
  }, [dispatch, enqueueSnackbar]);

  // useEffect(() => {
  //   const newVariants = data?.variations?.map((variation) => ({
  //     size_id: variation?.size_id,
  //     price: variation?.price,
  //     selling_price: variation?.selling_price,
  //     color_id: variation?.color_id,
  //   }));

  //   if (newVariants?.length) {
  //     setVairants(newVariants);
  //   }
  // }, [data?.variations]);

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

  const onCreateVehicle = (values) => {
    console.log(values);
    // TODO: dispatch the action to create a product
    const formData = new FormData();

    appendFormValuesToFormData(formData, {
      ...values,
    });

    if (photo) {
      formData.append("image", photo);
    }

    dispatch(createVehicle({ data: formData, enqueueSnackbar, handleClose }));
  };

  const onUpdateProduct = (values) => {
    // TODO: dispatch the action to update a product
    const formData = new FormData();

    appendFormValuesToFormData(formData, {
      ...values,
    });

    if (photo) {
      formData.append("image", photo);
    }

    dispatch(
      updateProduct({
        data: formData,
        enqueueSnackbar,
        handleClose,
        id: data?.slug,
        setRefresh,
      })
    );
  };

  // console.log

  console.log(refresh, "refresh");

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
            sm: "repeat(3, 1fr)",
          }}
        >
          <RHFTextField name={"name"} label={"Vehicle's name *"} />
          <RHFTextField name={"type"} label={"Vehicle's type *"} />
          <RHFTextField name={"capacity"} label={"Vehicle's capacity *"} />
          <RHFTextField
            name={"price"}
            label={"Vehicle's price *"}
            type="number"
          />

          <RHFTextArea
            name={"description"}
            label={"Vehicle's description *"}
            multiple={true}
            rows={2}
            className=""
          />
        </Box>

        <Box mt={3}>
          <Stack flexDirection={"row"} gap={3}>
            <Upload
              isAvatar={false}
              text={"Upload picture"}
              file={photo || defaultValues.photo}
              name="image"
              accept="image/*"
              maxSize={1}
              onDrop={handleDropPhoto}
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
            {isEdit ? "Update vehicle" : "Create vehicle"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
