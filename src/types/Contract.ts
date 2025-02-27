/* eslint-disable @typescript-eslint/no-explicit-any */

import { CSSProperties } from 'react';

import { TabProps } from '@tarsilla/react-components/tab';
import { FormComponentProps } from '@tarsilla/react-form-components';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { UnknownObject } from './UnknownObject.js';

type Contract<FormValue extends FieldValues> = {
  tab?: ContractTabs<FormValue>;
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  style?: CSSProperties | TabProps['style'];
};

type ContractTabs<FormValue extends FieldValues> = {
  tabs: ContractTab<FormValue>[];
  style?: TabProps['style'];
};

type ContractRow<FormValue extends FieldValues> = {
  id: string;
  fields?: ContractField<FormValue>[];
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  style?: CSSProperties;
};

type ContractColumn<FormValue extends FieldValues> = {
  id: string;
  fields?: ContractField<FormValue>[];
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  style?: CSSProperties;
};

type ContractTab<FormValue extends FieldValues> = {
  id: string;
  title: string;
  fields?: ContractField<FormValue>[];
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  style?: CSSProperties;
};

type ContractField<FormValue extends FieldValues> = {
  id: Path<FormValue>;
  component: string;
  title?: string;
} & UnknownObject;

type UseFormProps<FormValue extends FieldValues> = {
  contract: Contract<FormValue>;
  values?: FormValue;
  customComponents?: {
    id: string;
    render: (props: FormComponentProps<any, any> & UnknownObject) => JSX.Element;
  }[];
};

type FormProps<FormValue extends FieldValues> = UseFormReturn<FormValue, any, undefined> & {
  contract: Contract<FormValue>;
  components: {
    id: string;
    render: (props: FormComponentProps<any, any> & UnknownObject) => JSX.Element;
  }[];
};

export {
  type Contract,
  type ContractRow,
  type ContractColumn,
  type ContractTabs,
  type ContractTab,
  type ContractField,
  type UseFormProps,
  type FormProps,
};
