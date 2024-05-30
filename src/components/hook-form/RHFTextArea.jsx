import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Textarea } from "@material-tailwind/react";
import { Stack, Typography } from "@mui/material";

// ----------------------------------------------------------------------

RHFTextArea.propTypes = {
  name: PropTypes.string,
  rows: PropTypes.number,
  max_value: PropTypes.string,
  helperText: PropTypes.node,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.node,
};

export default function RHFTextArea({
  disabled = false,
  name,
  max_value,
  helperText,
  label,
  icon,
  size = "lg",
  rows = 3,
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
          <Textarea
            rows={rows}
            label={label}
            disabled={disabled}
            {...field}
            fullWidth
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            error={!!error}
            InputProps={{
              inputProps: {
                max: max_value,
              },
            }}
            icon={icon}
            helperText={error ? error?.message : helperText}
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
