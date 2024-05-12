import {
  Contract,
  ContractColumn,
  ContractField,
  ContractRow,
  ContractTab,
} from '../../types';

function validateFields<T>({
  fields,
  allowedFieldTypes,
}: {
  fields?: ContractField<T>[];
  allowedFieldTypes: string[];
}): string[] {
  return (
    fields?.reduce<string[]>((ids, field) => {
      //TODO ID não pode ter caracter especial nem espaço
      if (!field.id) {
        throw new Error('Field id is required');
      } else if (!field.type) {
        throw new Error('Field type is required');
      } else if (!allowedFieldTypes.includes(field.type)) {
        throw new Error(`Field with type ${field.type} is not allowed`);
      }
      return [...ids, field.id as string];
    }, []) ?? []
  );
}

function validateRows<T>({
  rows,
  allowedFieldTypes,
}: {
  rows?: ContractRow<T>[];
  allowedFieldTypes: string[];
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
        allowedFieldTypes,
      });
      const rowsIds = validateRows({
        rows: row.rows,
        allowedFieldTypes,
      });
      const columnsIds = validateColumns({
        columns: row.columns,
        allowedFieldTypes,
      });

      return [...ids, row.id, ...fieldsIds, ...rowsIds, ...columnsIds];
    }, []) ?? []
  );
}

function validateColumns<T>({
  columns,
  allowedFieldTypes,
}: {
  columns?: ContractColumn<T>[];
  allowedFieldTypes: string[];
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
        allowedFieldTypes,
      });
      const rowsIds = validateRows({
        rows: column.rows,
        allowedFieldTypes,
      });
      const columnsIds = validateColumns({
        columns: column.columns,
        allowedFieldTypes,
      });

      return [...ids, column.id, ...fieldsIds, ...rowsIds, ...columnsIds];
    }, []) ?? []
  );
}

function validateTabs<T>({
  tabs,
  allowedFieldTypes,
}: {
  tabs?: ContractTab<T>[];
  allowedFieldTypes: string[];
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
        allowedFieldTypes,
      });
      const rowsIds = validateRows({
        rows: tab.rows,
        allowedFieldTypes,
      });
      const columnsIds = validateColumns({
        columns: tab.columns,
        allowedFieldTypes,
      });

      return [...ids, tab.id, ...fieldsIds, ...rowsIds, ...columnsIds];
    }, []) ?? []
  );
}

function validateContract<T>({
  contract,
  allowedFieldTypes,
}: {
  contract: Contract<T>;
  allowedFieldTypes: string[];
}): void {
  const v = [contract.rows, contract.columns, contract.tabs].filter(Boolean);
  if (v.length > 1) {
    throw new Error('Contract can only have rows or columns or tabs');
  }
  const rowsIds = validateRows({ rows: contract.rows, allowedFieldTypes });
  const columnsIds = validateColumns({
    columns: contract.columns,
    allowedFieldTypes,
  });
  const tabsIds = validateTabs({ tabs: contract.tabs, allowedFieldTypes });

  const ids = [...rowsIds, ...columnsIds, ...tabsIds];

  ids.forEach((id) => {
    const equals = ids.filter((eq) => eq === id);
    if (!equals || equals.length > 1) {
      throw new Error(`${id} is duplicated`);
    }
  });
}

export { validateContract };
