import { JSX } from 'react';

import styled from '@emotion/styled';
import { FieldValues } from 'react-hook-form';

import { FormComponent } from '@tarsilla/react-form-components';

import { ContractRow } from '@types';

import { Column } from '../column/index.js';
import { Field } from '../field/index.js';

const Container = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 4px;
  width: '100%';
  height: '100%';
`;

type Props<FormValue extends FieldValues> = {
  contract: ContractRow<FormValue>;

  components: FormComponent<unknown, object>[];
};

function Row<FormValue extends FieldValues>({ contract, components }: Props<FormValue>): JSX.Element {
  return (
    <Container style={contract.theme}>
      {contract.fields?.map((field, index) => <Field contract={field} components={components} key={index} />)}
      {contract.rows?.map((row, index) => <Row contract={row} components={components} key={index} />)}
      {contract.columns?.map((column, index) => <Column contract={column} components={components} key={index} />)}
    </Container>
  );
}

export { Row };
