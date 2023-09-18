import { Box, Button, Grid } from '@mui/material';
import { useContext } from 'react';
import { Controller } from 'react-hook-form';

import { User } from '../../../../domain/models';
import { AVAILABLE_COLORS } from '../../../../domain/models/User';
import { cpfMask } from '../../../../domain/utils/cpf-mask';
import FormInput from '../../../@shared/components/FormInput';
import SelectInput from '../../../@shared/components/SelectInput';
import { CreateUserValidationContext } from '../validations/create';

type FormProps = {
  handleSubmit: (user: User, cb: () => void) => Promise<void>;
};

export default function Form({ handleSubmit: onSubmit }: FormProps) {
  const { control, errors, handleSubmit, reset } = useContext(CreateUserValidationContext);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Controller
          control={control}
          name="full_name"
          render={({ field: { onChange, value } }) => (
            <FormInput
              fullWidth
              required
              name="full_name"
              label="Nome Completo"
              value={value}
              autoComplete="off"
              onChange={onChange}
              errorMessage={errors.full_name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <FormInput
              fullWidth
              required
              name="cpf"
              label="CPF"
              value={cpfMask(value)}
              autoComplete="off"
              onChange={onChange}
              errorMessage={errors.cpf?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <FormInput
              fullWidth
              required
              name="email"
              label="E-mail"
              value={value}
              autoComplete="off"
              onChange={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="favorite_color"
          render={({ field: { onChange, value } }) => (
            <SelectInput
              fullWidth
              required
              name="favorite_color"
              labelName="Cor favorita"
              value={value}
              autoComplete="off"
              onChange={onChange}
              options={AVAILABLE_COLORS}
              errorMessage={errors.favorite_color?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="observations"
          render={({ field: { onChange, value } }) => (
            <FormInput
              fullWidth
              required
              name="observations"
              label="Observações"
              value={value}
              autoComplete="off"
              onChange={onChange}
              errorMessage={errors.observations?.message}
            />
          )}
        />

        <Grid item xs={12}>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit((data: User) => {
                onSubmit(data, reset);
              })}
            >
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
