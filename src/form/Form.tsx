import { JSX, useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import debounce from 'debounce';
import { DeepPartial, FieldValues, FormProvider } from 'react-hook-form';

import { Tab as TabWrapper } from '@tarsilla/react-components/tab';

import { UseFormFormReturn } from '@types';

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

type FormProps<FormValue extends FieldValues> = {
  form: UseFormFormReturn<FormValue>;

  onChange?: (event: { values: DeepPartial<FormValue> }) => void;
};

//TODO validation
function Form<FormValue extends FieldValues>({ form, onChange }: FormProps<FormValue>): JSX.Element {
  const { contract, components, ...methods } = form;
  const { debounceWait, rows, columns, tab, theme } = contract;
  const { watch } = methods;
  const onChangeRef = useRef<((event: { values: DeepPartial<FormValue> }) => void) | null>(null);
  const debounceRef = useRef<(e: { values: DeepPartial<FormValue> }) => void>(
    debounce((event: { values: DeepPartial<FormValue> }) => {
      onChangeRef.current?.(event);
    }, debounceWait),
  );

  useEffect(() => {
    function getDebouncedOnChange(onChange?: (event: { values: DeepPartial<FormValue> }) => void) {
      onChangeRef.current = onChange ?? null;
      if (debounceWait && onChange) {
        return debounceRef.current;
      }
      return (event: { values: DeepPartial<FormValue> }) => onChangeRef.current?.(event);
    }
    // Subscribe to all fields without forcing a re-render
    const subscription = watch((values) => {
      const debounceOnChange = getDebouncedOnChange(onChange);
      // Use a debounce function or setTimeout here
      debounceOnChange({ values });
    });

    return () => subscription.unsubscribe();
  }, [watch, debounceWait, onChange]);

  return (
    <FormProvider {...methods}>
      <Container flexFlow={rows ? 'column' : 'row'} style={theme}>
        {rows?.map((row, index) => <Row contract={row} components={components} key={index} />)}
        {columns?.map((column, index) => <Column contract={column} components={components} key={index} />)}
        {tab && (
          <TabWrapper
            tabs={tab.tabs.map((tab, index) => ({
              header: () => <>{tab.title}</>,
              content: () => <Tab contract={tab} components={components} key={index} />,
            }))}
            theme={tab.theme}
          />
        )}
      </Container>
    </FormProvider>
  );
}

export { Form };
