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
import {
  createCategory,
  updateCategory,
} from "../../../redux/slices/categorySlice";

const Form = ({ handleClose, data, isEdit = false }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [photo, setPhoto] = useState(null);

  // TODO: get the data from slice

  const createCCLoading = useSelector((state) => state.category.isLoading);

  const Schema = Yup.object().shape({
    cc: Yup.string().required("cc is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      cc: data?.cc,
      remarks: data?.remarks,
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
    // TODO: dispatch the action to create a brand
    dispatch(createCategory({ data: values, enqueueSnackbar, handleClose }));
  };

  const onUpdateCategory = (values) => {
    // TODO: dispatch the action to update a brand
    dispatch(
      updateCategory({
        data: values,
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
          <RHFTextField name={"cc"} label={"Vehicle's cc *"} />
          <RHFTextField name={"remarks"} label={"Remarks"} />
        </Box>

        <Box mt={3}>
          <Upload
            isAvatar={false}
            text={"Upload picture"}
            file={photo}
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
            {isEdit ? "Update CC" : "Create CC"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;