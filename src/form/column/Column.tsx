import { CSSProperties } from 'react';

import styled from '@emotion/styled';
import { FormComponent } from '@tarsilla/react-form-components';
import { FieldValues } from 'react-hook-form';

import { ContractColumn } from '@types';

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
  components: FormComponent<any, any>[];
  style?: CSSProperties;
};

function Column<FormValue extends FieldValues>({ contract, components, style }: Props<FormValue>): JSX.Element {
  return (
    <Container style={style}>
      {contract.fields?.map((field, index) => <Field contract={field} components={components} key={index} />)}
      {contract.rows?.map((row, index) => <Row contract={row} components={components} style={row.style} key={index} />)}
      {contract.columns?.map((column, index) => (
        <Column contract={column} components={components} style={column.style} key={index} />
      ))}
    </Container>
  );
}

export { Column };
