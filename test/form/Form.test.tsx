import { PropsWithChildren, ReactElement } from 'react';
import { FormProvider, useForm as useHookForm } from 'react-hook-form';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { FormComponent, Input, Label, Select, TextArea } from '@tarsilla/react-form-components';

import { Column } from '../../src/form/column/Column.js';
import { Field } from '../../src/form/field/Field.js';
import { Form } from '../../src/form/Form.js';
import { Row } from '../../src/form/row/Row.js';
import { Tab } from '../../src/form/tab/Tab.js';
import { useForm } from '../../src/hooks/useForm.js';
import { ContractColumn, ContractRow, ContractTabs } from '../../src/types/index.js';

type ChangePayload = {
  values: Partial<TestValues>;
};

type TestValues = {
  fieldA: string;
  fieldB: string;
  fieldC: string;
  fieldD: string;
  fieldE: string;
};

const formComponents = [Input, Label, Select, TextArea] as unknown as FormComponent<unknown, object>[];

const { debounceFactory } = vi.hoisted(() => {
  return {
    debounceFactory: vi.fn((callback: (value: unknown) => void, wait = 0) => {
      let timer: number | undefined;

      const wrapped = (value: unknown) => {
        if (wait > 0) {
          if (timer !== undefined) {
            window.clearTimeout(timer);
          }
          const delay = typeof wait === 'number' ? wait : 0;
          timer = window.setTimeout(() => {
            callback(value);
          }, delay);
          return;
        }

        callback(value);
      };

      const cancel = vi.fn(() => {
        if (timer !== undefined) {
          window.clearTimeout(timer);
          timer = undefined;
        }
      });

      return Object.assign(wrapped, { cancel });
    }),
  };
});

vi.mock('debounce', () => ({
  default: debounceFactory,
}));

function buildValues(): TestValues {
  return { fieldA: '', fieldB: '', fieldC: '', fieldD: '', fieldE: 'choice' };
}

function FormContextWrapper({ children }: PropsWithChildren): ReactElement {
  const methods = useHookForm<TestValues>({ values: buildValues() });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

function getField<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  expect(element).not.toBeNull();
  return element as T;
}

function MissingComponentField(): ReactElement {
  const methods = useHookForm<TestValues>({ values: buildValues() });

  return (
    <FormProvider {...methods}>
      <Field components={[]} contract={{ component: 'missing', id: 'fieldA' }} />
    </FormProvider>
  );
}

function renderWithFormContext(node: ReactElement): ReturnType<typeof render> {
  return render(node, { wrapper: FormContextWrapper });
}

