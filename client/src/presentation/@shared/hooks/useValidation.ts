import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
  defaultValues?: any;
  schema: yup.ObjectSchema<any>;
};

export function useValidation<T extends FieldValues>({ defaultValues, schema }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return { control, handleSubmit, errors, reset };
}
