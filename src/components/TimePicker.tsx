import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

interface FormInputProps {
    name: string,
    control: Control<FieldValues>,
    label?: string,
 }

interface ICarpool {
    name: string,
    location: string,
    date: string,
    time: string
}

export const FormInputDate = ({ name, control, label }: FormInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker value={value as string | number} onChange={onChange} />
        )}
      />
    </LocalizationProvider>
  );
};