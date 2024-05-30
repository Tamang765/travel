import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Stack, TextField, Typography } from "@mui/material";

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  max_value: PropTypes.string,
  helperText: PropTypes.node,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.node,
};

export default function RHFTextField({
  disabled = false,
  name,
  max_value,
  helperText,
  label,
  icon,
  size = "small",
  // color = "black",
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack>
          <TextField
            // color={color}
            size={size}
            label={<span>{label}</span>}
            disabled={disabled}
            {...field}
            fullWidth
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            error={!!error}
            // helperText={error ? error?.message : helperText}
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
      )}
    />
  );
}
