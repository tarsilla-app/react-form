import {
  ContractColumn,
  ContractField,
  ContractRow,
  ContractTab,
  UseFormProps,
} from '../../types';

function buildFieldsValues<T>({
  fields,
  values,
}: {
  fields?: ContractField<T>[];
  values?: T;
}): { id: keyof T; value?: unknown }[] {
  return (
    fields?.flatMap((field) => ({
      id: field.id,
      value: values?.[field.id] ?? '',
    })) ?? []
  );
}

function buildColumnsValues<T>({
  columns,
  values,
}: {
  columns?: ContractColumn<T>[];
  values?: T;
}): { id: keyof T; value?: unknown }[] {
  return (
    columns?.flatMap((column) => {
      return [
        ...buildFieldsValues({ fields: column.fields, values }),
        ...buildRowsValues({ rows: column.rows, values }),
        ...buildColumnsValues({ columns: column.columns, values }),
      ];
    }) ?? []
  );
}

function buildRowsValues<T>({
  rows,
  values,
}: {
  rows?: ContractRow<T>[];
  values?: T;
}): { id: keyof T; value?: unknown }[] {
  return (
    rows?.flatMap((row) => {
      return [
        ...buildFieldsValues({ fields: row.fields, values }),
        ...buildRowsValues({ rows: row.rows, values }),
        ...buildColumnsValues({ columns: row.columns, values }),
      ];
    }) ?? []
  );
}

function buildTabsValues<T>({
  tabs,
  values,
}: {
  tabs?: ContractTab<T>[];
  values?: T;
}): { id: keyof T; value?: unknown }[] {
  return (
    tabs?.flatMap((tab) => {
      return [
        ...buildFieldsValues({ fields: tab.fields, values }),
        ...buildRowsValues({ rows: tab.rows, values }),
        ...buildColumnsValues({ columns: tab.columns, values }),
      ];
    }) ?? []
  );
}

function buildValues<T>({ contract, values }: UseFormProps<T>): T {
  const allValues = [
    ...buildTabsValues({ tabs: contract.tabs, values }),
    ...buildRowsValues({ rows: contract.rows, values }),
    ...buildColumnsValues({ columns: contract.columns, values }),
  ];
  return allValues.reduce((returnValue, value) => {
    returnValue[value.id] = value.value as T[typeof value.id];
    return returnValue;
  }, {} as T);
}

export { buildValues };
