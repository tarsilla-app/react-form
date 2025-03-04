import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Form, useForm } from '../src/index.js';
import { Contract } from '../src/types/index.js';

type Value = {
  row1field1: string;
  row1field2: string;
  row1field3: string;
  row2field1: string;
  row3field1: string;
  row3field2: string;
  row3field3: string;
  column1field1: string;
  column1field2: string;
  column1field3: string;
  column2field1: string;
  column3field1: string;
  column3field2: string;
  column3field3: string;
};

const initialContract: Contract<Value> = {
  debounceWait: 2000,
  style: {},
  tab: {
    tabs: [
      {
        title: 'Tab 1',
        style: {},
        rows: [
          {
            style: {},
            fields: [
              {
                id: 'row1field1',
                component: 'input',
                title: 'Row 1 Field 1',
                style: {
                  color: 'green',
                },
              },
              {
                id: 'row1field2',
                component: 'input',
                placeholder: 'Row 1 Field 2',
              },
              {
                id: 'row1field3',
                component: 'input',
              },
            ],
          },
          {
            fields: [
              {
                id: 'row2field1',
                component: 'textarea',
              },
            ],
          },
          {
            fields: [
              {
                id: 'row3field1',
                component: 'select',
                title: 'Row 3 Field 1',
                options: [
                  {
                    label: 'option 1',
                    value: 'value 1',
                  },
                ],
                style: {
                  color: 'green',
                },
              },
              {
                id: 'row3field2',
                component: 'select',
                placeholder: 'Row 3 Field 2',
              },
              {
                id: 'row3field3',
                component: 'select',
              },
            ],
          },
        ],
      },
      {
        title: 'Tab 2',
        style: {},
        columns: [
          {
            style: {},
            fields: [
              {
                id: 'column1field1',
                component: 'input',
                title: 'Column 1 Field 1',
              },
              {
                id: 'column1field2',
                component: 'input',
                placeholder: 'Column 1 Field 2',
              },
              {
                id: 'column1field3',
                component: 'input',
              },
            ],
          },
          {
            fields: [
              {
                id: 'column2field1',
                component: 'textarea',
              },
            ],
          },
          {
            fields: [
              {
                id: 'column3field1',
                component: 'select',
                title: 'Column 3 Field 1',
                options: [
                  {
                    label: 'option 1',
                    value: 'value 1',
                  },
                ],
              },
              {
                id: 'column3field2',
                component: 'select',
                placeholder: 'Column 3 Field 2',
              },
              {
                id: 'column3field3',
                component: 'select',
              },
            ],
          },
        ],
      },
    ],
    style: {},
  },
};

function CatchForm({ contract }: { contract: Contract<Value> }): JSX.Element {
  const onSubmit = (data: Value) => console.log(data);
  try {
    const form = useForm({
      contract,
      values: {
        row1field1: '',
        row1field2: '',
        row1field3: '',
        row2field1: '',
        row3field1: '',
        row3field2: '',
        row3field3: '',
        column1field1: '',
        column1field2: '',
        column1field3: '',
        column2field1: '',
        column3field1: '',
        column3field2: '',
        column3field3: '',
      },
    });

    return (
      <>
        <Form form={form} onChange={(event) => console.log(event)} />
        <button
          onClick={() => {
            void form.handleSubmit(onSubmit)();
          }}
        >
          submit
        </button>
      </>
    );
  } catch (error: unknown) {
    return <>{(error as Error).message}</>;
  }
}

function FormStory(): JSX.Element {
  const [value, setValue] = useState<string>(JSON.stringify(initialContract, null, 2));
  const [error, setError] = useState<string>();
  const [contract, setContract] = useState<Contract<Value>>(initialContract);

  useEffect(() => {
    try {
      const parsed = JSON.parse(value) as Contract<Value>;
      setContract(parsed);
      setError(undefined);
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  }, [value]);
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row',
        rowGap: '4px',
        columnGap: '4px',
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
        <textarea value={value} onChange={(event) => setValue(event.target.value)} rows={30} />
      </div>
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          rowGap: '4px',
          borderWidth: '1px',
          borderColor: 'black',
          borderStyle: 'solid',
          width: '60vw',
          padding: '8px',
        }}
      >
        {error ? <>{error}</> : <CatchForm contract={contract} />}
      </div>
    </div>
  );
}

const meta: Meta<typeof FormStory> = {
  title: 'Form Builder',
  component: FormStory,
  parameters: {
    layout: 'centered',
    fullscreen: true,
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FormBuilder: Story = {};
