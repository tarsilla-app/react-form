import { FieldValues, UseFormReturn } from 'react-hook-form';

type Contract<T> = {
  rows?: ContractRow<T>[];
  columns?: ContractColumn<T>[];
  tabs?: ContractTab<T>[];
};

type ContractRow<T> = {
  id: string;
  fields?: ContractField<T>[];
  rows?: ContractRow<T>[];
  columns?: ContractColumn<T>[];
};

type ContractColumn<T> = {
  id: string;
  fields?: ContractField<T>[];
  rows?: ContractRow<T>[];
  columns?: ContractColumn<T>[];
};

type ContractTab<T> = {
  id: string;
  title: string;
  fields?: ContractField<T>[];
  rows?: ContractRow<T>[];
  columns?: ContractColumn<T>[];
};

type ContractField<T> = {
  id: keyof T;
  type: string;
  title?: string;
  props?: object;
};

type FormField<V> = {
  id: string;
  render: (props: {
    value?: V;
    onChange: (value?: V) => void;
    props?: object;
  }) => JSX.Element;
};

type UseFormProps<T> = {
  contract: Contract<T>;
  values?: T;
  customFields?: FormField<unknown>[];
};

type FormProps<T extends FieldValues> = UseFormReturn<T, unknown, undefined> & {
  contract: Contract<T>;
  fields: FormField<unknown>[];
};

export {
  Contract,
  ContractRow,
  ContractColumn,
  ContractTab,
  ContractField,
  FormField,
  UseFormProps,
  FormProps,
};
