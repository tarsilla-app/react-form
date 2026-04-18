import { PropsWithChildren, ReactElement } from 'react';
import { FormProvider, useForm as useHookForm } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { FormComponent, Input, Label, Select, TextArea } from '@tarsilla/react-form-components';

import { Field } from '../../../src/form/field/Field.js';

type TestValues = {
  fieldA: string;
  fieldB: string;
};

const formComponents = [Input, Label, Select, TextArea] as unknown as FormComponent<unknown, object>[];

function FormContextWrapper({ children }: PropsWithChildren): ReactElement {
  const methods = useHookForm<TestValues>({ defaultValues: { fieldA: '', fieldB: '' } });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

function renderWithContext(node: ReactElement): ReturnType<typeof render> {
  return render(node, { wrapper: FormContextWrapper });
}

describe('Field', () => {
  test('renders the matched component', () => {
    renderWithContext(<Field components={formComponents} contract={{ component: 'input', id: 'fieldA' }} />);
    expect(document.getElementById('fieldA')).toBeInTheDocument();
  });

  test('renders a title label with colon when title is provided', () => {
    renderWithContext(
      <Field components={formComponents} contract={{ component: 'input', id: 'fieldA', title: 'My Field' }} />,
    );
    expect(screen.getByText('My Field:')).toBeInTheDocument();
  });

  test('does not render a title when title is absent', () => {
    renderWithContext(<Field components={formComponents} contract={{ component: 'input', id: 'fieldA' }} />);
    expect(screen.queryByText(/:/)).toBeNull();
  });

  test('passes extra contract props to the rendered component', () => {
    renderWithContext(
      <Field
        components={formComponents}
        contract={{
          component: 'select',
          id: 'fieldB',
          options: [{ label: 'Opt', value: 'opt' }],
        }}
      />,
    );
    expect(document.getElementById('fieldB')).toBeInTheDocument();
  });

  test('throws when no matching component is found', () => {
    expect(() => {
      renderWithContext(<Field components={formComponents} contract={{ component: 'unknown', id: 'fieldA' }} />);
    }).toThrow("Component 'unknown' not found");
  });
});
