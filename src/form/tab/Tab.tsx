import { FieldValues } from 'react-hook-form';

import styles from './Tab.module.css';
import { ContractTab, FormField } from '../../types';
import { Column } from '../column';
import { Field } from '../field';
import { Row } from '../row';

type Props<T> = {
  contract: ContractTab<T>;
  fields: FormField<unknown>[];
};

function Tab<T extends FieldValues>({
  contract,
  fields,
}: Props<T>): JSX.Element {
  return (
    <div
      className={styles.tab}
      style={{
        '--flex-flow': contract.rows ? 'column' : 'row',
      }}
    >
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

export { Tab };
