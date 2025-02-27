import { CSSProperties } from 'react';

import { FieldValues } from 'react-hook-form';

import { ContractRow, FormComponent, UnknownObject } from '@types';

import styles from './Row.module.css';
import { Column } from '../column/index.js';
import { Field } from '../field/index.js';

type Props<FormValue extends FieldValues> = {
  contract: ContractRow<FormValue>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: FormComponent<any, UnknownObject>[];
  style?: CSSProperties;
};

function Row<FormValue extends FieldValues>({ contract, components, style }: Props<FormValue>): JSX.Element {
  return (
    <div
      className={styles.row}
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      {contract.fields?.map((field) => <Field contract={field} components={components} key={field.id as string} />)}
      {contract.rows?.map((row) => <Row contract={row} components={components} style={row.style} key={row.id} />)}
      {contract.columns?.map((column) => (
        <Column contract={column} components={components} style={column.style} key={column.id} />
      ))}
    </div>
  );
}

export { Row };
