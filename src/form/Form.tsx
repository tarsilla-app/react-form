import styled from '@emotion/styled';
import { Tab as TabWrapper } from '@tarsilla/react-components/tab';
import { FieldValues, FormProvider } from 'react-hook-form';

import { FormProps } from '@types';

import { Column } from './column/index.js';
import { Row } from './row/index.js';
import { Tab } from './tab/index.js';

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

function Form<FormValue extends FieldValues>({ form }: { form: FormProps<FormValue> }): JSX.Element {
  const { contract, components, ...methods } = form;

  return (
    <FormProvider {...methods}>
      <Container flexFlow={contract.rows ? 'column' : 'row'} style={contract.style}>
        {contract.rows?.map((row, index) => (
          <Row contract={row} components={components} style={row.style} key={index} />
        ))}
        {contract.columns?.map((column, index) => (
          <Column contract={column} components={components} style={column.style} key={index} />
        ))}
        {contract.tab && (
          <TabWrapper
            tabs={contract.tab.tabs.map((tab, index) => ({
              header: () => <>{tab.title}</>,
              content: () => <Tab contract={tab} components={components} style={tab.style} key={index} />,
            }))}
            style={contract.tab.style}
          />
        )}
      </Container>
    </FormProvider>
  );
}

export { Form };
