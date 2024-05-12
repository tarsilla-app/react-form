import { FieldValues, useForm as useHookForm } from 'react-hook-form';

import { validateContract } from './validator';
import { buildValues } from './value-builder';
import { SelectField, TextAreaField, TextField } from '../allowed-fields';
import { FormField, FormProps, UseFormProps } from '../types';

function useForm<T extends FieldValues>({
  contract,
  values,
  customFields = [],
}: UseFormProps<T>): FormProps<T> {
  const fields = [
    ...customFields,
    SelectField,
    TextAreaField,
    TextField,
  ] as FormField<unknown>[];

  validateContract({
    contract,
    allowedFieldTypes: fields.map((field) => field.id),
  });

  const formValues = buildValues({ contract, values });
  const methods = useHookForm<T>({ values: formValues });
  return {
    ...methods,
    contract,
    fields,
  };
}

export { useForm };
