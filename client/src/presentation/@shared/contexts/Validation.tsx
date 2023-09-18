import { ReactNode, useMemo } from 'react';
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import * as yup from 'yup';

import { useValidation } from '../hooks/useValidation';

export interface ValidationContextType<T extends FieldValues> {
  control: Control<T, any>;
  handleSubmit: UseFormHandleSubmit<T>;
  errors: FieldErrors<T>;
  reset: UseFormReset<T>;
}

interface ValidationProviderProps<T extends FieldValues> {
  children: ReactNode;
  defaultValues?: any;
  schema: yup.ObjectSchema<any>;
  ValidationContext: React.Context<ValidationContextType<T>>;
}

function ValidationProvider<T extends FieldValues>({
  children,
  defaultValues,
  schema,
  ValidationContext,
}: ValidationProviderProps<T>) {
  const { control, errors, handleSubmit, reset } = useValidation<T>({
    defaultValues,
    schema,
  });

  const memo = useMemo(() => {
    return {
      control,
      errors,
      handleSubmit,
      reset,
    };
  }, [control, errors, handleSubmit, reset]);

  return <ValidationContext.Provider value={memo}>{children}</ValidationContext.Provider>;
}

export function FormValidation<T extends FieldValues>({
  ValidationContext,
  schema,
  defaultValues,
  children,
}: ValidationProviderProps<T>) {
  return (
    <ValidationProvider
      ValidationContext={ValidationContext}
      schema={schema}
      defaultValues={defaultValues}
    >
      {children}
    </ValidationProvider>
  );
}
