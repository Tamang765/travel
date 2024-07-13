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
import { createFaq, updateFaq } from "../../../redux/slices/faqSlice";
import { fetchPackages } from "../../../redux/slices/packageSlice";
import DynamicForm from "./DynamicForm";

const Form = forwardRef(
  (
    { handleClose, data, isEdit = false, setOption, option, packageId },
    ref
  ) => {
    // TODO: hooks

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    // TODO: useStates

    // TODO: get the data from slice

    const createColorLoading = useSelector((state) => state.color.isLoading);
    const packages = useSelector((state) => state.packages.packages);
    console.log(option);
    const Schema = Yup.object().shape({
      question: Yup.string().required("question is required"),
      answer: Yup.string().required("answer is required"),
      ...(option
        ? {}
        : { package_id: Yup.string().required("Package is required") }),
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

    const { handleSubmit, trigger, watch, clearErrors } = methods;

    // TODO: useEffects, write the useEffect codes here
    useEffect(() => {
      dispatch(fetchPackages({ enqueueSnackbar, page: 0, limit: 100 }));
    }, [dispatch, enqueueSnackbar]);

    // ======

    // TODO: functions

    const onCreateFaq = async (values) => {
      // if (!option?.id) {
      //   return;
      // }
      // TODO: dispatch the action to create a brand
      await dispatch(
        createFaq({
          data: { ...values, package_id: packageId },
          enqueueSnackbar,
          handleClose,
        })
      );
      // setOption({
      //   isOpen: true,
      // });
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

    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger();
        if (isValid) {
          console.log("Submit");

          handleSubmit(isEdit ? onUpdateFaq : onCreateFaq)();
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

    // TODO: console.logs

    return (
      <Box p={3}>

          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(isEdit ? onUpdateFaq : onCreateFaq)}
          >
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
              }}
            >
              {!packageId && (
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
                      label="Package id*"
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
              )}
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
  }
);

export default Form;
