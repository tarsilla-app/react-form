import { FieldValues } from 'react-hook-form';

import { Contract, ContractColumn, ContractField, ContractRow, ContractTabs } from '@types';

function validateColumns<FormValue extends FieldValues>({
  allowedComponents,
  columns,
}: {
  allowedComponents: string[];
  columns?: ContractColumn<FormValue>[];
}): string[] {
  return (
    columns?.reduce<string[]>((ids, column) => {
      const rv = [column.fields, column.rows, column.columns].filter(Boolean);
      if (rv.length > 1) {
        throw new Error('Columns can only have fields or rows or columns');
      }
      const fieldsIds = validateFields({
        allowedComponents,
        fields: column.fields,
      });
      const rowsIds = validateRows({
        allowedComponents,
        rows: column.rows,
      });
      const columnsIds = validateColumns({
        allowedComponents,
        columns: column.columns,
      });

      return [...ids, ...fieldsIds, ...rowsIds, ...columnsIds];
    }, []) ?? []
  );
}

function validateContract<FormValue extends FieldValues>({
  allowedComponents,
  contract,
}: {
  allowedComponents: string[];
  contract: Contract<FormValue>;
}): void {
  const v = [contract.rows, contract.columns, contract.tab].filter(Boolean);
  if (v.length > 1) {
    throw new Error('Contract can only have rows or columns or tabs');
  }
  const rowsIds = validateRows({ allowedComponents, rows: contract.rows });
  const columnsIds = validateColumns({
    allowedComponents,
    columns: contract.columns,
  });
  const tabsIds = validateTabs({ allowedComponents, tabs: contract.tab?.tabs });

  const ids = [...rowsIds, ...columnsIds, ...tabsIds];

  ids.forEach((id) => {
    const equals = ids.filter((eq) => eq === id);
    if (equals.length > 1) {
      throw new Error(`id '${id}' is duplicated`);
    }
  });
}

function validateFields<FormValue extends FieldValues>({
  allowedComponents,
  fields,
}: {
  allowedComponents: string[];
  fields?: ContractField<FormValue>[];
}): string[] {
  return (
    fields?.reduce<string[]>((ids, field) => {
      if (!field.id) {
        throw new Error('Field id is required');
      } else if (!/^[A-Za-z0-9_]+$/.test(field.id)) {
        throw new Error('Field id must not contain special characters or spaces');
      } else if (!field.component) {
        throw new Error('Field component is required');
      } else if (!allowedComponents.includes(field.component)) {
        throw new Error(`Component '${field.component}' is not allowed`);
      } else if (field.debounceWait) {
        throw new Error('Field dont have debounceWait');
      }
      return [...ids, field.id as string];
    }, []) ?? []
  );
}

function validateRows<FormValue extends FieldValues>({
  allowedComponents,
  rows,
}: {
  allowedComponents: string[];
  rows?: ContractRow<FormValue>[];
}): string[] {
  return (
    rows?.reduce<string[]>((ids, row) => {
      const rv = [row.fields, row.rows, row.columns].filter(Boolean);
      if (rv.length > 1) {
        throw new Error('Rows can only have fields or rows or columns');
      }
      const fieldsIds = validateFields({
        allowedComponents,
        fields: row.fields,
      });
      const rowsIds = validateRows({
        allowedComponents,
        rows: row.rows,
      });
      const columnsIds = validateColumns({
        allowedComponents,
        columns: row.columns,
      });

      return [...ids, ...fieldsIds, ...rowsIds, ...columnsIds];
    }, []) ?? []
  );
}

function validateTabs<FormValue extends FieldValues>({
  allowedComponents,
  tabs,
}: {
  allowedComponents: string[];
  tabs?: ContractTabs<FormValue>[];
}): string[] {
  return (
    tabs?.reduce<string[]>((ids, tab) => {
      const rv = [tab.fields, tab.rows, tab.columns].filter(Boolean);
      if (rv.length > 1) {
        throw new Error('Tabs can only have fields or rows or columns');
      }
      const fieldsIds = validateFields({
        allowedComponents,
        fields: tab.fields,
      });
      const rowsIds = validateRows({
        allowedComponents,
        rows: tab.rows,
      });
      const columnsIds = validateColumns({
        allowedComponents,
        columns: tab.columns,
      });

      return [...ids, ...fieldsIds, ...rowsIds, ...columnsIds];
    }, []) ?? []
  );
}

export { validateContract };
