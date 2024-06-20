import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFSelect, RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { Upload } from "../../../components/upload";
import { categoryData } from "../../../data/categoryData";
import {
  createCategory,
  updateCategory,
} from "../../../redux/slices/categorySlice";

const Form = ({ handleClose, data, isEdit = false, setActiveTab }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [photo, setPhoto] = useState(null);

  // TODO: get the data from slice
  const categories = useSelector((state) => state.category.categories);

  const createCCLoading = useSelector((state) => state.category.isLoading);

  const Schema = Yup.object().shape({
    name: Yup.string().required("Category name is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      name: data?.name,
      photo: data?.photo,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  // TODO: useEffects, write the useEffect codes here

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

  const onCreateCategory = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append(
      "parent_id",
      categories?.data?.find((cat) => cat?.slug === values.parent_id)?.id
    );
    if (photo) {
      formData.append("photo", photo);
    }
    // TODO: dispatch the action to create a category
    dispatch(
      createCategory({
        data: formData,
        enqueueSnackbar,
        handleClose,
        setActiveTab,
        activeTab: values.parent_id,
      })
    );
  };

  const onUpdateCategory = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (photo) {
      formData.append("photo", photo);
    }
    // TODO: dispatch the action to update a brand
    dispatch(
      updateCategory({
        data: formData,
        enqueueSnackbar,
        handleClose,
        id: data?.slug,
      })
    );
  };

  // TODO: console.logs

  return (
    <Box p={3}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(isEdit ? onUpdateCategory : onCreateCategory)}
      >
        <Stack flexDirection={"row"} justifyContent={"center"} mb={2}></Stack>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
          }}
        >
          <RHFTextField name={"name"} label={"Category name *"} />
          <RHFSelect name={"parent_id"} label="Select parent category *">
            {categoryData?.map((category, index) => (
              <MenuItem value={category?.value} key={index}>
                <span>{category?.label}</span>
              </MenuItem>
            ))}
          </RHFSelect>
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
        </Box>

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createCCLoading}
            disabled={createCCLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update Category" : "Create Category"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
