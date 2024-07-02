import PropTypes from "prop-types";
import { useEffect } from "react";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { FormHelperText, Stack, Typography } from "@mui/material";
import Editor from "../editor/Editor";
//

// ----------------------------------------------------------------------

RHFEditor.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFEditor({ name, placeholder, helperText, ...other }) {
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext();

  const values = watch();

  useEffect(() => {
    if (values[name] === "<p><br></p>") {
      setValue(name, "", {
        shouldValidate: !isSubmitSuccessful,
      });
    }
  }, [isSubmitSuccessful, name, setValue, values]);

  return (
    <Controller
      name={name || ""}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Stack>
            <Editor
              // id={name}
              value={field.value}
              onChange={field.onChange}
              error={!!error}
              helperText={
                (!!error || helperText) && (
                  <FormHelperText error={!!error} sx={{ px: 2 }}>
                    {error ? error?.message : helperText}
                  </FormHelperText>
                )
              }
              placeholder={placeholder}
              {...other}
            />

            <Typography
              variant="error"
              sx={{
                color: "red",
                fontSize: "0.8rem",
              }}
            >
              {error ? error?.message : helperText}
            </Typography>
          </Stack>
        );
      }}
    />
  );
}
