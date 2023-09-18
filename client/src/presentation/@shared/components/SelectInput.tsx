import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  Typography,
} from '@mui/material';

type Options = {
  value: string;
  label: string;
};

type FormSelectProps = {
  fullWidth: boolean;
  labelName: string;
  options: Options[];
  errorMessage?: string;
} & SelectProps;

export default function SelectInput({
  fullWidth,
  labelName,
  options,
  errorMessage,
  ...rest
}: FormSelectProps) {
  return (
    <Grid item xs={8}>
      <FormControl fullWidth={fullWidth}>
        <InputLabel id="demo-simple-select-label">{labelName}</InputLabel>
        <Select {...rest}>
          {options.map(({ label, value }) => {
            return (
              <MenuItem key={value} value={value}>
                {label.toUpperCase()}
              </MenuItem>
            );
          })}
        </Select>
        <Typography variant="caption" color="error" mt={1}>
          {errorMessage}
        </Typography>
      </FormControl>
    </Grid>
  );
}
