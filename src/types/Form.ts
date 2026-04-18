import { FieldValues, UseFormReturn as ReactUseFormReturn } from 'react-hook-form';

import { FormComponent } from '@tarsilla/react-form-components';

import { Contract } from './Contract.js';

type UseFormFormReturn<FormValue extends FieldValues> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: FormComponent<any, object>[];
  contract: Contract<FormValue>;
} & ReactUseFormReturn<FormValue, unknown, FormValue>;

type UseFormProps<FormValue extends FieldValues> = {
  contract: Contract<FormValue>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customComponents?: FormComponent<any, object>[];
  values?: FormValue;
};

export { type UseFormFormReturn, type UseFormProps };
