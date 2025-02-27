/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormComponent } from '@tarsilla/react-form-components';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { Contract } from './Contract.js';
import { UnknownObject } from './UnknownObject.js';

type UseFormProps<FormValue extends FieldValues> = {
  contract: Contract<FormValue>;
  values?: FormValue;
  customComponents?: FormComponent<any, UnknownObject>[];
};

type FormProps<FormValue extends FieldValues> = UseFormReturn<FormValue, unknown, undefined> & {
  contract: Contract<FormValue>;
  components: FormComponent<any, UnknownObject>[];
};

export { type UseFormProps, type FormProps };
