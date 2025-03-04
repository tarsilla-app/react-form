import { CSSProperties } from 'react';

import { TabProps } from '@tarsilla/react-components/tab';
import { FieldValues, Path } from 'react-hook-form';

import { UnknownObject } from './UnknownObject.js';

type Contract<FormValue extends FieldValues> = {
  tab?: ContractTab<FormValue>;
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  debounceWait?: number;
  style?: CSSProperties | TabProps['style'];
};

type ContractTab<FormValue extends FieldValues> = {
  tabs: ContractTabs<FormValue>[];
  style?: TabProps['style'];
};

type ContractTabs<FormValue extends FieldValues> = {
  title: string;
  fields?: ContractField<FormValue>[];
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  style?: CSSProperties;
};

type ContractRow<FormValue extends FieldValues> = {
  fields?: ContractField<FormValue>[];
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  style?: CSSProperties;
};

type ContractColumn<FormValue extends FieldValues> = {
  fields?: ContractField<FormValue>[];
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  style?: CSSProperties;
};

type ContractField<FormValue extends FieldValues> = {
  id: Path<FormValue>;
  title?: string;
  component: string;
  style?: CSSProperties;
} & UnknownObject;

export {
  type Contract,
  type ContractRow,
  type ContractColumn,
  type ContractTabs,
  type ContractTab,
  type ContractField,
};
