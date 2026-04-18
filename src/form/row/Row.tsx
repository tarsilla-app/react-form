import styled from '@emotion/styled';
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

import { FormComponent } from '@tarsilla/react-form-components';

import { ContractRow } from '@types';

import { Column } from '../column/Column.js';
import { Field } from '../field/Field.js';

const Container = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 4px;
  width: '100%';
  height: '100%';
`;

type Props<FormValue extends FieldValues> = {
  components: FormComponent<unknown, object>[];

  contract: ContractRow<FormValue>;
};

function Row<FormValue extends FieldValues>({ components, contract }: Props<FormValue>): JSX.Element {
  return (
    <Container style={contract.theme}>
      {contract.fields?.map((field) => (
        <Field components={components} contract={field} key={field.key} />
      ))}
      {contract.rows?.map((row) => (
        <Row components={components} contract={row} key={row.key} />
      ))}
      {contract.columns?.map((column) => (
        <Column components={components} contract={column} key={column.key} />
      ))}
    </Container>
  );
}

export { Row };
