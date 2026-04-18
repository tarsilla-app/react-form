import { PropsWithChildren, ReactElement } from 'react';
import { FormProvider, useForm as useHookForm } from 'react-hook-form';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { FormComponent, Input, Label, Select, TextArea } from '@tarsilla/react-form-components';

import { Row } from '../../../src/form/row/Row.js';
import { ContractRow } from '../../../src/types/index.js';

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

describe('Row', () => {
  test('renders fields directly inside the row', () => {
    const contract: ContractRow<TestValues> = {
      fields: [
        { component: 'input', id: 'fieldA' },
        { component: 'textarea', id: 'fieldB' },
      ],
    };
    renderWithContext(<Row components={formComponents} contract={contract} />);
    expect(document.getElementById('fieldA')).toBeInTheDocument();
    expect(document.getElementById('fieldB')).toBeInTheDocument();
  });

  test('renders columns nested inside the row', () => {
    const contract: ContractRow<TestValues> = {
      columns: [{ fields: [{ component: 'input', id: 'fieldA' }] }],
    };
    renderWithContext(<Row components={formComponents} contract={contract} />);
    expect(document.getElementById('fieldA')).toBeInTheDocument();
  });

  test('renders nested rows recursively', () => {
    const contract: ContractRow<TestValues> = {
      rows: [
        {
          fields: [{ component: 'input', id: 'fieldA' }],
          rows: [{ fields: [{ component: 'textarea', id: 'fieldC' }] }],
        },
      ],
    };
    renderWithContext(<Row components={formComponents} contract={contract} />);
    expect(document.getElementById('fieldA')).toBeInTheDocument();
    expect(document.getElementById('fieldC')).toBeInTheDocument();
  });

  test('applies theme as inline style', () => {
    const contract: ContractRow<TestValues> = {
      fields: [{ component: 'input', id: 'fieldA' }],
      theme: { color: 'blue' },
    };
    const { container } = renderWithContext(<Row components={formComponents} contract={contract} />);
    const div = container.firstChild as HTMLElement;
    expect(div.style.color).toBe('blue');
  });

  test('renders nothing when contract has no fields, rows, or columns', () => {
    const contract: ContractRow<TestValues> = {};
    const { container } = renderWithContext(<Row components={formComponents} contract={contract} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(document.getElementById('fieldA')).toBeNull();
  });
});
