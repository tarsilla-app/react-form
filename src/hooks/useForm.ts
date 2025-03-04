import { Input, Label, Select, TextArea } from '@tarsilla/react-form-components';
import { FieldValues, useForm as useHookForm } from 'react-hook-form';

import { FormProps, UseFormProps } from '@types';

import { validateContract } from './validator/index.js';

function useForm<FormValue extends FieldValues>({
  contract,
  values,
  customComponents = [],
}: UseFormProps<FormValue>): FormProps<FormValue> {
  const components = [Input, Label, Select, TextArea, ...customComponents];

  validateContract({
    contract,
    allowedComponents: components.map((component) => component.id),
  });

  const methods = useHookForm<FormValue>({ values });
  return {
    contract,
    components,
    ...methods,
  };
}

export { useForm };
