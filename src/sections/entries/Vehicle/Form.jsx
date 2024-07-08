import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import * as Yup from "yup";
import { RHFEditor, RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { Upload } from "../../../components/upload";
import {
  createVehicle,
  updateVehicle,
} from "../../../redux/slices/vehicleSlice";

const DummyVehicleType = [
  {
    id: 1,
    label: "Car",
  },
  {
    id: 2,
    label: "Jeep",
  },
  {
    id: 3,
    label: "Bus",
  },
];

const Form = ({
  handleClose,
  data,
  isEdit = false,
  refresh,
  setRefresh,
  isView = false,
}) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [photo, setPhoto] = useState(null);

  const [content, setContent] = useState(null);

  // TODO: get the data from slice

  const createVehicleLoading = useSelector((state) => state.vehicle.isLoading);

  const Schema = Yup.object().shape({
    name: Yup.string().required("Vehicle's name is required"),
    type: Yup.string().required("Vehicle's type is required"),
    capacity: Yup.string().required("Vehicle's capacity is required"),

    // image: Yup.string().required("Vehicle's image is required"),
    price: Yup.string().required("Vehicle's price is required"),

    description: Yup.string().required("Vehicle's description is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      name: data?.name || "",
      type: data?.type || "",
      description: data?.description || "",
      image: data?.image || "",
      capacity: data?.capacity || "",
      price: data?.price || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });
  console.log(defaultValues, data);
  const { handleSubmit, reset, watch, setValue } = methods;

  // TODO: useEffects, write the useEffect codes here

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

  // TODO: handle upload galleries

  const onCreateVehicle = (values) => {
    console.log(values);
    // TODO: dispatch the action to create a product
    const formData = new FormData();

    if (values?.name) {
      const slug = slugify(values.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/,
        strict: true,
      });
      formData.append("slug", slug);
    }
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("description", values.description);
    formData.append("capacity", values.capacity);
    formData.append("price", values.price);

    // formData.
    if (photo) {
      formData.append("image", photo);
    }

    dispatch(createVehicle({ data: formData, enqueueSnackbar, handleClose }));
  };

  const onUpdateProduct = (values) => {
    // TODO: dispatch the action to update a product
    const formData = new FormData();

    if (values?.name) {
      const slug = slugify(values.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/,
        strict: true,
      });
      formData.append("slug", slug);
    }
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("description", values.description);
    formData.append("capacity", values.capacity);
    formData.append("price", values.price);


    if (photo) {
      formData.append("image", photo);
    }

    dispatch(
      updateVehicle({
        data: formData,
        enqueueSnackbar,
        handleClose,
        id: data?.id,
        setRefresh,
      })
    );
  };

  return (
    <Box p={3}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(isEdit ? onUpdateProduct : onCreateVehicle)}
      >
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          }}
        >
          <RHFTextField
            name={"name"}
            label={"Vehicle's name *"}
            disabled={isView}
          />{" "}
          <Autocomplete
            defaultValue={defaultValues?.type}
            disabled={isView}
            name="type"
            disablePortal
            id="combo-box-main-category"
            options={
              DummyVehicleType?.map((page) => ({
                label: page?.label,
                id: page?.id,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField
                name={"type"}
                {...params}
                label="Vehicle Type"
                disabled={isView}
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue("type", newValues ? newValues.label : null)
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
          <RHFTextField
            name={"capacity"}
            label={"Vehicle's capacity *"}
            disabled={isView}
          />
          <RHFTextField
            name={"price"}
            label={"Vehicle's price *"}
            disabled={isView}
          />
        </Box>
        <Stack mt={5}>
          <RHFEditor
            placeholder="Write anwser here..."
            name={"description"}
            disabled={isView}
          />
        </Stack>

        <Box mt={3}>
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

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createVehicleLoading}
            disabled={createVehicleLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update vehicle" : "Create vehicle"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
