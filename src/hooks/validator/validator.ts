import { FieldValues } from 'react-hook-form';

import { Contract, ContractColumn, ContractField, ContractRow, ContractTab } from '@types';

function validateFields<FormValue extends FieldValues>({
  fields,
  allowedComponents,
}: {
  fields?: ContractField<FormValue>[];
  allowedComponents: string[];
}): string[] {
  return (
    fields?.reduce<string[]>((ids, field) => {
      //TODO ID não pode ter caracter especial nem espaço
      if (!field.id) {
        throw new Error('Field id is required');
      } else if (!field.component) {
        throw new Error('Field component is required');
      } else if (!allowedComponents.includes(field.component)) {
        throw new Error(`Component '${field.component}' is not allowed`);
      }
      return [...ids, field.id as string];
    }, []) ?? []
  );
}

function validateRows<FormValue extends FieldValues>({
  rows,
  allowedComponents,
}: {
  rows?: ContractRow<FormValue>[];
  allowedComponents: string[];
}): string[] {
  return (
    rows?.reduce<string[]>((ids, row) => {
      if (!row.id) {
        throw new Error('Row id is required');
      }
      const rv = [row.fields, row.rows, row.columns].filter(Boolean);
      if (rv.length > 1) {
        throw new Error('Rows can only have fields or rows or columns');
      }
      const fieldsIds = validateFields({
        fields: row.fields,
        allowedComponents,
      });
      const rowsIds = validateRows({
        rows: row.rows,
        allowedComponents,
      });
      const columnsIds = validateColumns({
        columns: row.columns,
        allowedComponents,
      });

      return [...ids, row.id, ...fieldsIds, ...rowsIds, ...columnsIds];
    }, []) ?? []
  );
}

function validateColumns<FormValue extends FieldValues>({
  columns,
  allowedComponents,
}: {
  columns?: ContractColumn<FormValue>[];
  allowedComponents: string[];
}): string[] {
  return (
    columns?.reduce<string[]>((ids, column) => {
      if (!column.id) {
        throw new Error('Column id is required');
      }
      const rv = [column.fields, column.rows, column.columns].filter(Boolean);
      if (rv.length > 1) {
        throw new Error('Columns can only have fields or rows or columns');
      }
      const fieldsIds = validateFields({
        fields: column.fields,
        allowedComponents,
      });
      const rowsIds = validateRows({
        rows: column.rows,
        allowedComponents,
      });
      const columnsIds = validateColumns({
        columns: column.columns,
        allowedComponents,
      });

      return [...ids, column.id, ...fieldsIds, ...rowsIds, ...columnsIds];
    }, []) ?? []
  );
}

function validateTabs<FormValue extends FieldValues>({
  tabs,
  allowedComponents,
}: {
  tabs?: ContractTab<FormValue>[];
  allowedComponents: string[];
}): string[] {
  return (
    tabs?.reduce<string[]>((ids, tab) => {
      if (!tab.id) {
        throw new Error('Tab id is required');
      }
      const rv = [tab.fields, tab.rows, tab.columns].filter(Boolean);
      if (rv.length > 1) {
        throw new Error('Tabs can only have fields or rows or columns');
      }
      const fieldsIds = validateFields({
        fields: tab.fields,
        allowedComponents,
      });
      const rowsIds = validateRows({
        rows: tab.rows,
        allowedComponents,
      });
      const columnsIds = validateColumns({
        columns: tab.columns,
        allowedComponents,
      });

      return [...ids, tab.id, ...fieldsIds, ...rowsIds, ...columnsIds];
    }, []) ?? []
  );
}

function validateContract<FormValue extends FieldValues>({
  contract,
  allowedComponents,
}: {
  contract: Contract<FormValue>;
  allowedComponents: string[];
}): void {
  const v = [contract.rows, contract.columns, contract.tabs].filter(Boolean);
  if (v.length > 1) {
    throw new Error('Contract can only have rows or columns or tabs');
  }
  const rowsIds = validateRows({ rows: contract.rows, allowedComponents });
  const columnsIds = validateColumns({
    columns: contract.columns,
    allowedComponents,
  });
  const tabsIds = validateTabs({ tabs: contract.tabs, allowedComponents });

  const ids = [...rowsIds, ...columnsIds, ...tabsIds];

  ids.forEach((id) => {
    const equals = ids.filter((eq) => eq === id);
    if (!equals || equals.length > 1) {
      throw new Error(`id '${id}' is duplicated`);
    }
  });
}

export { validateContract };
