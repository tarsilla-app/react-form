import { FieldValues } from 'react-hook-form';

import { ContractColumn, ContractField, ContractRow, ContractTabs, UseFormProps } from '@types';

function buildFieldsValues<FormValue extends FieldValues>({
  fields,
  values,
}: {
  fields?: ContractField<FormValue>[];
  values?: FormValue;
}): { id: keyof FormValue; value?: unknown }[] {
  return (
    fields?.flatMap((field) => ({
      id: field.id,
      value: values?.[field.id] ?? '',
    })) ?? []
  );
}

function buildColumnsValues<FormValue extends FieldValues>({
  columns,
  values,
}: {
  columns?: ContractColumn<FormValue>[];
  values?: FormValue;
}): { id: keyof FormValue; value?: unknown }[] {
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

function buildRowsValues<FormValue extends FieldValues>({
  rows,
  values,
}: {
  rows?: ContractRow<FormValue>[];
  values?: FormValue;
}): { id: keyof FormValue; value?: unknown }[] {
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

function buildTabsValues<FormValue extends FieldValues>({
  tabs,
  values,
}: {
  tabs?: ContractTabs<FormValue>[];
  values?: FormValue;
}): { id: keyof FormValue; value?: unknown }[] {
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

function buildValues<FormValue extends FieldValues>({ contract, values }: UseFormProps<FormValue>): FormValue {
  const allValues = [
    ...buildTabsValues({ tabs: contract.tab?.tabs, values }),
    ...buildRowsValues({ rows: contract.rows, values }),
    ...buildColumnsValues({ columns: contract.columns, values }),
  ];
  return allValues.reduce((returnValue, value) => {
    returnValue[value.id] = value.value as FormValue[typeof value.id];
    return returnValue;
  }, {} as FormValue);
}

export { buildValues };
