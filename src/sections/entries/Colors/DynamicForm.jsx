import { yupResolver } from "@hookform/resolvers/yup";
import { Box, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { createFaq, updateFaq } from "../../../redux/slices/faqSlice";

const DynamicForm = forwardRef(
  ({ isView = false, data, packageId, isEdit = false }, ref) => {
    // TODO: hooks

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const Schema = Yup.object().shape({
      // question: Yup.string().required("question is required"),
      // answer: Yup.string().required("answer is required"),
    });

    // TODO: default values in the form
    const defaultValues = useMemo(
      () => ({
        package_id: data?.package_id,
        question: data?.question,
        answer: data?.answer,
      }),
      [data]
    );

    const methods = useForm({
      resolver: yupResolver(Schema),
      defaultValues,
    });

    const { handleSubmit, trigger, watch, clearErrors } = methods;

    const initialFields = data?.content
      ? JSON.parse(data.content)
      : [{ question: "", answer: "" }];
    const [inputFields, setInputFields] = useState(
      (data?.length && data) || initialFields
    );

    // useEffect(() => {
    //   setContent(inputFields);
    // }, [inputFields, setContent]);

    const handleChangeInput = (index, event) => {
      const { name, value } = event.target;
      const values = inputFields;
      // values[index][name] = value;
      // setInputFields(values);
    };

    const handleAddFields = () => {
      setInputFields([...inputFields, { question: "", answer: "" }]);
    };

    const handleRemoveFields = (index) => {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    };

    const onCreateFaq = async (values) => {
      // TODO: dispatch the action to create a brand
      await dispatch(
        createFaq({
          data: { faqs: inputFields, package_id: packageId },
          enqueueSnackbar,
        })
      );
    };

    const onUpdateFaq = (values) => {

      //filter faq with id
      const faqToUpdate = inputFields.filter((field) => field.id && field);
      //filter faq without id

      const faqToCreate = inputFields.filter((field) => !field.id && field);

      // TODO: dispatch the action to update a brand
      if (faqToCreate) {
        dispatch(
          createFaq({
            data: { faqs: faqToCreate, package_id: data?.[0]?.package_id },
            enqueueSnackbar,
          })
        );
      }
      faqToUpdate?.forEach((field) => {
        dispatch(
          updateFaq({
            data: { faqs: field, package_id: data?.[0]?.package_id },
            enqueueSnackbar,
            id: field.id,
          })
        );
      });
    };

    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger();
        if (isValid) {

          handleSubmit(isEdit ? onUpdateFaq : onCreateFaq)();
        }
        return isValid;
      },
    }));

    return (
      <Box p={3}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onCreateFaq)}>
          <div className="w-full flex flex-col mt-3">
            {inputFields.map((inputField, index) => (
              <div key={index} className="flex flex-col w-full gap-2">
                <RHFTextField
                  fullWidth
                  name="question"
                  label="Question"
                  variant="outlined"
                  size="small"
                  value={inputField.question || ""}
                  onChange={(e) =>
                    setInputFields((prev) => {
                      return prev.map((item, i) => {
                        if (i === index) {
                          return { ...item, question: e.target.value };
                        }
                        return item;
                      });
                    })
                  }
                  disabled={isView}
                />

                <RHFTextField
                  name="answer"
                  label="Answer"
                  placeholder="Write answer here..."
                  value={inputField.answer || ""}
                  disabled={isView}
                  onChange={(e) =>
                    setInputFields((prev) => {
                      return prev.map((item, i) => {
                        if (i === index) {
                          return { ...item, answer: e.target.value };
                        }
                        return item;
                      });
                    })
                  }
                />

                <Box>
                  <IconButton onClick={() => handleRemoveFields(index)}>
                    -
                  </IconButton>
                  <IconButton onClick={() => handleAddFields()}>+</IconButton>
                </Box>
              </div>
            ))}
          </div>
        </FormProvider>
      </Box>
    );
  }
);

export default memo(DynamicForm);
