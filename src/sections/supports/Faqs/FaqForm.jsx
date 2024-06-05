import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  RHFEditor,
  RHFSelect,
  RHFTextArea,
  RHFTextField,
} from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { boolData } from "../../../data/bool";
import { createFaq, updateFaq } from "../../../redux/slices/faqSlice";

const FaqForm = ({ handleClose, data, isEdit = false }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates

  // TODO: get the data from slice

  const createECLoading = useSelector((state) => state.faq.isLoading);

  const userTypes = useSelector((state) => state.userType.userTypes);

  const Schema = Yup.object().shape({
    user_type_id: Yup.string().required("user type is required"),
    question: Yup.string().required("question is required"),
    answer: Yup.string().required("answer is required"),
    order: Yup.string().required("order is required"),
  });

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      user_type_id: data?.user_type_id,
      question: data?.question,
      answer: data?.answer,
      order: data?.order,
      is_published: data?.is_published,
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

  // ======

  // TODO: functions

  const onCreateFAQ = (values) => {
    // TODO: dispatch the action to create a faq
    dispatch(createFaq({ data: values, enqueueSnackbar, handleClose }));
  };

  const onUpdateFAQ = (values) => {
    // TODO: dispatch the action to create a faq
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
        onSubmit={handleSubmit(isEdit ? onUpdateFAQ : onCreateFAQ)}
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
          <RHFSelect name={"user_type_id"} label="Select user type *">
            {userTypes?.data?.map((type, index) => (
              <MenuItem value={type?.id} key={index}>
                <span>{type?.title}</span>
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFTextArea
            name={"question"}
            label={"Please enter question *"}
            multiple={true}
            rows={2}
          />
          <Stack mb={5}>
            <span>Write answer *</span>
            <RHFEditor placeholder="Write anwser here..." name={"answer"} />
          </Stack>
          <RHFTextField name={"order"} label={"Order to show in web site"} />
          <RHFSelect name={"is_published"} label="Publish FAQ?">
            {boolData?.map((type, index) => (
              <MenuItem value={type?.value} key={index}>
                <span>{type?.label}</span>
              </MenuItem>
            ))}
          </RHFSelect>{" "}
        </Box>

        <Stack mt={2} alignItems={"end"}>
          <LoadingButton
            loading={createECLoading}
            disabled={createECLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            {isEdit ? "Update FAQ" : "Create FAQ"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default FaqForm;
