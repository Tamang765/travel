import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFTextField } from "../../../../components/hook-form";
import FormProvider from "../../../../components/hook-form/FormProvider";
import {
  createVehicleBrand,
  updateVehicleBrand,
} from "../../../../redux/slices/vehicleSlice";

const Form = ({ handleClose, data, isEdit = false }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates

  // TODO: get the data from slice

  const createBrandLoading = useSelector((state) => state.vehicle.isLoading);

  const Schema = Yup.object().shape({
    name: Yup.string().required("brand's name is required"),
    vehicle_type_id: Yup.string().required("vehicle type is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      name: data?.name,
      vehicle_type_id: data?.vehicle_type_id,
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

  const onCreateVehicleBrand = (values) => {
    // TODO: dispatch the action to create a brand
    dispatch(
      createVehicleBrand({ data: values, enqueueSnackbar, handleClose })
    );
  };

  const onUpdateVehicleBrand = (values) => {
    // TODO: dispatch the action to update a brand
    dispatch(
      updateVehicleBrand({
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
          isEdit ? onUpdateVehicleBrand : onCreateVehicleBrand
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
          <Autocomplete
            name="vehicle_type_id"
            disablePortal
            id="combo-box-demo"
            options={[]}
            renderInput={(params) => (
              <RHFTextField
                name={"vehicle_type_id"}
                {...params}
                label="Vehicle type *"
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue(
                "vehicle_type_id",
                newValues ? newValues.id : null
              )
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
          <RHFTextField name={"name"} label={"Vehicle brand's name *"} />
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
