import { CSSProperties } from 'react';
import { FieldValues, Path } from 'react-hook-form';

import { TabProps } from '@tarsilla/react-components/tab';

type Contract<FormValue extends FieldValues> = {
  columns?: ContractColumn<FormValue>[];
  debounceWait?: number;
  rows?: ContractRow<FormValue>[];
  tab?: ContractTab<FormValue>;
  theme?: CSSProperties;
};

type ContractColumn<FormValue extends FieldValues> = {
  columns?: ContractColumn<FormValue>[];
  fields?: ContractField<FormValue>[];
  key?: string;
  rows?: ContractRow<FormValue>[];
  theme?: CSSProperties;
};

type ContractField<FormValue extends FieldValues> = {
  component: string;
  id: Path<FormValue>;
  key?: string;
  theme?: CSSProperties;
  title?: string;
} & Record<string, unknown>;

type ContractRow<FormValue extends FieldValues> = {
  columns?: ContractColumn<FormValue>[];
  fields?: ContractField<FormValue>[];
  key?: string;
  rows?: ContractRow<FormValue>[];
  theme?: CSSProperties;
};

type ContractTab<FormValue extends FieldValues> = {
  tabs: ContractTabs<FormValue>[];
  theme?: TabProps['theme'];
};

type ContractTabs<FormValue extends FieldValues> = {
  columns?: ContractColumn<FormValue>[];
  fields?: ContractField<FormValue>[];
  key?: string;
  rows?: ContractRow<FormValue>[];
  theme?: CSSProperties;
  title: string;
};

export {
  type Contract,
  type ContractColumn,
  type ContractField,
  type ContractRow,
  type ContractTab,
  type ContractTabs,
};
