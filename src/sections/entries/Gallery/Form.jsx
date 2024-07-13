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
import { RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { Upload } from "../../../components/upload";
import {
  createGallery,
  updateGallery,
} from "../../../redux/slices/gallerySlice";
import { fetchInclusive } from "../../../redux/slices/inclusiveSlice";
import { fetchPackages } from "../../../redux/slices/packageSlice";

const Form = forwardRef(
  (
    {
      handleClose,
      data,
      isEdit = false,
      refresh,
      setRefresh,
      hello,
      isView = false,
      packageId,
    },
    ref
  ) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [galleries, setGalleries] = useState(data || []);
    const createProductLoading = useSelector(
      (state) => state.product.isLoading
    );
    const packages = useSelector((state) => state.packages.packages);
    const vehicles = useSelector((state) => state.vehicle.vehicles);

    const Schema = Yup.object().shape({
      // package_id: Yup.string().required("Package is required"),
      // vehicle_id: Yup.string().required("Vehicle is required"),
      // images: Yup.array().min(1, "At least one image is required"),
    });

    const defaultValues = useMemo(
      () => ({
        package_id: data?.package_id || null,
        vehicle_id: data?.vehicle_id || null,
        images: data?.galleries || [],
      }),
      [data]
    );


    const methods = useForm({
      resolver: yupResolver(Schema),
      defaultValues,
    });

    const { handleSubmit, reset, watch, setValue, trigger } = methods;
    const values = watch();

    useEffect(() => {
      dispatch(fetchInclusive({ enqueueSnackbar, page: 0, limit: 100 }));
      dispatch(fetchPackages({ enqueueSnackbar }));
    }, [dispatch, enqueueSnackbar]);

    const handleDropPhoto = useCallback(
      (acceptedFiles) => {
        const files = values.images || [];
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setValue("images", [...files, ...newFiles], { shouldValidate: true });
      },
      [setValue, values.images]
    );

    const handleDropGallery = useCallback((acceptedFiles) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setDocuments((prev) => [
          ...prev,
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
            key: prev.length,
          }),
        ]);
      }
    }, []);

    const onCreateVehicle = (values) => {
      const formData = new FormData();
      formData.append("package_id", packageId);
      // values.vehicle_id && formData.append("vehicle_id", values.vehicle_id);
      documents.forEach((file, index) =>
        formData.append(`galleries[${index}]`, file)
      );

      dispatch(createGallery({ data: formData, enqueueSnackbar, handleClose }));
    };
    const onUpdateProduct = (values) => {
      const formData = new FormData();
      //filter gallery with id
      const galleryToUpdate = documents.filter((field) => field.id && field);
      //filter gallery without id

      const galleryToCreate = documents.filter((field) => !field.id && field);

      formData.append("package_id", packageId);
      // values.vehicle_id && formData.append("vehicle_id", values.vehicle_id);
      documents.forEach((file, index) =>
        formData.append(`galleries[${index}]`, file)
      );

      // TODO: dispatch the action to update a brand
      if (galleryToCreate) {
        dispatch(
          createGallery({
            data: formData,
            enqueueSnackbar,
            handleClose,
          })
        );
      }
      galleryToUpdate?.forEach((field) => {
        dispatch(
          updateGallery({
            data: formData,
            enqueueSnackbar,
            id: field.id,
            handleClose,
          })
        );
      });
    };

    useEffect(() => {
      setDescription(data?.description);
      setPhoto(data?.image);
    }, [data]);

    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger();
        if (isValid) {
          handleSubmit(isEdit ? onUpdateProduct : onCreateVehicle)();
        }
        return isValid;
      },
    }));

    return (
      <Box p={3}>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(isEdit ? onUpdateProduct : onCreateVehicle)}
        >
          {/* <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
          >
            {
              <Autocomplete
                defaultValue={defaultValues?.package_id}
                disabled={isView}
                name="package_id"
                disablePortal
                id="combo-box-main-package"
                options={
                  packages?.data?.data?.map((page) => ({
                    label: page?.overview,
                    id: page?.id,
                  })) || []
                }
                renderInput={(params) => (
                  <RHFTextField
                    name={"package_id"}
                    {...params}
                    label="Package *"
                    disabled={isView}
                  />
                )}
                onChange={(event, newValues) =>
                  methods.setValue(
                    "package_id",
                    newValues ? newValues.id : null
                  )
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.label}
                  </li>
                )}
              />
            }
            <Autocomplete
              defaultValue={defaultValues?.vehicle_id}
              disabled={isView}
              name="vehicle_id"
              disablePortal
              id="combo-box-main-vehicle"
              options={
                vehicles?.data?.map((page) => ({
                  label: page?.name,
                  id: page?.id,
                })) || []
              }
              renderInput={(params) => (
                <RHFTextField
                  name={"vehicle_id"}
                  {...params}
                  label="Vehicle *"
                  disabled={isView}
                />
              )}
              onChange={(event, newValues) =>
                methods.setValue("vehicle_id", newValues ? newValues.id : null)
              }
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.label}
                </li>
              )}
            />
          </Box> */}
          <Upload
            // maxSize={1}
            thumbnail={true}
            onRemoveAll={() => setDocuments([])}
            files={
              documents?.length
                ? [...galleries?.filter((g) => g), ...documents]
                : galleries?.filter((g) => g)
            }
            multiple={true}
            text="Drop or Select Photos"
            name="gallery"
            onDrop={handleDropGallery}
          />
          {!packageId && (
            <Stack mt={2} alignItems={"end"}>
              <LoadingButton
                loading={createProductLoading}
                disabled={createProductLoading}
                type="submit"
                variant="contained"
                className="!bg-primary w-fit"
              >
                {isEdit ? "Update gallery" : "Create gallery"}
              </LoadingButton>
            </Stack>
          )}
        </FormProvider>
      </Box>
    );
  }
);

export default Form;
