import { CSSProperties } from 'react';

import { FieldValues } from 'react-hook-form';

import { ContractTab, FormComponent, UnknownObject } from '@types';

import styles from './Tab.module.css';
import { Column } from '../column/index.js';
import { Field } from '../field/index.js';
import { Row } from '../row/index.js';

type Props<FormValue extends FieldValues> = {
  contract: ContractTab<FormValue>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: FormComponent<any, UnknownObject>[];
  style?: CSSProperties;
};

function Tab<FormValue extends FieldValues>({ contract, components, style }: Props<FormValue>): JSX.Element {
  return (
    <div
      className={styles.tab}
      style={{
        '--flex-flow': contract.rows ? 'column' : 'row',
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

export { Tab };
