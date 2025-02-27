import { Select, Text, TextArea } from '@tarsilla/react-form-components';
import { FieldValues, useForm as useHookForm } from 'react-hook-form';

import { FormProps, UseFormProps } from '@types';

import { validateContract } from './validator/index.js';
import { buildValues } from './value-builder/index.js';

function useForm<FormValue extends FieldValues>({
  contract,
  values,
  customComponents = [],
}: UseFormProps<FormValue>): FormProps<FormValue> {
  const components = [...customComponents, Select, TextArea, Text];

  validateContract({
    contract,
    allowedComponents: components.map((component) => component.id),
  });

  const formValues = buildValues({ contract, values });
  const methods = useHookForm<FormValue>({ values: formValues });
  return {
    ...methods,
    contract,
    components,
  };
}

export { useForm };
