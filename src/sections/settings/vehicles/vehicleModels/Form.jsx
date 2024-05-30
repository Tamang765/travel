import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFTextField } from "../../../../components/hook-form";
import FormProvider from "../../../../components/hook-form/FormProvider";
import {
  createVehicleModel,
  fetchVehicleBrands,
  updateVehicleModel,
} from "../../../../redux/slices/vehicleSlice";

const Form = ({ handleClose, data, isEdit = false }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [brandOptions, setBrandOptions] = useState([]);

  // TODO: get the data from slice

  const createModelLoading = useSelector((state) => state.vehicle.isLoading);
  const vehicleBrands = useSelector((state) => state.vehicle.vehicleBrands);

  const Schema = Yup.object().shape({
    name: Yup.string().required("brand's name is required"),
    brand_id: Yup.string().required("vehicle type is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      name: data?.name,
      brand_id: data?.brand?.id,
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
  // TODO: fetch the brand of the vehicles for auto complete
  useEffect(() => {
    dispatch(fetchVehicleBrands({}));
  }, [dispatch]);

  // TODO: set the brand options

  useEffect(() => {
    const brandData = vehicleBrands?.data?.map((brand) => ({
      id: brand?.id,
      label: brand?.name,
    }));

    setBrandOptions(brandData);
  }, [vehicleBrands]);

  // ======

  // TODO: functions

  const onCreateVehicleModel = (values) => {
    // TODO: dispatch the action to create a model
    dispatch(
      createVehicleModel({ data: values, enqueueSnackbar, handleClose })
    );
  };

  const onUpdateVehicleModel = (values) => {
    // TODO: dispatch the action to update a model
    dispatch(
      updateVehicleModel({
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
          isEdit ? onUpdateVehicleModel : onCreateVehicleModel
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
            defaultValue={{
              label: data?.brand?.name || "",
              id: data?.brand?.id || "",
            }}
            name="brand_id"
            disablePortal
            id="combo-box-demo"
            options={brandOptions || []}
            renderInput={(params) => (
              <RHFTextField
                name={"brand_id"}
                {...params}
                label="Vehicle brand *"
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
          <RHFTextField name={"name"} label={"Vehicle model's name *"} />
        </Box>

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createModelLoading}
            disabled={createModelLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update Model" : "Create Model"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
