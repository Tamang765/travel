import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFSwitch, RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { Upload } from "../../../components/upload";
import { fetchExclusive } from "../../../redux/slices/exclusiveSlice";
import { fetchInclusive } from "../../../redux/slices/inclusiveSlice";
import { fetchLocation } from "../../../redux/slices/locationSlice";
import {
  createPackages,
  updatePackages,
} from "../../../redux/slices/packageSlice";
import { fetchPages } from "../../../redux/slices/pageSlice";

const Form = forwardRef(
  (
    {
      handleClose,
      data,
      isEdit = false,
      setvalue,
      pageId = true,
      setPackageId,
    },
    ref
  ) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [photo, setPhoto] = useState(null);

    const pages = useSelector((state) => state.page.pages);
    const exclusives = useSelector((state) => state.exclusive.exclusive);
    const categories = useSelector((state) => state.category.categories);

    const inclusives = useSelector((state) => state.inclusive.inclusive);
    const locations = useSelector((state) => state.locations.location);

    const createPackageLoading = useSelector(
      (state) => state.packages.isLoading
    );
    const fetchLoading = useSelector((state) => state.packages.fetchLoading);

    const Schema = Yup.object().shape({
      overview: Yup.string().required("overview is required"),
      equipments: Yup.string().required("equipments is required"),
      inclusives: Yup.array().required("inclusives is required"),
      exclusives: Yup.array().required("exclusives is required"),
      highlights: Yup.string().required("Highlights is required"),
      // category_id: Yup.string().required("Category is required"),

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
        order: data?.order,

        equipments: data?.equipments,
        inclusives: data?.inclusives,
        exclusives: data?.exclusives,
        highlights: data?.highlights,
        note: data?.note,
      }),
      [data, parsedLocations]
    );

    const methods = useForm({
      resolver: yupResolver(Schema),
      defaultValues,
    });

    const { handleSubmit, trigger, watch, clearErrors } = methods;

    useEffect(() => {
      dispatch(fetchPages({ enqueueSnackbar, page: 0, limit: 100 }));
      dispatch(fetchLocation({ enqueueSnackbar, page: 0, limit: 100 }));
      dispatch(fetchExclusive({ enqueueSnackbar, limit: 100, page: 0 }));
      dispatch(fetchInclusive({ enqueueSnackbar, limit: 100, page: 0 }));
    }, [dispatch, enqueueSnackbar]);

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

      const formData = new FormData();

      formData.append("page_id", pageId);

      formData.append("category_id", values.category_id);
      formData.append("highlights", values.highlights);
      formData.append("overview", values.overview);
      formData.append("locations", result);
      formData.append("equipments", values.equipments);
      formData.append("note", values.note);
      formData.append("inclusives", inclusives);
      formData.append("exclusives", exclusives);
      formData.append("order", values.order);
      formData.append("banner", values.banner ? 1 : 0);
      formData.append("rated", values.rated ? 1 : 0);
      formData.append("featured", values.featured ? 1 : 0);
      if (photo) {
        formData.append("route_map", photo);
      }

      const res = await dispatch(
        createPackages({
          data: formData,
          enqueueSnackbar,
        })
      );
      setPackageId && setPackageId(res?.payload?.data?.id);

      //
    };

    const onUpdatePackage = (values) => {
      const inclusives = JSON.stringify(
        values?.inclusives?.map((inclusive) => inclusive.id) || []
      );
      const exclusives = JSON.stringify(
        values?.exclusives?.map((exclusive) => exclusive.id) || []
      );
      const locations =
        values?.locations?.map((location) => location.label) || [];
      const result = `"${locations.join('", "')}"`;

      const formData = new FormData();

      formData.append("page_id", pageId);

      formData.append("category_id", values.category_id);
      formData.append("highlights", values.highlights);
      formData.append("overview", values.overview);
      formData.append("locations", result);
      formData.append("equipments", values.equipments);
      formData.append("note", values.note);
      formData.append("inclusives", inclusives);
      formData.append("exclusives", exclusives);
      formData.append("order", values.order);
      formData.append("banner", values.banner ? 1 : 0);
      formData.append("rated", values.rated ? 1 : 0);
      formData.append("featured", values.featured ? 1 : 0);
      if (photo) {
        formData.append("route_map", photo);
      }
      dispatch(
        updatePackages({
          data: formData,

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
          handleSubmit(isEdit ? onUpdatePackage : onCreatePackages)();
        }
        return isValid;
      },
    }));

    // Watch for changes in the form fields and clear errors on change
    useEffect(() => {
      const subscription = watch((value, { name, type }) => {
        if (type === "change") {
          clearErrors(name);
        }
      });
      return () => subscription.unsubscribe();
    }, [watch, clearErrors]);

    return (
      <Box p={3}>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(isEdit ? onUpdatePackage : onCreatePackages)}
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
            {!pageId && (
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
                  <RHFTextField name={"page_id"} {...params} label="Page*" />
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
            )}
            <Autocomplete
              defaultValue={{
                label: data?.category?.name || "",
                id: data?.category?.id || "",
              }}
              name="category_id"
              disablePortal
              id="combo-box-main-category"
              options={
                categories?.data?.map((page) => ({
                  label: page?.name,
                  id: page?.id,
                })) || []
              }
              renderInput={(params) => (
                <RHFTextField
                  name={"category_id"}
                  {...params}
                  label="Category*"
                />
              )}
              onChange={(event, newValues) =>
                methods.setValue("category_id", newValues ? newValues.id : null)
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

            <RHFTextField name={"equipments"} label={" Equipments *"} />
            <RHFTextField name={"note"} label={" Note *"} />
            <Autocomplete
              name="inclusives"
              defaultValue={data?.inclusives?.map((page) => ({
                label: page?.name,
                id: page?.id,
              }))}
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
              defaultValue={data?.exclusives?.map((page) => ({
                label: page?.name,
                id: page?.id,
              }))}
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
            <RHFTextField name={"order"} label={" Order *"} type="number" />

            <Stack direction={"row"}>
              <RHFSwitch name={"banner"} label={"Banner *"} />
              <RHFSwitch name={"featured"} label={"Featured *"} />
              <RHFSwitch name={"rated"} label={"Rated *"} />
            </Stack>
          </Box>
          <Box mt={3}>
            <span>Route Map</span>
            <Stack flexDirection={"row"} gap={3}>
              <Upload
                isAvatar={false}
                text={"Upload picture"}
                file={photo || defaultValues?.image}
                name="image"
                accept="image/*"
                maxSize={1}
                onDrop={handleDropPhoto}
              />
            </Stack>
          </Box>

          <Stack mt={2} alignItems={"end"} {...(pageId && { display: "none" })}>
            <LoadingButton
              loading={createPackageLoading}
              disabled={createPackageLoading}
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
  }
);

export default Form;
