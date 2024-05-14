import { CSSProperties } from 'react';

import { FieldValues } from 'react-hook-form';

import styles from './Column.module.css';
import { ContractColumn, FormComponent } from '../../types';
import { Field } from '../field';
import { Row } from '../row';

type Props<T> = {
  contract: ContractColumn<T>;
  components: FormComponent<unknown, object>[];
  style?: CSSProperties;
};

function Column<T extends FieldValues>({
  contract,
  components,
  style,
}: Props<T>): JSX.Element {
  return (
    <div
      className={styles.column}
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

export { Column };
