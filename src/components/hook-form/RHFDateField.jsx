import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import moment from "moment";

// ----------------------------------------------------------------------

RHFDateField.propTypes = {
  name: PropTypes.string,
  max_value: PropTypes.string,
  helperText: PropTypes.node,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  date: PropTypes.string,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
};

export default function RHFDateField({
  disabled = false,
  label,
  name,
  max_value,
  date,
  helperText,
  maxDate,
  minDate,
  size = "small",
  ...other
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack>
          {console.log(field?.value, "value")}
          <DatePicker
            slotProps={{ textField: { size: size } }}
            maxDate={maxDate ? moment(maxDate) : undefined}
            minDate={minDate ? moment(minDate) : undefined}
            disabled={disabled}
            {...field}
            label={<span>{label}</span>}
            value={field?.value && moment(field.value)._d}
            onChange={(v) =>
              field.onChange(v ? dayjs(v).format("YYYY-MM-DD") : null)
            }
            // onChange={(v) => field.onChange(moment(v).format("YYYY-MM-DD"))}
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
