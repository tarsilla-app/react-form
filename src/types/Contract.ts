import { CSSProperties } from 'react';

import { TabProps } from '@tarsilla/react-components/tab';
import { FieldValues, Path } from 'react-hook-form';

import { UnknownObject } from './UnknownObject.js';

type Contract<FormValue extends FieldValues> = {
  tab?: ContractTab<FormValue>;
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  debounceWait?: number;
  theme?: CSSProperties;
};

type ContractTab<FormValue extends FieldValues> = {
  tabs: ContractTabs<FormValue>[];
  theme?: TabProps['theme'];
};

type ContractTabs<FormValue extends FieldValues> = {
  title: string;
  fields?: ContractField<FormValue>[];
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  theme?: CSSProperties;
};

type ContractRow<FormValue extends FieldValues> = {
  fields?: ContractField<FormValue>[];
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  theme?: CSSProperties;
};

type ContractColumn<FormValue extends FieldValues> = {
  fields?: ContractField<FormValue>[];
  rows?: ContractRow<FormValue>[];
  columns?: ContractColumn<FormValue>[];
  theme?: CSSProperties;
};

type ContractField<FormValue extends FieldValues> = {
  id: Path<FormValue>;
  title?: string;
  component: string;
  theme?: CSSProperties;
} & UnknownObject;

export {
  type Contract,
  type ContractRow,
  type ContractColumn,
  type ContractTabs,
  type ContractTab,
  type ContractField,
};
