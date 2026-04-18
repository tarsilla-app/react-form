import { PropsWithChildren, ReactElement } from 'react';
import { FormProvider, useForm as useHookForm } from 'react-hook-form';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { FormComponent, Input, Label, Select, TextArea } from '@tarsilla/react-form-components';

import { Tab } from '../../../src/form/tab/Tab.js';
import { ContractTabs } from '../../../src/types/index.js';

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

describe('Tab (tab panel content)', () => {
  test('renders fields inside the tab panel', () => {
    const contract: ContractTabs<TestValues> = {
      fields: [{ component: 'input', id: 'fieldA' }],
      title: 'Tab 1',
    };
    renderWithContext(<Tab components={formComponents} contract={contract} />);
    expect(document.getElementById('fieldA')).toBeInTheDocument();
  });

  test('renders rows inside the tab panel', () => {
    const contract: ContractTabs<TestValues> = {
      rows: [{ fields: [{ component: 'input', id: 'fieldA' }] }],
      title: 'Tab 1',
    };
    renderWithContext(<Tab components={formComponents} contract={contract} />);
    expect(document.getElementById('fieldA')).toBeInTheDocument();
  });

  test('renders columns inside the tab panel', () => {
    const contract: ContractTabs<TestValues> = {
      columns: [{ fields: [{ component: 'textarea', id: 'fieldB' }] }],
      title: 'Tab 1',
    };
    renderWithContext(<Tab components={formComponents} contract={contract} />);
    expect(document.getElementById('fieldB')).toBeInTheDocument();
  });

  test('uses column flex-flow when rows are present', () => {
    const contract: ContractTabs<TestValues> = {
      rows: [{ fields: [{ component: 'input', id: 'fieldA' }] }],
      title: 'Tab 1',
    };
    renderWithContext(<Tab components={formComponents} contract={contract} />);
    const styles = Array.from(document.head.querySelectorAll('style'))
      .map((s) => s.textContent || '')
      .join('');
    expect(styles).toContain('flex-flow:column');
  });

  test('uses row flex-flow when no rows are present', () => {
    const contract: ContractTabs<TestValues> = {
      columns: [{ fields: [{ component: 'input', id: 'fieldA' }] }],
      title: 'Tab 1',
    };
    renderWithContext(<Tab components={formComponents} contract={contract} />);
    const styles = Array.from(document.head.querySelectorAll('style'))
      .map((s) => s.textContent || '')
      .join('');
    expect(styles).toContain('flex-flow:row');
  });

  test('applies theme as inline style', () => {
    const contract: ContractTabs<TestValues> = {
      fields: [{ component: 'input', id: 'fieldA' }],
      theme: { padding: '8px' },
      title: 'Tab 1',
    };
    const { container } = renderWithContext(<Tab components={formComponents} contract={contract} />);
    const div = container.firstChild as HTMLElement;
    expect(div.style.padding).toBe('8px');
  });
});
