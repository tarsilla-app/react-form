import { describe, expect, test } from 'vitest';

import { validateContract } from '../../../src/hooks/validator/validator.js';

const allowedComponents = ['input', 'textarea', 'select', 'custom-input'];

describe('validateContract', () => {
  test('accepts a valid nested contract across rows, columns, and tabs', () => {
    expect(() => {
      validateContract({
        allowedComponents,
        contract: {
          tab: {
            tabs: [
              {
                rows: [
                  {
                    columns: [
                      {
                        fields: [
                          { component: 'input', id: 'fieldA' },
                          { component: 'textarea', id: 'fieldB' },
                        ],
                      },
                    ],
                  },
                ],
                title: 'One',
              },
            ],
          },
        },
      });
    }).not.toThrow();
  });

  test('rejects multiple top-level content groups', () => {
    expect(() => {
      validateContract({
        allowedComponents,
        contract: {
          columns: [],
          rows: [],
        },
      });
    }).toThrow('Contract can only have rows or columns or tabs');
  });

  test('rejects rows with multiple child groups', () => {
    expect(() => {
      validateContract({
        allowedComponents,
        contract: {
          rows: [
            {
              fields: [{ component: 'input', id: 'fieldA' }],
              rows: [],
            },
          ],
        },
      });
    }).toThrow('Rows can only have fields or rows or columns');
  });

  test('rejects columns with multiple child groups', () => {
    expect(() => {
      validateContract({
        allowedComponents,
        contract: {
          columns: [
            {
              columns: [],
              fields: [{ component: 'input', id: 'fieldA' }],
            },
          ],
        },
      });
    }).toThrow('Columns can only have fields or rows or columns');
  });

  test('rejects tabs with multiple child groups', () => {
    expect(() => {
      validateContract({
        allowedComponents,
        contract: {
          tab: {
            tabs: [
              {
                fields: [{ component: 'input', id: 'fieldA' }],
                rows: [],
                title: 'Tab',
              },
            ],
          },
        },
      });
    }).toThrow('Tabs can only have fields or rows or columns');
  });

  test('rejects fields without an id', () => {
    expect(() => {
      validateContract({
        allowedComponents,
        contract: {
          rows: [{ fields: [{ component: 'input', id: '' }] }],
        },
      });
    }).toThrow('Field id is required');
  });

  test('rejects fields with invalid characters in the id', () => {
    expect(() => {
      validateContract({
        allowedComponents,
        contract: {
          rows: [{ fields: [{ component: 'input', id: 'field A' }] }],
        },
      });
    }).toThrow('Field id must not contain special characters or spaces');
  });

  test('rejects fields without a component', () => {
    expect(() => {
      validateContract({
        allowedComponents,
        contract: {
          rows: [{ fields: [{ component: '', id: 'fieldA' }] }],
        },
      });
    }).toThrow('Field component is required');
  });

  test('rejects disallowed components', () => {
    expect(() => {
      validateContract({
        allowedComponents,
        contract: {
          rows: [{ fields: [{ component: 'label', id: 'fieldA' }] }],
        },
      });
    }).toThrow("Component 'label' is not allowed");
  });

  test('rejects field-level debounce configuration', () => {
    expect(() => {
      validateContract({
        allowedComponents,
        contract: {
          rows: [{ fields: [{ component: 'input', debounceWait: 10, id: 'fieldA' }] }],
        },
      });
    }).toThrow('Field dont have debounceWait');
  });

  test('rejects duplicate field ids anywhere in the tree', () => {
    expect(() => {
      validateContract({
        allowedComponents,
        contract: {
          rows: [
            {
              columns: [
                {
                  fields: [{ component: 'input', id: 'fieldA' }],
                },
              ],
            },
            {
              fields: [{ component: 'textarea', id: 'fieldA' }],
            },
          ],
        },
      });
    }).toThrow("id 'fieldA' is duplicated");
  });
});
