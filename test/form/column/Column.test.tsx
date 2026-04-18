import { PropsWithChildren, ReactElement } from 'react';
import { FormProvider, useForm as useHookForm } from 'react-hook-form';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { FormComponent, Input, Label, Select, TextArea } from '@tarsilla/react-form-components';

import { Column } from '../../../src/form/column/Column.js';
import { ContractColumn } from '../../../src/types/index.js';

type TestValues = {
  fieldA: string;
  fieldB: string;
  fieldC: string;
  fieldD: string;
};

const formComponents = [Input, Label, Select, TextArea] as unknown as FormComponent<unknown, object>[];

function FormContextWrapper({ children }: PropsWithChildren): ReactElement {
  const methods = useHookForm<TestValues>({ defaultValues: { fieldA: '', fieldB: '', fieldC: '', fieldD: '' } });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

function renderWithContext(node: ReactElement): ReturnType<typeof render> {
  return render(node, { wrapper: FormContextWrapper });
}

describe('Column', () => {
  test('renders fields directly inside the column', () => {
    const contract: ContractColumn<TestValues> = {
      fields: [
        { component: 'input', id: 'fieldA' },
        { component: 'textarea', id: 'fieldB' },
      ],
    };
    renderWithContext(<Column components={formComponents} contract={contract} />);
    expect(document.getElementById('fieldA')).toBeInTheDocument();
    expect(document.getElementById('fieldB')).toBeInTheDocument();
  });

  test('renders rows nested inside the column', () => {
    const contract: ContractColumn<TestValues> = {
      rows: [{ fields: [{ component: 'input', id: 'fieldA' }] }],
    };
    renderWithContext(<Column components={formComponents} contract={contract} />);
    expect(document.getElementById('fieldA')).toBeInTheDocument();
  });

  test('renders nested columns recursively', () => {
    const contract: ContractColumn<TestValues> = {
      columns: [
        {
          columns: [{ fields: [{ component: 'input', id: 'fieldC' }] }],
          fields: [{ component: 'input', id: 'fieldA' }],
        },
      ],
    };
    renderWithContext(<Column components={formComponents} contract={contract} />);
    expect(document.getElementById('fieldA')).toBeInTheDocument();
    expect(document.getElementById('fieldC')).toBeInTheDocument();
  });

  test('applies theme as inline style', () => {
    const contract: ContractColumn<TestValues> = {
      fields: [{ component: 'input', id: 'fieldA' }],
      theme: { backgroundColor: 'red' },
    };
    const { container } = renderWithContext(<Column components={formComponents} contract={contract} />);
    const div = container.firstChild as HTMLElement;
    expect(div.style.backgroundColor).toBe('red');
  });

  test('renders nothing when contract has no fields, rows, or columns', () => {
    const contract: ContractColumn<TestValues> = {};
    const { container } = renderWithContext(<Column components={formComponents} contract={contract} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(document.getElementById('fieldA')).toBeNull();
  });
});
