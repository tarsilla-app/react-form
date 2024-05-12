import { FieldValues } from 'react-hook-form';

import styles from './Column.module.css';
import { ContractColumn, FormField } from '../../types';
import { Field } from '../field';
import { Row } from '../row';

type Props<T> = {
  contract: ContractColumn<T>;
  fields: FormField<unknown>[];
};

function Column<T extends FieldValues>({
  contract,
  fields,
}: Props<T>): JSX.Element {
  return (
    <div className={styles.column}>
      {contract.fields?.map((field) => (
        <Field contract={field} key={field.id as string} fields={fields} />
      ))}
      {contract.rows?.map((row) => (
        <Row contract={row} fields={fields} key={row.id} />
      ))}
      {contract.columns?.map((column) => (
        <Column contract={column} fields={fields} key={column.id} />
      ))}
    </div>
  );
}

export { Column };
