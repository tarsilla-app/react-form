import type { Meta, StoryObj } from '@storybook/react-vite';

import { JSX, useMemo, useState } from 'react';

import { Form, useForm } from '../src/index.js';
import { Contract } from '../src/types/index.js';

type Value = {
  column1field1: string;
  column1field2: string;
  column1field3: string;
  column2field1: string;
  column3field1: string;
  column3field2: string;
  column3field3: string;
  row1field1: string;
  row1field2: string;
  row1field3: string;
  row2field1: string;
  row3field1: string;
  row3field2: string;
  row3field3: string;
};

const initialContract: Contract<Value> = {
  debounceWait: 2000,
  tab: {
    tabs: [
      {
        rows: [
          {
            fields: [
              {
                component: 'input',
                id: 'row1field1',
                theme: {
                  color: 'green',
                },
                title: 'Row 1 Field 1',
              },
              {
                component: 'input',
                id: 'row1field2',
                placeholder: 'Row 1 Field 2',
              },
              {
                component: 'input',
                id: 'row1field3',
              },
            ],
            theme: {},
          },
          {
            fields: [
              {
                component: 'textarea',
                id: 'row2field1',
              },
            ],
          },
          {
            fields: [
              {
                component: 'select',
                id: 'row3field1',
                options: [
                  {
                    label: 'option 1',
                    value: 'value 1',
                  },
                ],
                theme: {
                  color: 'green',
                },
                title: 'Row 3 Field 1',
              },
              {
                component: 'select',
                id: 'row3field2',
                placeholder: 'Row 3 Field 2',
              },
              {
                component: 'select',
                id: 'row3field3',
              },
            ],
          },
        ],
        theme: {},
        title: 'Tab 1',
      },
      {
        columns: [
          {
            fields: [
              {
                component: 'input',
                id: 'column1field1',
                title: 'Column 1 Field 1',
              },
              {
                component: 'input',
                id: 'column1field2',
                placeholder: 'Column 1 Field 2',
              },
              {
                component: 'input',
                id: 'column1field3',
              },
            ],
            theme: {},
          },
          {
            fields: [
              {
                component: 'textarea',
                id: 'column2field1',
              },
            ],
          },
          {
            fields: [
              {
                component: 'select',
                id: 'column3field1',
                options: [
                  {
                    label: 'option 1',
                    value: 'value 1',
                  },
                ],
                title: 'Column 3 Field 1',
              },
              {
                component: 'select',
                id: 'column3field2',
                placeholder: 'Column 3 Field 2',
              },
              {
                component: 'select',
                id: 'column3field3',
              },
            ],
          },
        ],
        theme: {},
        title: 'Tab 2',
      },
    ],
    theme: {},
  },
  theme: {},
};

function CatchForm({ contract }: { contract: Contract<Value> }): JSX.Element {
  const onSubmit = (data: Value) => {
    console.log(data);
  };

  const form = useForm({
    contract,
    values: {
      column1field1: '',
      column1field2: '',
      column1field3: '',
      column2field1: '',
      column3field1: '',
      column3field2: '',
      column3field3: '',
      row1field1: '',
      row1field2: '',
      row1field3: '',
      row2field1: '',
      row3field1: '',
      row3field2: '',
      row3field3: '',
    },
  });

  return (
    <>
      <Form
        form={form}
        onChange={(event) => {
          console.log(event);
        }}
      />
      <button
        onClick={() => {
          void form.handleSubmit(onSubmit)();
        }}
      >
        submit
      </button>
    </>
  );
}

function FormStory(): JSX.Element {
  const [value, setValue] = useState<string>(JSON.stringify(initialContract, null, 2));

  const { contract, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(value) as Contract<Value>;
      return { contract: parsed, error: undefined as string | undefined };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Invalid JSON';
      return { contract: initialContract, error: message };
    }
  }, [value]);

  return (
    <div
      style={{
        columnGap: '4px',
        display: 'flex',
        flexFlow: 'row',
        rowGap: '4px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          rowGap: '4px',
          width: '25vw',
        }}
      >
        <textarea
          onChange={(event) => {
            setValue(event.target.value);
          }}
          rows={30}
          value={value}
        />
      </div>
      <div
        style={{
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: '1px',
          display: 'flex',
          flexFlow: 'column',
          padding: '8px',
          rowGap: '4px',
          width: '60vw',
        }}
      >
        {error ? <>{error}</> : <CatchForm contract={contract} />}
      </div>
    </div>
  );
}

const meta: Meta<typeof FormStory> = {
  args: {},
  argTypes: {},
  component: FormStory,
  parameters: {
    fullscreen: true,
    layout: 'centered',
  },
  title: 'Form Builder',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FormBuilder: Story = {};