describe('Form rendering', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    debounceFactory.mockClear();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test('renders rows, nested columns, field titles, and immediate onChange events', () => {
    const onChange = vi.fn<(event: ChangePayload) => void>();
    const { result } = renderHook(() =>
      useForm<TestValues>({
        contract: {
          rows: [
            {
              columns: [
                {
                  fields: [
                    { component: 'input', id: 'fieldA', title: 'Field A' },
                    { component: 'textarea', id: 'fieldB' },
                  ],
                  key: 'column-1',
                },
              ],
              key: 'row-1',
            },
          ],
        },
        values: buildValues(),
      }),
    );

    render(<Form form={result.current} onChange={onChange} />);

    expect(screen.getByText('Field A:')).toBeInTheDocument();
    expect(getField<HTMLInputElement>('fieldA')).toBeInTheDocument();
    expect(getField<HTMLTextAreaElement>('fieldB')).toBeInTheDocument();

    fireEvent.change(getField<HTMLInputElement>('fieldA'), { target: { value: 'ok' } });

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls.at(-1)?.[0]?.values.fieldA).toBe('ok');
  });

  test('renders columns without registering an onChange subscription when no callback is provided', () => {
    const { result } = renderHook(() =>
      useForm<TestValues>({
        contract: {
          columns: [
            {
              fields: [{ component: 'input', id: 'fieldC' }],
              key: 'column-root',
            },
          ],
        },
        values: buildValues(),
      }),
    );
    render(<Form form={result.current} />);

    expect(getField<HTMLInputElement>('fieldC')).toBeInTheDocument();
    expect(debounceFactory).not.toHaveBeenCalled();
  });

  test('renders tab content and debounces change notifications with cleanup cancellation', () => {
    const onChange = vi.fn<(event: ChangePayload) => void>();
    const { result } = renderHook(() =>
      useForm<TestValues>({
        contract: {
          debounceWait: 50,
          tab: {
            tabs: [
              {
                fields: [{ component: 'input', id: 'fieldD' }],
                key: 'tab-1',
                title: 'Tab 1',
              },
              {
                columns: [
                  {
                    fields: [
                      {
                        component: 'select',
                        id: 'fieldE',
                        options: [{ label: 'Choice', value: 'choice' }],
                      },
                    ],
                  },
                ],
                key: 'tab-2',
                title: 'Tab 2',
              },
            ],
          },
        },
        values: buildValues(),
      }),
    );

    const { unmount } = render(<Form form={result.current} onChange={onChange} />);

    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(getField<HTMLInputElement>('fieldD')).toBeInTheDocument();

    fireEvent.change(getField<HTMLInputElement>('fieldD'), { target: { value: 'x' } });
    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(onChange.mock.calls.at(-1)?.[0]?.values.fieldD).toBe('x');

    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(getField<HTMLSelectElement>('fieldE')).toBeInTheDocument();

    const debouncedEmit = debounceFactory.mock.results[0]?.value as { cancel: ReturnType<typeof vi.fn> };
    expect(debouncedEmit).toBeDefined();
    unmount();

    expect(debouncedEmit.cancel).toHaveBeenCalledTimes(1);
  });

  test('debounce consolidates rapid changes and emits only the latest value', () => {
    const onChange = vi.fn<(event: ChangePayload) => void>();
    const { result } = renderHook(() =>
      useForm<TestValues>({
        contract: {
          debounceWait: 50,
          rows: [{ fields: [{ component: 'input', id: 'fieldA' }], key: 'row-1' }],
        },
        values: buildValues(),
      }),
    );

    render(<Form form={result.current} onChange={onChange} />);

    fireEvent.change(getField<HTMLInputElement>('fieldA'), { target: { value: 'a' } });
    fireEvent.change(getField<HTMLInputElement>('fieldA'), { target: { value: 'ab' } });
    fireEvent.change(getField<HTMLInputElement>('fieldA'), { target: { value: 'abc' } });

    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].values.fieldA).toBe('abc');
  });

  test('unmounting before debounce timer fires prevents onChange from being called', () => {
    const onChange = vi.fn<(event: ChangePayload) => void>();
    const { result } = renderHook(() =>
      useForm<TestValues>({
        contract: {
          debounceWait: 50,
          rows: [{ fields: [{ component: 'input', id: 'fieldA' }], key: 'row-1' }],
        },
        values: buildValues(),
      }),
    );

    const { unmount } = render(<Form form={result.current} onChange={onChange} />);

    fireEvent.change(getField<HTMLInputElement>('fieldA'), { target: { value: 'x' } });
    expect(onChange).not.toHaveBeenCalled();

    unmount();

    vi.advanceTimersByTime(50);

    expect(onChange).not.toHaveBeenCalled();
  });

  test('does not debounce when debounceWait is 0', () => {
    const onChange = vi.fn<(event: ChangePayload) => void>();
    const { result } = renderHook(() =>
      useForm<TestValues>({
        contract: {
          debounceWait: 0,
          rows: [{ fields: [{ component: 'input', id: 'fieldA' }], key: 'row-1' }],
        },
        values: buildValues(),
      }),
    );

    render(<Form form={result.current} onChange={onChange} />);

    fireEvent.change(getField<HTMLInputElement>('fieldA'), { target: { value: 'x' } });

    expect(debounceFactory).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].values.fieldA).toBe('x');
  });

  test('throws when a field component cannot be found', () => {
    expect(() => {
      render(<MissingComponentField />);
    }).toThrow("Component 'missing' not found");
  });

  test('renders recursive row, column, and tab branches directly', () => {
    const columnContract: ContractColumn<TestValues> = {
      columns: [
        {
          fields: [{ component: 'input', id: 'fieldA' }],
        },
      ],
      rows: [
        {
          fields: [{ component: 'textarea', id: 'fieldB' }],
        },
      ],
    };
    const rowContract: ContractRow<TestValues> = {
      columns: [
        {
          fields: [{ component: 'input', id: 'fieldC' }],
        },
      ],
      rows: [
        {
          fields: [{ component: 'textarea', id: 'fieldD' }],
        },
      ],
    };
    const tabContract: ContractTabs<TestValues> = {
      rows: [
        {
          fields: [{ component: 'input', id: 'fieldE' }],
        },
      ],
      title: 'Standalone',
    };

    renderWithFormContext(
      <>
        <Column components={formComponents} contract={columnContract} />
        <Row components={formComponents} contract={rowContract} />
        <Tab components={formComponents} contract={tabContract} />
      </>,
    );

    expect(getField<HTMLInputElement>('fieldA')).toBeInTheDocument();
    expect(getField<HTMLTextAreaElement>('fieldB')).toBeInTheDocument();
    expect(getField<HTMLInputElement>('fieldC')).toBeInTheDocument();
    expect(getField<HTMLTextAreaElement>('fieldD')).toBeInTheDocument();
    expect(getField<HTMLInputElement>('fieldE')).toBeInTheDocument();
  });
});
