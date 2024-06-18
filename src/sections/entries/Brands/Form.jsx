import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { Upload } from "../../../components/upload";
import { createBrand, updateBrand } from "../../../redux/slices/brandSlice";

const Form = ({ handleClose, data, isEdit = false }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [photo, setPhoto] = useState(null);

  // TODO: get the data from slice

  const createBrandLoading = useSelector((state) => state.brand.isLoading);

  const Schema = Yup.object().shape({
    name: Yup.string().required("brand's name is required"),
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

  const onCreateBrandBrand = (values) => {
    // TODO: dispatch the action to create a brand
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("photo", photo);

    dispatch(createBrand({ data: formData, enqueueSnackbar, handleClose }));
  };

  const onUpdateBrandBrand = (values) => {
    // TODO: dispatch the action to update a brand
    const formData = new FormData();

    formData.append("name", values.name);
    if (photo) {
      formData.append("photo", photo);
    }
    dispatch(
      updateBrand({
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
        onSubmit={handleSubmit(
          isEdit ? onUpdateBrandBrand : onCreateBrandBrand
        )}
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
          <RHFTextField name={"name"} label={"Brand's name *"} />
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
            loading={createBrandLoading}
            disabled={createBrandLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update Brand" : "Create Brand"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
