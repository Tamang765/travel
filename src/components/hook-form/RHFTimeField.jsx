import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import moment from "moment";

// ----------------------------------------------------------------------

RHFTimeField.propTypes = {
  name: PropTypes.string,
  max_value: PropTypes.string,
  helperText: PropTypes.node,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  date: PropTypes.string,
  disableBeforeCurrentTime: PropTypes.bool, // New prop to conditionally disable times
};

export default function RHFTimeField({
  disabled = false,
  label,
  name,
  max_value,
  date,
  helperText,
  disableBeforeCurrentTime = false, // Default to false if not provided
  ...other
}) {
  const { control } = useFormContext();

  const currentDateTime = moment();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const [hours, minutes, seconds] = field.value?.split(":") || [
          "",
          "",
          "",
        ];
        return (
          <TimePicker
            disabled={disabled}
            {...field}
            value={
              field?.value &&
              moment().set({ hour: hours, minute: minutes, second: seconds })._d
            }
            onChange={(v) => field.onChange(moment(v, "HH:mm").format("HH:mm"))}
            minTime={
              disableBeforeCurrentTime ? currentDateTime.toDate() : undefined
            } // Conditionally set minTime
            slotProps={{
              textField: {
                helperText: error?.message || helperText,
              },
            }}
            label={label}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        );
      }}
    />
  );
}
