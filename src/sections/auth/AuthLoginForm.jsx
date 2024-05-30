import { useState } from "react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Alert, InputAdornment, Stack } from "@mui/material";
// auth
// components
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../auth/useAuthContext";
import FormProvider from "../../components/hook-form/FormProvider";
import RHFTextField from "../../components/hook-form/RHFTextField";

// ----------------------------------------------------------------------

export default function AuthLoginForm() {
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // reset();
      setError("afterSubmit", {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <>
                  {showPassword ? (
                    <BsEyeSlashFill
                      className="text-xl cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <BsEyeFill
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xl cursor-pointer"
                    />
                  )}
                </>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          variant="body2"
          color="inherit"
          underline="hover"
          className="text-black hover:underline"
        >
          Forgot password?
        </Link>
      </Stack>
      <LoadingButton
        disabled={loading}
        variant="contained"
        loading={loading}
        type="submit"
        className="uppercase items-center !bg-primary w-full text-sm text-white p-2.5 px-6 rounded-lg font-bold flex justify-center"
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
