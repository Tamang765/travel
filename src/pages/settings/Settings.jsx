import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";
import { Box, Card, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import CustomDivider from "../../components/component/divider/Divider";
import { RHFSwitch, RHFTextField } from "../../components/hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { createRefer, fetchRefer } from "../../redux/slices/referSlice";
import { Shadow, TitleMd, TitleSm } from "../../routers";

const Settings = () => {
  console.log("I am in settings");

  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates

  // TODO: get the data from slice
  const setting = useSelector((state) => state.setting.refer);
  const isLoading = useSelector((state) => state.setting.isLoading);

  //   TODO: validation schema
  const Schema = Yup.object().shape({});

  // TODO: default values in the form
  const defaultValues = useMemo(
    () => ({
      referral_amt: setting?.referral_amt || 10,
      enable_referral: setting?.enable_referral || 0,
      delivery_charges: setting?.delivery_charges || 100,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setting]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch, reset } = methods;

  // TODO: useEffects, write the useEffect codes here

  useEffect(() => {
    dispatch(fetchRefer({ enqueueSnackbar }));
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (setting) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setting]);

  // TODO: functions

  const onSaveSetting = (values) => {
    dispatch(
      createRefer({
        enqueueSnackbar,
        data: {
          ...values,
          enable_referral: values.enable_referral ? 1 : 0,
          delivery_charges: +values.delivery_charges,
        },
        id: setting?.id,
      })
    );
  };

  //   TODO: ==============

  //   TODO: console.log
  console.log(setting, isLoading, "setting");

  return (
    <Shadow>
      <Card
        color="transparent"
        shadow={false}
        sx={{
          p: 3,
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSaveSetting)}>
          <Stack>
            <Box>
              <TitleMd>Refer setting</TitleMd>
              <CustomDivider />

              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(4, 1fr)",
                }}
              >
                <RHFSwitch
                  name={"enable_referral"}
                  label={<TitleSm>Enable Refer?</TitleSm>}
                  labelPlacement="start"
                />

                <RHFTextField
                  name={"referral_amt"}
                  disabled={!watch()?.enable_referral}
                  label={"Referral value"}
                />
              </Box>
            </Box>

            <CustomDivider />

            <Box>
              <TitleMd>Delivery charge setting</TitleMd>

              <CustomDivider />

              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(4, 1fr)",
                }}
              >
                <RHFTextField
                  name={"delivery_charges"}
                  label={"Delivery charge amount"}
                />
              </Box>
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                className="mt-5"
              >
                Save
              </Button>
            </Box>
          </Stack>
        </FormProvider>
      </Card>
    </Shadow>
  );
};

export default Settings;
