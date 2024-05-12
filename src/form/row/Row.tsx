import { FieldValues } from 'react-hook-form';

import styles from './Row.module.css';
import { ContractRow, FormField } from '../../types';
import { Column } from '../column';
import { Field } from '../field';

type Props<T> = {
  contract: ContractRow<T>;
  fields: FormField<unknown>[];
};

function Row<T extends FieldValues>({
  contract,
  fields,
}: Props<T>): JSX.Element {
  console.log('row contract', contract);
  return (
    <div className={styles.row}>
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

export { Row };
