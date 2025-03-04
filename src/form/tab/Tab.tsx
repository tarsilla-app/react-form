import { CSSProperties } from 'react';

import styled from '@emotion/styled';
import { FormComponent } from '@tarsilla/react-form-components';
import { FieldValues } from 'react-hook-form';

import { ContractTabs } from '@types';

import { Column } from '../column/index.js';
import { Field } from '../field/index.js';
import { Row } from '../row/index.js';

type ContainerProps = {
  flexFlow: string;
};

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-flow: ${({ flexFlow }) => flexFlow};
  row-gap: 4px;
  column-gap: 4px;
  width: '100%';
  height: '100%';
`;

type Props<FormValue extends FieldValues> = {
  contract: ContractTabs<FormValue>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: FormComponent<any, any>[];
  style?: CSSProperties;
};

function Tab<FormValue extends FieldValues>({ contract, components, style }: Props<FormValue>): JSX.Element {
  return (
    <Container flexFlow={contract.rows ? 'column' : 'row'} style={style}>
      {contract.fields?.map((field, index) => <Field contract={field} components={components} key={index} />)}
      {contract.rows?.map((row, index) => <Row contract={row} components={components} style={row.style} key={index} />)}
      {contract.columns?.map((column, index) => (
        <Column contract={column} components={components} style={column.style} key={index} />
      ))}
    </Container>
  );
}

export { Tab };
