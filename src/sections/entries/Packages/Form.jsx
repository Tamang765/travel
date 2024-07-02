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
import {
  createPackages,
  updatePackages,
} from "../../../redux/slices/packageSlice";
import { fetchPages } from "../../../redux/slices/pageSlice";

const Form = ({ handleClose, data, isEdit = false }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates

  // TODO: get the data from slice
  // TODO: get the data from slice
  const pages = useSelector((state) => state.page.pages);
  const exclusives = useSelector((state) => state.exclusive.exclusive);
  const inclusives = useSelector((state) => state.inclusive.inclusive);

  const createSizeLoading = useSelector((state) => state.size.isLoading);

  const Schema = Yup.object().shape({
    title: Yup.string().required("title is required"),

    overview: Yup.string().required("overview is required"),
    locations: Yup.string().required("locations is required"),
    route_map: Yup.string().required("route_map is required"),
    equipments: Yup.string().required("equipments is required"),
    inclusives: Yup.array().required("inclusives is required"),
    exclusives: Yup.array().required("exclusives is required"),

    highlights: Yup.string().required("Highlights is required"),
    note: Yup.string().required("Note is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      overview: data?.overview,
      title: data?.title,
      locations: data?.locations,
      route_map: data?.route_map,
      equipments: data?.equipments,
      inclusives: data?.inclusives,
      exclusives: data?.exclusives,
      highlights: data?.highlights,

      note: data?.note,
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
  // TODO: fetch the brand, categories, size and color
  useEffect(() => {
    dispatch(fetchPages({ enqueueSnackbar, page: 0, limit: 100 }));
    dispatch(
      fetchExclusive({
        enqueueSnackbar,
        limit: 100,
        page: 0,
      })
    );
    dispatch(
      fetchInclusive({
        enqueueSnackbar,
        limit: 100,
        page: 0,
      })
    );
  }, [dispatch, enqueueSnackbar]);
  // TODO: set the size options

  // ======

  // TODO: functions

  const onCreatePackages = (values) => {
    const inclusives = JSON.stringify(
      values?.inclusives?.map((inclusive) => inclusive.id) || []
    );
    const exclusives = JSON.stringify(
      values?.exclusives?.map((exclusive) => exclusive.id) || []
    );

    // TODO: dispatch the action to create a size

    dispatch(
      createPackages({
        data: { ...values, exclusives, inclusives },
        enqueueSnackbar,
        handleClose,
      })
    );
  };

  const onUpdatePage = (values) => {
    // TODO: dispatch the action to update a size
    dispatch(
      updatePackages({
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
          <RHFTextField name={"title"} label={" Title *"} />

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
          <RHFTextField name={"locations"} label={" Locations *"} />
          <RHFTextField name={"route_map"} label={" Route Map *"} />
          <RHFTextField name={"equipments"} label={" Equipments *"} />
          <RHFTextField name={"note"} label={" Note *"} />

          <Autocomplete
            // defaultValue={{
            //   label: data?.category?.name || "",
            //   id: data?.category?.id || "",
            // }}
            name="inclusives"
            // disablePortal
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
            // defaultValue={{
            //   label: data?.category?.name || "",
            //   id: data?.category?.id || "",
            // }}
            name="exclusives"
            multiple
            // disablePortal
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
            {isEdit ? "Update Page" : "Create Page"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
