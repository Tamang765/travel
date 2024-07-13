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
import { RHFSwitch, RHFTextField } from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import {
  createPricing,
  updatePricing,
} from "../../../redux/slices/pricingSlice";

const DynamicForm = forwardRef(
  ({ isView = false, data, packageId, isEdit }, ref) => {
    // TODO: hooks

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const Schema = Yup.object().shape({
      // currency: Yup.string().required("currency is required"),
      // price: Yup.string().required("price is required"),
    });

    // TODO: default values in the form
    const defaultValues = useMemo(
      () => ({
        package_id: data?.package_id,
        currency: data?.currency,
        price: data?.price,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [data]
    );

    const methods = useForm({
      resolver: yupResolver(Schema),
      defaultValues,
    });

    const { handleSubmit, trigger, watch, clearErrors } = methods;

    const initialFields = data?.content
      ? JSON.parse(data.content)
      : [
          {
            currency: "",
            price: "",
            pax: "",
            is_per_pax_price: false,
            capacity: "",
          },
        ];
    const [inputFields, setInputFields] = useState(
      (data?.length && data) || initialFields
    );

    // useEffect(() => {
    //   setContent(inputFields);
    // }, [inputFields, setContent]);

    const handleChangeInput = (index, event) => {
      const { name, value } = event.target;
      const values = [...inputFields];
      values[index][name] = value;
      setInputFields(values);
    };

    const handleAddFields = () => {
      setInputFields([
        ...inputFields,
        {
          currency: "",
          price: "",
          pax: "",
          is_per_pax_price: false,
          capacity: "",
        },
      ]);
    };

    const handleRemoveFields = (index) => {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    };

    const onCreatePrice = async (values) => {
      const res = await dispatch(
        createPricing({
          data: { pricings: inputFields, package_id: packageId },
          enqueueSnackbar,
        })
      );
    };

    const onUpdatePrice = (values) => {
      //filter faq with id
      const priceToUpdate = inputFields.filter((field) => field.id && field);
      //filter price without id

      const priceToCreate = inputFields.filter((field) => !field.id && field);

      // dispatch(
      //   updatePricing({
      //     data: values,
      //     enqueueSnackbar,
      //     id: data?.id,
      //   })
      // );

      // TODO: dispatch the action to update a brand
      if (priceToCreate) {
        dispatch(
          createPricing({
            data: {
              pricings: priceToCreate,
              package_id: data?.[0]?.package_id,
            },
            enqueueSnackbar,
          })
        );
      }
      priceToUpdate?.forEach((field) => {
        dispatch(
          updatePricing({
            data: { pricings: field, package_id: data?.[0]?.package_id },
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
          handleSubmit(isEdit ? onUpdatePrice : onCreatePrice)();
        }
        return isValid;
      },
    }));

    return (
      <Box p={3}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onCreatePrice)}>
          <div className="w-full flex flex-col mt-3 gap-8">
            {inputFields.map((inputField, index) => (
              <div
                key={index}
                className="flex flex-col w-full gap-6 border-b-2 shadow-lg px-3"
              >
                <RHFTextField
                  fullWidth
                  name="currency"
                  label="Currency"
                  variant="outlined"
                  size="small"
                  value={inputField.currency || ""}
                  onChange={(e) =>
                    setInputFields((prev) => {
                      return prev.map((item, i) => {
                        if (i === index) {
                          return { ...item, currency: e.target.value };
                        }
                        return item;
                      });
                    })
                  }
                  disabled={isView}
                />
                <RHFTextField
                  name="price"
                  label="Price"
                  placeholder="Write price here..."
                  value={inputField.price || ""}
                  disabled={isView}
                  onChange={(e) =>
                    setInputFields((prev) => {
                      return prev.map((item, i) => {
                        if (i === index) {
                          return { ...item, price: e.target.value };
                        }
                        return item;
                      });
                    })
                  }
                  type="number"
                />
                <RHFTextField
                  name="pax"
                  label="Pax"
                  placeholder="Write pax here..."
                  value={inputField.pax || ""}
                  disabled={isView}
                  onChange={(e) =>
                    setInputFields((prev) => {
                      return prev.map((item, i) => {
                        if (i === index) {
                          return { ...item, pax: e.target.value };
                        }
                        return item;
                      });
                    })
                  }
                  type="number"
                />
                <RHFSwitch
                  name="is_per_pax_price"
                  label="Is_per_pax_price"
                  placeholder="Write is_per_pax_price here..."
                  value={inputField.is_per_pax_price || ""}
                  disabled={isView}
                  onChange={(e) =>
                    setInputFields((prev) => {
                      return prev.map((item, i) => {
                        if (i === index) {
                          return { ...item, is_per_pax_price: e.target.value };
                        }
                        return item;
                      });
                    })
                  }
                />{" "}
                <RHFTextField
                  name="capacity"
                  label="Capacity"
                  placeholder="Write capacity here..."
                  value={inputField.capacity || ""}
                  disabled={isView}
                  onChange={(e) =>
                    setInputFields((prev) => {
                      return prev.map((item, i) => {
                        if (i === index) {
                          return { ...item, capacity: e.target.value };
                        }
                        return item;
                      });
                    })
                  }
                  type="number"
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
