import { FieldValues, UseFormReturn as ReactUseFormReturn } from 'react-hook-form';

import { FormComponent } from '@tarsilla/react-form-components';

import { Contract } from './Contract.js';

type UseFormProps<FormValue extends FieldValues> = {
  contract: Contract<FormValue>;
  values?: FormValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customComponents?: FormComponent<any, object>[];
};

type UseFormFormReturn<FormValue extends FieldValues> = ReactUseFormReturn<FormValue, unknown, undefined> & {
  contract: Contract<FormValue>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: FormComponent<any, object>[];
};

export { type UseFormProps, type UseFormFormReturn };
