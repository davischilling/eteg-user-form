import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { api } from '../../../../domain/api';
import { InvalidFieldError } from '../../../../domain/errors/invalid-field';
import { User } from '../../../../domain/models';
import { FormValidation } from '../../../@shared/contexts/Validation';
import Form from '../components/Form';
import {
  CreateUserDefaultValues,
  createUserSchema,
  CreateUserValidationContext,
} from '../validations/create';

export function CreateUserPage() {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (user: User, cb: () => void) => {
    const fmtCpf = user.cpf.slice(0, 14);
    try {
      await api.post('/users', {
        ...user,
        cpf: fmtCpf,
      });
      enqueueSnackbar('Usuário criado com sucesso', { variant: 'success' });
      cb();
    } catch (error: any) {
      if (error instanceof InvalidFieldError) {
        enqueueSnackbar('CPF ou E-mail já utilizado', { variant: 'error' });
      } else {
        enqueueSnackbar('Algo deu errado', { variant: 'error' });
      }
    }
  };

  return (
    <Box>
      <Paper>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={'row'}
          flexWrap={'wrap'}
        >
          <Box p={4} mr={12}>
            <Box justifyContent={'center'} alignItems={'center'}>
              <Typography align="center" variant="h4">
                John Doe Form
              </Typography>
            </Box>
          </Box>
          <Box flex={1}>
            <FormValidation
              ValidationContext={CreateUserValidationContext}
              defaultValues={CreateUserDefaultValues}
              schema={createUserSchema}
            >
              <Form handleSubmit={onSubmit} />
            </FormValidation>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
