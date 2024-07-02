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
import { createFaq, updateFaq } from "../../../redux/slices/faqSlice";
import { fetchPackages } from "../../../redux/slices/packageSlice";

const Form = ({ handleClose, data, isEdit = false }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates

  // TODO: get the data from slice

  const createColorLoading = useSelector((state) => state.color.isLoading);
  const packages = useSelector((state) => state.packages.packages);

  const Schema = Yup.object().shape({
    question: Yup.string().required("question is required"),
    answer: Yup.string().required("answer is required"),
    package_id: Yup.string().required("package is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      package_id: data?.package_id,
      question: data?.question,
      answer: data?.answer,
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
  useEffect(() => {
    dispatch(fetchPackages({ enqueueSnackbar, page: 0, limit: 100 }));
  }, [dispatch, enqueueSnackbar]);

  // ======

  // TODO: functions

  const onCreateFaq = (values) => {
    // TODO: dispatch the action to create a brand
    dispatch(createFaq({ data: values, enqueueSnackbar, handleClose }));
  };

  const onUpdateFaq = (values) => {
    // TODO: dispatch the action to update a brand
    dispatch(
      updateFaq({
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
        onSubmit={handleSubmit(isEdit ? onUpdateFaq : onCreateFaq)}
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
              label: data?.package_id || "",
              id: data?.package_id || "",
            }}
            name="package_id"
            id="combo-box-main-category"
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
                label="Package id *"
              />
            )}
            onChange={(event, newValues) =>
              methods.setValue("package_id", newValues ? newValues.id : null)
            }
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
          />
          <RHFTextField name={"question"} label={"Question *"} />
          <RHFTextField name={"answer"} label={"Answer *"} />
        </Box>

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createColorLoading}
            disabled={createColorLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update Faq" : "Create Faq"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default Form;
