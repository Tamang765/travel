import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";
import { Box, InputAdornment, MenuItem, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  RHFDateField,
  RHFSelect,
  RHFTextField,
} from "../../components/hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { Upload } from "../../components/upload";
import { genderData } from "../../data/gender";
import { createTeamMembers } from "../../redux/slices/teamSlice";
import { appendFormValuesToFormData } from "../../utils/appendFormData";
import { emailRegex, passwordRegex } from "../../utils/regex";

const TeamForm = ({ handleClose }) => {
  // TODO: hooks

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: useStates
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  // TODO: get the data from slice

  const roles = useSelector((state) => state.role.roles);
  const createUserLoading = useSelector((state) => state.team.isLoading);

  const Schema = Yup.object().shape({
    email: Yup.string()
      .required("email is required")
      .matches(emailRegex, "email must be a valid email address"),
    password: Yup.string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    name: Yup.string().required("full name is required"),
    primary_phone: Yup.string().required("phone number is required"),
    username: Yup.string().required("username is required"),
    gender: Yup.string().required("gender is required"),
    dob: Yup.string().required("dob is required"),
    user_type: Yup.string().required("role is required"),
  });

  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  const { handleSubmit } = methods;

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

  const onCreateUser = (values) => {
    const formData = new FormData();
    // Append all form values to FormData
    appendFormValuesToFormData(formData, values);

    // Append the profile picture if it exists
    if (profilePic) {
      formData.append("profile_image", profilePic);
    }

    // TODO: dispatch the action to create a team member
    dispatch(
      createTeamMembers({ data: formData, enqueueSnackbar, handleClose })
    );
  };

  // TODO: console.logs

  return (
    <Box p={3}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onCreateUser)}>
        <Stack flexDirection={"row"} justifyContent={"center"} mb={2}>
          <Box>
            <Upload
              isAvatar={true}
              text={"Upload picture"}
              file={profilePic}
              name="profile_image"
              accept="image/*"
              maxSize={1}
              onDrop={handleDropPhoto}
            />
          </Box>
        </Stack>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(3, 1fr)",
          }}
        >
          <RHFTextField name={"name"} label={"Full name *"} />
          <RHFTextField name={"username"} label={"User name *"} />
          <RHFSelect name={"gender"} label="Gender *">
            {genderData?.map((gender, index) => (
              <MenuItem value={gender?.value} key={index}>
                <span>{gender?.label}</span>
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFTextField name={"email"} label={"User email *"} />
          <RHFTextField name={"primary_phone"} label={"Primary phone *"} />
          <RHFTextField name={"secondary_phone"} label={"Seconday phone"} />
          <RHFDateField name={"dob"} label={"Date of birth"} />
          <RHFSelect name={"user_type"} label="Select user's role *">
            {roles?.data?.map((role, index) => (
              <MenuItem value={role?.id} key={index}>
                <span>{role?.title}</span>
              </MenuItem>
            ))}
          </RHFSelect>

          <RHFTextField
            name={"password"}
            label={"Create password"}
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
        </Box>

        <Stack mt={2} alignItems={"end"}>
          <Button
            loading={createUserLoading}
            disabled={createUserLoading}
            type="submit"
            variant="contained"
            className="!bg-primary w-fit"
          >
            Create User
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default TeamForm;
