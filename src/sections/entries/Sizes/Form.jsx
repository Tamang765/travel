import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import * as Yup from "yup";
import { RHFTextArea, RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { createPage, updatePage } from "../../../redux/slices/pageSlice";

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
    meta_title: Yup.string().required("Meta title is required"),
    meta_description: Yup.string().required("Meta title is required"),
    meta_keywords: Yup.string().required("Meta title is required"),
    title: Yup.string().required("Meta title is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      name: data?.name,
      title: data?.title,
      meta_title: data?.meta_title,
      meta_description: data?.meta_description,
      meta_keywords: data?.meta_keywords,
      slug: data?.slug,
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

  // TODO: set the size options

  // ======

  // TODO: functions

  const onCreatePage = (values) => {
    // TODO: dispatch the action to create a size
    if (values?.name) {
      const slug = slugify(values.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/,
        strict: true,
      });
      dispatch(
        createPage({ data: { ...values, slug }, enqueueSnackbar, handleClose })
      );
    }
  };

  const onUpdatePage = (values) => {
    // TODO: dispatch the action to update a size
    dispatch(
      updatePage({
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
        onSubmit={handleSubmit(isEdit ? onUpdatePage : onCreatePage)}
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
          <RHFTextField name={"name"} label={" page name *"} />
          <RHFTextField name={"title"} label={" page title *"} />
          <RHFTextField name={"meta_title"} label={" page meta title *"} />
          <RHFTextField
            name={"meta_keywords"}
            label={" page meta keywords *"}
          />
          <RHFTextArea
            name={"meta_description"}
            label={" page meta description *"}
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
            {isEdit ? "Update Page" : "Create Page"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
