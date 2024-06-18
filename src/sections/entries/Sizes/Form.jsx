import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFTextArea, RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import { createSize, updateSize } from "../../../redux/slices/sizeSlice";

const Form = ({ handleClose, data, isEdit = false }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates

  // TODO: get the data from slice

  const createSizeLoading = useSelector((state) => state.size.isLoading);
  const categories = useSelector((state) => state.category.categories);

  const Schema = Yup.object().shape({
    name: Yup.string().required("size's name is required"),
    category_id: Yup.string().required("please select category"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      name: data?.name,
      note: data?.note,
      category_id: data?.category?.id,
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

  // TODO: fetch the categories of the s for auto complete
  useEffect(() => {
    dispatch(fetchCategories({ enqueueSnackbar, page: 0, limit: 100 }));
  }, [dispatch, enqueueSnackbar]);

  // TODO: set the size options

  // ======

  // TODO: functions

  const onCreateSize = (values) => {
    // TODO: dispatch the action to create a size
    dispatch(createSize({ data: values, enqueueSnackbar, handleClose }));
  };

  const onUpdateSize = (values) => {
    // TODO: dispatch the action to update a size
    dispatch(
      updateSize({
        data: values,
        enqueueSnackbar,
        handleClose,
        id: data?.slug,
      })
    );
  };

  // TODO: console.logs

  return (
    <Box p={3}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(isEdit ? onUpdateSize : onCreateSize)}
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
          <RHFTextField name={"name"} label={" size's name *"} />

          {/* TODO: category */}
          <Autocomplete
            defaultValue={{
              label: data?.category?.name || "",
              id: data?.category?.id || "",
            }}
            name="category_id"
            disablePortal
            id="combo-box-demo"
            options={
              categories?.data?.map((category) => ({
                label: category?.name,
                id: category?.id,
              })) || []
            }
            renderInput={(params) => (
              <RHFTextField
                name={"category_id"}
                {...params}
                label="Search category *"
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

          <RHFTextArea
            name={"note"}
            label={"Please enter note"}
            multiple={true}
            rows={2}
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
            {isEdit ? "Update Size" : "Create Size"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
