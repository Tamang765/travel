import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFTextArea, RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import {
  createEmergencyContact,
  updateEmergencyContact,
} from "../../../redux/slices/emergencyContactSlice";

const EmergencyContactForm = ({ handleClose, data, isEdit = false }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates

  // TODO: get the data from slice

  const createECLoading = useSelector(
    (state) => state.emergencyContact.isLoading
  );

  const Schema = Yup.object().shape({
    name: Yup.string().required("name is required"),
  });

  console.log(data, "data");
  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      subject: data?.subject,
      message: data?.message,
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

  const onCreateEC = (values) => {
    // TODO: dispatch the action to create a emergencyContact
    dispatch(
      createEmergencyContact({ data: values, enqueueSnackbar, handleClose })
    );
  };

  const onUpdateEC = (values) => {
    // TODO: dispatch the action to create a emergencyContact
    dispatch(
      updateEmergencyContact({
        data: values,
        enqueueSnackbar,
        handleClose,
        id: data?.id,
      })
    );
  };

  // TODO: console.logs

  return (
    <Box p={3}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(isEdit ? onUpdateEC : onCreateEC)}
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
          <RHFTextField name={"name"} label={" Name *"} />

          <RHFTextField name={"email"} label={"Email"} />
          <RHFTextField name={"phone"} label={"Phone number *"} type="number" />
          <RHFTextField name={"subject"} label={"Subject"} />
          <RHFTextArea
            name={"message"}
            label={"Message"}
            multiple={true}
            rows={2}
          />
        </Box>

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createECLoading}
            disabled={createECLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update Contact" : "Create Contact"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default EmergencyContactForm;
