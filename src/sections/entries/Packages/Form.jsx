import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { fetchExclusive } from "../../../redux/slices/exclusiveSlice";
import { fetchInclusive } from "../../../redux/slices/inclusiveSlice";
import { fetchLocation } from "../../../redux/slices/locationSlice";
import {
  createPackages,
  updatePackages,
} from "../../../redux/slices/packageSlice";
import { fetchPages } from "../../../redux/slices/pageSlice";

const Form = ({ handleClose, data, isEdit = false, setvalue }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const pages = useSelector((state) => state.page.pages);
  const exclusives = useSelector((state) => state.exclusive.exclusive);
  const inclusives = useSelector((state) => state.inclusive.inclusive);
  const locations = useSelector((state) => state.locations.location);

  const createSizeLoading = useSelector((state) => state.size.isLoading);

  const Schema = Yup.object().shape({
    overview: Yup.string().required("overview is required"),
    route_map: Yup.string().required("route_map is required"),
    equipments: Yup.string().required("equipments is required"),
    inclusives: Yup.array().required("inclusives is required"),
    exclusives: Yup.array().required("exclusives is required"),
    highlights: Yup.string().required("Highlights is required"),
    note: Yup.string().required("Note is required"),
    locations: Yup.array().required("Locations is required"),
  });

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

  const defaultValues = useMemo(
    () => ({
      page_id: data?.page_id,
      title: data?.title,
      overview: data?.overview,

      locations: parsedLocations,
      route_map: data?.route_map,
      equipments: data?.equipments,
      inclusives: data && JSON.parse(data?.inclusives),
      exclusives: data && JSON.parse(data?.exclusives),
      highlights: data?.highlights,
      note: data?.note,
    }),
    [data, parsedLocations]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    dispatch(fetchPages({ enqueueSnackbar, page: 0, limit: 100 }));
    dispatch(fetchLocation({ enqueueSnackbar, page: 0, limit: 100 }));
    dispatch(fetchExclusive({ enqueueSnackbar, limit: 100, page: 0 }));
    dispatch(fetchInclusive({ enqueueSnackbar, limit: 100, page: 0 }));
  }, [dispatch, enqueueSnackbar]);

  const onCreatePackages = async (values) => {
    const inclusives = JSON.stringify(
      values?.inclusives?.map((inclusive) => inclusive.id) || []
    );
    const exclusives = JSON.stringify(
      values?.exclusives?.map((exclusive) => exclusive.id) || []
    );
    const locations =
      values?.locations?.map((location) => location.label) || [];
    const result = `"${locations.join('", "')}"`;

    const res = await dispatch(
      createPackages({
        data: { ...values, exclusives, inclusives, locations: result },
        enqueueSnackbar,
      })
    );
    setvalue({
      title: "Faq",
      isOpen: false,
      id: res?.payload?.data?.id,
    });
  };

  const onUpdatePage = (values) => {
    dispatch(
      updatePackages({
        data: values,
        enqueueSnackbar,
        handleClose,
        id: data?.id,
      })
    );
  };

  return (
    <Box p={3}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(isEdit ? onUpdatePage : onCreatePackages)}
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
            name="page_id"
            disablePortal
            id="combo-box-main-category"
            options={
              pages?.data?.data?.map((page) => ({
                label: page?.name,
                id: page?.id,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField name={"page_id"} {...params} label="page id *" />
            )}
            onChange={(event, newValues) =>
              methods.setValue("page_id", newValues ? newValues.id : null)
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
          <RHFTextField name={"highlights"} label={" Highlights *"} />
          <RHFTextField name={"overview"} label={" Overview *"} />
          <Autocomplete
            name="locations"
            defaultValue={defaultValues?.locations}
            id="combo-box-main-category"
            multiple
            options={
              locations?.data?.map((page) => ({
                label: page?.name,
                id: page?.id,
              })) || []
            }
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <RHFTextField
                name={"locations"}
                {...params}
                label="Locations *"
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue("locations", newValues ? newValues : null)
            }
            renderOption={(props, option) => (
              <li {...props} key={option.label}>
                {option.label}
              </li>
            )}
          />
          <RHFTextField name={"route_map"} label={" Route Map *"} />
          <RHFTextField name={"equipments"} label={" Equipments *"} />
          <RHFTextField name={"note"} label={" Note *"} />
          <Autocomplete
            name="inclusives"
            defaultValue={defaultValues?.inclusives}
            id="combo-box-main-category"
            multiple
            options={
              inclusives?.data?.map((page) => ({
                label: page?.name,
                id: page?.id,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField
                name={"inclusives"}
                {...params}
                label="Inclusive *"
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue("inclusives", newValues ? newValues : null)
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
          <Autocomplete
            name="exclusives"
            defaultValue={defaultValues?.exclusives}
            multiple
            id="combo-box-main-category"
            options={
              exclusives?.data?.map((page) => ({
                label: page?.name,
                id: page?.id,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField
                name={"exclusives"}
                {...params}
                label="Exclusive *"
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue("exclusives", newValues ? newValues : null)
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
        </Box>

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createSizeLoading}
            disabled={createSizeLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update Package" : "Create Package"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
