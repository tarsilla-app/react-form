import { CSSProperties } from 'react';

import { TabProps } from '@tarsilla/react-components/tab';
import { FieldValues, Path } from 'react-hook-form';

import { UnknownObject } from './UnknownObject.js';

type Contract<FormValue extends FieldValues> = {
  tab?: ContractTab<FormValue>;
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  style?: CSSProperties | TabProps['style'];
};

type ContractTab<FormValue extends FieldValues> = {
  tabs: ContractTabs<FormValue>[];
  style?: TabProps['style'];
};

type ContractTabs<FormValue extends FieldValues> = {
  id: string;
  title: string;
  fields?: ContractField<FormValue>[];
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  style?: CSSProperties;
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

type ContractField<FormValue extends FieldValues> = {
  id: Path<FormValue>;
  component: string;
  title?: string;
} & UnknownObject;

export {
  type Contract,
  type ContractRow,
  type ContractColumn,
  type ContractTabs,
  type ContractTab,
  type ContractField,
};
