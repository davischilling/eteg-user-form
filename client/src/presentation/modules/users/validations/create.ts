import { createContext } from 'react';
import * as yup from 'yup';

import { User } from '../../../../domain/models';
import { ValidationContextType } from '../../../@shared/contexts/Validation';

export type CreateUserFormData = User;

export const CreateUserValidationContext = createContext(
  {} as ValidationContextType<CreateUserFormData>,
);

export const CreateUserDefaultValues = {
  full_name: '',
  cpf: '',
  email: '',
  favorite_color: '',
  observations: '',
};

export const createUserSchema = yup.object().shape({
  full_name: yup.string().required('Informe o nome completo.'),
  cpf: yup.string().required('Informe o CPF.').min(13, 'O CPF deve ter 11 dígitos.'),
  email: yup.string().required('Informe o e-mail.').email('Informe um e-mail válido.'),
  favorite_color: yup.string().required('Informe a cor favorita.'),
  observations: yup.string().required('Informe as observações.'),
});
