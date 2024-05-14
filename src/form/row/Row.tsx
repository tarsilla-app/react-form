import { CSSProperties } from 'react';

import { FieldValues } from 'react-hook-form';

import styles from './Row.module.css';
import { ContractRow, FormComponent } from '../../types';
import { Column } from '../column';
import { Field } from '../field';

type Props<T> = {
  contract: ContractRow<T>;
  components: FormComponent<unknown, object>[];
  style?: CSSProperties;
};

function Row<T extends FieldValues>({
  contract,
  components,
  style,
}: Props<T>): JSX.Element {
  return (
    <div
      className={styles.row}
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      {contract.fields?.map((field) => (
        <Field
          contract={field}
          components={components}
          key={field.id as string}
        />
      ))}
      {contract.rows?.map((row) => (
        <Row
          contract={row}
          components={components}
          style={row.style}
          key={row.id}
        />
      ))}
      {contract.columns?.map((column) => (
        <Column
          contract={column}
          components={components}
          style={column.style}
          key={column.id}
        />
      ))}
    </div>
  );
}

export { Row };
