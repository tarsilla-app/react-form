import { useEffect, useState } from 'react';

import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { Form, useForm } from '../src';
import { Contract } from '../src/types';

function CatchForm({ contract }: { contract: Contract<never> }): JSX.Element {
  try {
    const form = useForm({ contract });

    return <Form form={form} />;
  } catch (error: unknown) {
    return <>{(error as Error).message}</>;
  }
}

function FormStory(): JSX.Element {
  const initialContract = {
    style: {},
    tabs: [
      {
        id: 'tab1',
        title: 'Tab 1',
        style: {},
        rows: [
          {
            id: 'row1',
            style: {},
            fields: [
              {
                id: 'row1field1',
                component: 'text',
                title: 'Row 1 Field 1',
                style: {
                  color: 'green',
                },
              },
              {
                id: 'row1field2',
                component: 'text',
                placeholder: 'Row 1 Field 2',
              },
              {
                id: 'row1field3',
                component: 'text',
              },
            ],
          },
          {
            id: 'row2',
            fields: [
              {
                id: 'row2field1',
                component: 'textarea',
              },
            ],
          },
          {
            id: 'row3',
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
        id: 'tab2',
        title: 'Tab 2',
        style: {},
        columns: [
          {
            id: 'column1',
            style: {},
            fields: [
              {
                id: 'column1field1',
                component: 'text',
                title: 'Column 1 Field 1',
              },
              {
                id: 'column1field2',
                component: 'text',
                placeholder: 'Column 1 Field 2',
              },
              {
                id: 'column1field3',
                component: 'text',
              },
            ],
          },
          {
            id: 'column2',
            fields: [
              {
                id: 'column2field1',
                component: 'textarea',
              },
            ],
          },
          {
            id: 'column3',
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
  };
  const [value, setValue] = useState<string>(
    JSON.stringify(initialContract, null, 2),
  );
  const [error, setError] = useState<string>();
  const [contract, setContract] = useState<Contract<never>>(initialContract);

  useEffect(() => {
    try {
      const parsed = JSON.parse(value) as Contract<unknown>;
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
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={30}
        />
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

const meta = {
  title: 'FormBuilder',
  component: FormStory,
  parameters: {
    layout: 'centered',
    fullscreen: true,
  },
  argTypes: {},
  args: {},
  decorators: [
    (Story, ctx) => {
      const [, setArgs] = useArgs<typeof ctx.args>();

      setArgs(ctx.args);

      return <Story args={{ ...ctx.args }} />;
    },
  ],
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormBuilder: Story = {};
