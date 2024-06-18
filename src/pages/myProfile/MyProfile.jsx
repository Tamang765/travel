import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useAuthContext } from "../../auth/useAuthContext";
import { RHFTextField } from "../../components/hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { Upload } from "../../components/upload";
import { changePassword } from "../../redux/slices/authSlice";
import { changeProfilePic, updateProfile } from "../../redux/slices/userSlice";
import { emailRegex, passwordRegex } from "../../utils/regex";

const MyProfile = () => {
  const { user, updateMe } = useAuthContext();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [profilePic, setProfilePic] = useState(null);

  const roles = useSelector((state) => state.role.roles);
  const loading = useSelector((state) => state.auth.isLoading);
  const profileLoading = useSelector((state) => state.user.isLoading);

  // Validation schema for personal information
  const personalInfoSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(emailRegex, "Email must be a valid email address"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone number is required"),
  });

  // Validation schema for password change
  const passwordSchema = Yup.object().shape({
    old_password: Yup.string().required("Old password is required"),
    password: Yup.string()
      .required("New password is required")
      .matches(
        passwordRegex,
        "password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    password_confirmation: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  // Default values for personal information form
  const personalInfoDefaultValues = useMemo(
    () => ({
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
      phone: user?.phone,
    }),
    [user]
  );

  // Default values for password change form
  const passwordDefaultValues = {
    old_password: "",
    password: "",
    password_confirmation: "",
  };

  const personalInfoMethods = useForm({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: personalInfoDefaultValues,
  });

  const passwordMethods = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: passwordDefaultValues,
  });

  const { handleSubmit: handlePersonalInfoSubmit } = personalInfoMethods;
  const { handleSubmit: handlePasswordSubmit, reset } = passwordMethods;

  // TODO: useEffects

  // TODO: upload the profile pic when changed``

  useEffect(() => {
    if (profilePic) {
      const formData = new FormData();
      formData.append("profile_image", profilePic);

      dispatch(changeProfilePic({ enqueueSnackbar, data: formData, updateMe }));
    }
  }, [profilePic, dispatch, enqueueSnackbar, updateMe]);

  // TODO: functions

  const handleDropPhoto = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setProfilePic(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
      setProfilePic(acceptedFiles[0]);
    }
  }, []);

  const updatePersonalInfo = (values) => {
    dispatch(updateProfile({ enqueueSnackbar, data: values, updateMe }));
  };

  const updatePassword = (values) => {
    dispatch(changePassword({ enqueueSnackbar, data: values, reset }));
  };

  // TODO: console.logs

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4">
          <Card className="mb-4">
            <CardHeader className="flex flex-col items-center p-4">
              <div className="mb-4">
                <Upload
                  loading={profileLoading}
                  disabled={profileLoading}
                  text={"Upload picture"}
                  file={
                    profilePic ||
                    user?.profile ||
                    "https://via.placeholder.com/150"
                  }
                  isAvatar={true}
                  accept="image/*"
                  maxSize={1}
                  onDrop={handleDropPhoto}
                />
              </div>
              <Typography variant="h6" className="text-center">
                {user?.email}
              </Typography>

              <div className="flex items-center mt-2">
                <Typography variant="small">User ID: {user?.id}</Typography>
              </div>

              <div className="flex items-center mt-2">
                <Typography variant="small">
                  Role :{" "}
                  {
                    roles?.data?.find((role) => role?.id === user?.role_id)
                      ?.name
                  }
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <Typography variant="subtitle1">
                  First Name: {user?.first_name}
                </Typography>
                <Typography variant="subtitle1">
                  Last Name: {user?.last_name}
                </Typography>
                <Typography variant="subtitle1">
                  Phone: {user?.phone}
                </Typography>
              </div>

              <Button
                variant="outlined"
                className="flex items-center justify-center"
              >
                <FaTrash className="mr-2" /> Delete User
              </Button>
            </CardBody>
          </Card>
        </div>

        <div className="md:w-2/3 p-4">
          <Card className="mb-4">
            <CardBody>
              <Typography variant="h6" className="mb-2">
                Personal Information
              </Typography>
              <FormProvider
                methods={personalInfoMethods}
                onSubmit={handlePersonalInfoSubmit(updatePersonalInfo)}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <RHFTextField name={"first_name"} label={"First Name"} />
                    </div>
                    <div className="w-1/2">
                      <RHFTextField name={"last_name"} label={"Last Name"} />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <RHFTextField name={"email"} label={"Email Address"} />
                    </div>
                    <div className="w-1/2">
                      <RHFTextField name={"phone"} label={"Phone Number"} />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="!bg-primary w-fit mt-4"
                  color="purple"
                >
                  Update profile
                </Button>
              </FormProvider>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardBody>
              <Typography variant="h6" className="mb-2">
                Change password
              </Typography>
              <FormProvider
                methods={passwordMethods}
                onSubmit={handlePasswordSubmit(updatePassword)}
              >
                <div className="flex flex-col space-y-4">
                  <RHFTextField name={"old_password"} label={"Old Password"} />

                  <RHFTextField name={"password"} label={"New Password"} />

                  <RHFTextField
                    name={"password_confirmation"}
                    label={"Confirm Password"}
                  />
                </div>
                <Button
                  loading={loading}
                  disabled={loading}
                  type="submit"
                  className="!bg-primary w-fit mt-4"
                  color="purple"
                >
                  Change password
                </Button>
              </FormProvider>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
