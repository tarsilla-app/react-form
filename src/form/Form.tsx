import debounce from 'debounce';
import styled from '@emotion/styled';
import { JSX, useEffect } from 'react';
import { DeepPartial, FieldValues, FormProvider } from 'react-hook-form';

import { Tab as TabWrapper } from '@tarsilla/react-components/tab';

import { UseFormFormReturn } from '@types';

import { Column } from './column/Column.js';
import { Row } from './row/Row.js';
import { Tab } from './tab/Tab.js';

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

type FormProps<FormValue extends FieldValues> = {
  form: UseFormFormReturn<FormValue>;

  onChange?: (event: { values: DeepPartial<FormValue> }) => void;
};

//TODO validation
function Form<FormValue extends FieldValues>({ form, onChange }: FormProps<FormValue>): JSX.Element {
  const { components, contract, ...methods } = form;
  const { columns, debounceWait, rows, tab, theme } = contract;
  const { watch } = methods;

  useEffect(() => {
    if (!onChange) return;

    const emit = (values: DeepPartial<FormValue>) => {
      onChange({ values });
    };

    const debouncedEmit = debounceWait && debounceWait > 0 ? debounce(emit, debounceWait) : emit;

    const subscription = watch((values) => {
      debouncedEmit(values);
    });

    return () => {
      subscription.unsubscribe();
      // lodash debounce cleanup
      if (debounceWait && 'cancel' in debouncedEmit) {
        (debouncedEmit as { cancel: () => void }).cancel();
      }
    };
  }, [watch, debounceWait, onChange]);

  return (
    <FormProvider {...methods}>
      <Container flexFlow={rows ? 'column' : 'row'} style={theme}>
        {rows?.map((row) => (
          <Row components={components} contract={row} key={row.key} />
        ))}
        {columns?.map((column) => (
          <Column components={components} contract={column} key={column.key} />
        ))}
        {tab && (
          <TabWrapper
            tabs={tab.tabs.map((tab) => ({
              content: () => <Tab components={components} contract={tab} key={tab.key} />,
              header: () => <>{tab.title}</>,
            }))}
            theme={tab.theme}
          />
        )}
      </Container>
    </FormProvider>
  );
}

export { Form };
