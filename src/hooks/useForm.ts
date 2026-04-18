import { FieldValues, useForm as useHookForm } from 'react-hook-form';

import { Input, Label, Select, TextArea } from '@tarsilla/react-form-components';

import { UseFormFormReturn, UseFormProps } from '@types';

import { validateContract } from './validator/validator.js';

function useForm<FormValue extends FieldValues>({
  contract,
  customComponents = [],
  values,
}: UseFormProps<FormValue>): UseFormFormReturn<FormValue> {
  //TODO remove overrides (id)
  const components = [Input, Label, Select, TextArea, ...customComponents];

  validateContract({
    allowedComponents: components.map((component) => component.id),
    contract,
  });

  const methods = useHookForm<FormValue, unknown, FormValue>({ values });
  return {
    components,
    contract,
    ...methods,
  };
}

export { useForm };
