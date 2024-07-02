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
import {
  createExclusive,
  updateExclusive,
} from "../../../redux/slices/exclusiveSlice";
import {
  createInclusive,
  updateInclusive,
} from "../../../redux/slices/inclusiveSlice";

const Form = ({
  handleClose,
  data,
  isEdit = false,
  title = "",
  exclusive = false,
}) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [photo, setPhoto] = useState(null);

  // TODO: get the data from slice

  const createInclusiveLoading = useSelector(
    (state) => state.inclusive.isLoading
  );
  const createExclusiveLoading = useSelector(
    (state) => state.exclusive.isLoading
  );

  const Schema = Yup.object().shape({
    name: Yup.string().required(`${title}'s name is required`),
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

  const onCreateInclusive = (values) => {
    // TODO: dispatch the action to create a brand
    const formData = new FormData();

    formData.append("name", values.name);

    dispatch(createInclusive({ data: formData, enqueueSnackbar, handleClose }));
  };
  const onCreateExclusive = (values) => {
    // TODO: dispatch the action to create a brand
    const formData = new FormData();

    formData.append("name", values.name);

    dispatch(
      createExclusive({
        data: formData,
        enqueueSnackbar,
        handleClose,
        id: data?.id,
      })
    );
  };

  const onUpdateInclusive = (values) => {
    // TODO: dispatch the action to update a brand
    const patchData = { name: values.name };

    if (exclusive) {
      dispatch(
        updateExclusive({
          data: patchData,
          enqueueSnackbar,
          handleClose,
          id: data?.id,
        })
      );
      return;
    }

    dispatch(
      updateInclusive({
        data: patchData,
        enqueueSnackbar,
        handleClose,
        id: data?.id,
      })
    );
  };
  const onUpdateExclusive = (values) => {
    // TODO: dispatch the action to update a brand
    const patchData = { name: values.name };

    dispatch(
      updateExclusive({
        data: patchData,
        enqueueSnackbar,
        handleClose,
        id: data?.id,
      })
    );
  };

  // TODO: console.logs
  console.log(exclusive);
  return (
    <Box p={3}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(
          isEdit
            ? exclusive
              ? onUpdateExclusive
              : onUpdateInclusive
            : exclusive
            ? onCreateExclusive
            : onCreateInclusive
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
          <RHFTextField name={"name"} label={`${title}'s name`} />
        </Box>
        {/* 
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
        </Box> */}

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={
              exclusive ? createExclusiveLoading : createInclusiveLoading
            }
            disabled={
              exclusive ? createExclusiveLoading : createInclusiveLoading
            }
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? `Update ${title}` : `Create ${title}`}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
