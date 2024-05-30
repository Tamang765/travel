import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFTextField } from "../../../../components/hook-form";
import FormProvider from "../../../../components/hook-form/FormProvider";
import {
  createVehicleColor,
  updateVehicleColor,
} from "../../../../redux/slices/vehicleSlice";

const Form = ({ handleClose, data, isEdit = false }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates

  // TODO: get the data from slice

  const createColorLoading = useSelector((state) => state.vehicle.isLoading);

  const Schema = Yup.object().shape({
    name: Yup.string().required("name is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      name: data?.color,
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

  const onCreateVehicleColor = (values) => {
    // TODO: dispatch the action to create a brand
    dispatch(
      createVehicleColor({ data: values, enqueueSnackbar, handleClose })
    );
  };

  const onUpdateVehicleColor = (values) => {
    // TODO: dispatch the action to update a brand
    dispatch(
      updateVehicleColor({
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
        onSubmit={handleSubmit(
          isEdit ? onUpdateVehicleColor : onCreateVehicleColor
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
          <RHFTextField name={"name"} label={"Vehicle's color *"} />
        </Box>

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createColorLoading}
            disabled={createColorLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update Color" : "Create Color"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
