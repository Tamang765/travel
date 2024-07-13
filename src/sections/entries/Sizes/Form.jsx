import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import * as Yup from "yup";
import { RHFTextArea, RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { createPage, updatePage } from "../../../redux/slices/pageSlice";

const Form = forwardRef(
  ({ handleClose, data, isEdit = false, stepper = false, setPageId }, ref) => {
    // TODO: hooks

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    // TODO: useStates

    // TODO: get the data from slice

    const createSizeLoading = useSelector((state) => state.size.isLoading);
    const categories = useSelector((state) => state.category.categories);

    const Schema = Yup.object().shape({
      name: Yup.string().required("Page's name is required"),
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

    const { handleSubmit, trigger, setError, clearErrors, watch } = methods;

    // TODO: useEffects, write the useEffect codes here

    // TODO: set the size options

    // ======

    // TODO: functions

    const onCreatePage = async (values) => {
      // TODO: dispatch the action to create a size
      if (values?.name) {
        const slug = slugify(values.name, {
          lower: true,
          remove: /[*+~.()'"!:@]/,
          strict: true,
        });
        const res = stepper
          ? await dispatch(
              createPage({
                data: { ...values, slug },
                enqueueSnackbar,
              })
            )
          : await dispatch(
              createPage({
                data: { ...values, slug },
                enqueueSnackbar,
                handleClose,
              })
            );
        setPageId(res?.payload?.data?.id);
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

    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger();
        if (isValid) {
          handleSubmit(isEdit ? onUpdatePage : onCreatePage)();
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
              {isEdit ? "Update Page" : "Create Page"}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    );
  }
);

export default Form;
