import { FormControl, Grid, TextField, TextFieldProps, Typography } from '@mui/material';

type FormInputProps = {
  fullWidth: boolean;
  errorMessage?: string;
} & TextFieldProps;

export default function FormInput({ fullWidth, errorMessage, ...rest }: FormInputProps) {
  return (
    <Grid item xs={8}>
      <FormControl fullWidth={fullWidth}>
        <TextField {...rest} />
        <Typography variant="caption" color="error" mt={1}>
          {errorMessage}
        </Typography>
      </FormControl>
    </Grid>
  );
}
