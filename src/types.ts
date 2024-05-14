import { CSSProperties } from 'react';

import { FieldValues, UseFormReturn } from 'react-hook-form';

type Contract<T> = {
  rows?: ContractRow<T>[];
  columns?: ContractColumn<T>[];
  tabs?: ContractTab<T>[];
  style?: CSSProperties;
};

type ContractRow<T> = {
  id: string;
  fields?: ContractField<T>[];
  rows?: ContractRow<T>[];
  columns?: ContractColumn<T>[];
  style?: CSSProperties;
};

type ContractColumn<T> = {
  id: string;
  fields?: ContractField<T>[];
  rows?: ContractRow<T>[];
  columns?: ContractColumn<T>[];
  style?: CSSProperties;
};

type ContractTab<T> = {
  id: string;
  title: string;
  fields?: ContractField<T>[];
  rows?: ContractRow<T>[];
  columns?: ContractColumn<T>[];
  style?: CSSProperties;
};

type ContractField<T> = {
  id: keyof T;
  component: string;
  title?: string;
  [k: string]: unknown;
};

type FormComponent<V, P extends object | undefined = undefined> = {
  id: string;
  render: (
    props: {
      id: string | number | symbol;
      value?: V;
      onChange: (value?: V) => void;
    } & P,
  ) => JSX.Element;
};

type UseFormProps<T> = {
  contract: Contract<T>;
  values?: T;
  customComponents?: FormComponent<unknown, object>[];
};

type FormProps<T extends FieldValues> = UseFormReturn<T, unknown, undefined> & {
  contract: Contract<T>;
  components: FormComponent<unknown, object>[];
};

export {
  type Contract,
  type ContractRow,
  type ContractColumn,
  type ContractTab,
  type ContractField,
  type FormComponent,
  type UseFormProps,
  type FormProps,
};
