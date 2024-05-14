import { FieldValues, useForm as useHookForm } from 'react-hook-form';

import { validateContract } from './validator';
import { buildValues } from './value-builder';
import { SelectField, TextAreaField, TextField } from '../components';
import { FormComponent, FormProps, UseFormProps } from '../types';

function useForm<T extends FieldValues>({
  contract,
  values,
  customComponents = [],
}: UseFormProps<T>): FormProps<T> {
  const components = [
    ...customComponents,
    SelectField,
    TextAreaField,
    TextField,
  ] as FormComponent<unknown, object>[];

  validateContract({
    contract,
    allowedComponents: components.map((component) => component.id),
  });

  const formValues = buildValues({ contract, values });
  const methods = useHookForm<T>({ values: formValues });
  return {
    ...methods,
    contract,
    components,
  };
}

export { useForm };
