import { HTMLAttributes } from 'react';
import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { FormComponent } from '@tarsilla/react-form-components';

import { useForm } from '../../src/hooks/useForm.js';

type TestValues = {
  fieldA: string;
  fieldB: string;
  fieldC: string;
  fieldD: string;
  fieldE: string;
};

const customComponent: FormComponent<string, HTMLAttributes<HTMLInputElement>> = {
  id: 'custom-input',
  render: ({ onChange, ...rest }) => {
    return (
      <input
        onChange={(event) => {
          onChange(event.target.value);
        }}
        {...rest}
      />
    );
  },
};

describe('useForm', () => {
  test('returns react-hook-form methods, validated contract, and default plus custom components', () => {
    const contract = {
      rows: [
        {
          fields: [{ component: 'input', id: 'fieldA' as const }],
        },
      ],
    };

    const { result } = renderHook(() =>
      useForm<TestValues>({
        contract,
        customComponents: [customComponent],
        values: { fieldA: 'alpha', fieldB: '', fieldC: '', fieldD: '', fieldE: '' },
      }),
    );

    expect(result.current.contract).toBe(contract);
    expect(result.current.components.map((component) => component.id)).toEqual([
      'input',
      'label',
      'select',
      'textarea',
      'custom-input',
    ]);
    expect(result.current.getValues()).toMatchObject({ fieldA: 'alpha' });
    expect(result.current.watch).toBeTypeOf('function');
  });

  test('throws when the contract is invalid', () => {
    expect(() => {
      renderHook(() =>
        useForm<TestValues>({
          contract: {
            rows: [
              {
                fields: [{ component: 'missing', id: 'fieldA' as const }],
              },
            ],
          },
        }),
      );
    }).toThrow("Component 'missing' is not allowed");
  });
});
