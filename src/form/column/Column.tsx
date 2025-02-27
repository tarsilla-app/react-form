import { CSSProperties } from 'react';

import styled from '@emotion/styled';
import { FormComponent } from '@tarsilla/react-form-components';
import { FieldValues } from 'react-hook-form';

import { ContractColumn, UnknownObject } from '@types';

import { Field } from '../field/index.js';
import { Row } from '../row/index.js';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  row-gap: 4px;
  width: '100%';
  height: '100%';
`;

type Props<FormValue extends FieldValues> = {
  contract: ContractColumn<FormValue>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: FormComponent<any, UnknownObject>[];
  style?: CSSProperties;
};

function Column<FormValue extends FieldValues>({ contract, components, style }: Props<FormValue>): JSX.Element {
  return (
    <Container style={style}>
      {contract.fields?.map((field) => <Field contract={field} components={components} key={field.id as string} />)}
      {contract.rows?.map((row) => <Row contract={row} components={components} style={row.style} key={row.id} />)}
      {contract.columns?.map((column) => (
        <Column contract={column} components={components} style={column.style} key={column.id} />
      ))}
    </Container>
  );
}

export { Column };
