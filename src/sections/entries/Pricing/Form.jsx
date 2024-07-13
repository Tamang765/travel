import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { fetchExclusive } from "../../../redux/slices/exclusiveSlice";
import { fetchInclusive } from "../../../redux/slices/inclusiveSlice";
import { fetchLocation } from "../../../redux/slices/locationSlice";
import {
  fetchPackages,
  updatePackages,
} from "../../../redux/slices/packageSlice";
import { createPricing } from "../../../redux/slices/pricingSlice";

const Form = forwardRef(
  (
    { handleClose, data, isEdit = false, setvalue, stepper = false, packageId },
    ref
  ) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const packages = useSelector((state) => state.packages.packages);

    const createSizeLoading = useSelector((state) => state.size.isLoading);

    const Schema = Yup.object().shape({
      // currency: Yup.string().required("currency is required"),
      // price: Yup.string().required("price is required"),
      // pax: Yup.string().required("equipments is required"),
      // package_id: Yup.array().required("package_id is required"),
      // // is_per_pax_price: Yup.array().required("is_per_pax_price is required"),
      // capacity: Yup.string().required("Capacity is required"),
    });

    //currency date
    const currencyData = ["USD", "EURO", "YEN", "DOLLAR"];

    // Parse locations string into an array
    const parsedLocations = useMemo(() => {
      if (data?.locations) {
        return data.locations
          .replace(/"/g, "")
          .split(", ")
          .map((location) => ({ label: location }));
      }
      return [];
    }, [data?.locations]);

    const defaultValues = useMemo(() => ({}), [data]);

    const methods = useForm({
      resolver: yupResolver(Schema),
      defaultValues,
    });

    const { handleSubmit, trigger, watch, clearErrors } = methods;

    useEffect(() => {
      dispatch(fetchPackages({ enqueueSnackbar, page: 0, limit: 100 }));
      dispatch(fetchLocation({ enqueueSnackbar, page: 0, limit: 100 }));
      dispatch(fetchExclusive({ enqueueSnackbar, limit: 100, page: 0 }));
      dispatch(fetchInclusive({ enqueueSnackbar, limit: 100, page: 0 }));
    }, [dispatch, enqueueSnackbar]);

    const onCreatePrice = async (values) => {
      console.log(values);
      const res = await dispatch(
        createPricing({
          data: { ...values },
          enqueueSnackbar,
        })
      );
    };

    const onUpdatePrice = (values) => {
      dispatch(
        updatePackages({
          data: values,
          enqueueSnackbar,
          handleClose,
          id: data?.id,
        })
      );
    };

    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger();
        if (isValid) {
          handleSubmit(isEdit ? onUpdatePrice : onCreatePrice)();
        }
        return isValid;
      },
    }));
    console.log(packages);

    return (
      <Box p={3}>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(isEdit ? onUpdatePrice : onCreatePrice)}
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
                label: data?.category?.name || "",
                id: data?.category?.id || "",
              }}
              name="currency"
              disablePortal
              id="combo-box-main-category"
              options={currencyData || []}
              renderInput={(params) => (
                <RHFTextField
                  name={"currency"}
                  {...params}
                  label="Currency *"
                />
              )}
              onChange={(event, newValues) =>
                methods.setValue("currency", newValues ? newValues : null)
              }
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
            />
            {!packageId && (
              <Autocomplete
                name="packages"
                defaultValue={defaultValues?.packages}
                id="combo-box-main-category"
                // multiple
                options={
                  packages?.data?.data?.map((page) => ({
                    label: page?.overview,
                    id: page?.id,
                  })) || []
                }
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <RHFTextField
                    name={"packages"}
                    {...params}
                    label="Packages *"
                  />
                )}
                onChange={(event, newValues) =>
                  methods.setValue("packages", newValues ? newValues.id : null)
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.label}>
                    {option.label}
                  </li>
                )}
              />
            )}
            <RHFTextField name={"price"} label={" Price *"} />
            <RHFTextField name={"pax"} label={" Pax *"} />

            <RHFTextField
              name={"is_per_pax_price"}
              label={"Is Per Pax Price *"}
            />
            <RHFTextField name={"capacity"} label={" Capacity *"} />
          </Box>

          <Stack
            mt={2}
            alignItems={"end"}
            {...(stepper && { display: "none" })}
          >
            <LoadingButton
              loading={createSizeLoading}
              disabled={createSizeLoading}
              type="submit"
              variant="contained"
              className="!bg-primary w-fit"
            >
              {isEdit ? "Update pricing" : "Create pricing"}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    );
  }
);

export default Form;
