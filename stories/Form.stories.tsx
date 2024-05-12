import { useEffect, useState } from 'react';

import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { Form, useForm } from '../src';
import { SelectField, TextAreaField, TextField } from '../src/allowed-fields';
import { validateContract } from '../src/hooks/validator';
import { Contract } from '../src/types';

function FormStory(): JSX.Element {
  const initialContract = {
    tabs: [
      {
        id: 'tab1',
        title: 'Tab 1',
        rows: [
          {
            id: 'row1',
            fields: [
              {
                id: 'row1field1',
                type: 'text',
                title: 'Row 1 Field 1',
              },
              {
                id: 'row1field2',
                type: 'text',
                props: {
                  placeholder: 'Row 1 Field 2',
                },
              },
              {
                id: 'row1field3',
                type: 'text',
              },
            ],
          },
          {
            id: 'row2',
            fields: [
              {
                id: 'row2field1',
                type: 'textarea',
              },
            ],
          },
          {
            id: 'row3',
            fields: [
              {
                id: 'row3field1',
                type: 'select',
                title: 'Row 3 Field 1',
                props: {
                  options: [
                    {
                      label: 'option 1',
                      value: 'value 1',
                    },
                  ],
                },
              },
              {
                id: 'row3field2',
                type: 'select',
                props: {
                  placeholder: 'Row 3 Field 2',
                },
              },
              {
                id: 'row3field3',
                type: 'select',
              },
            ],
          },
        ],
      },
      {
        id: 'tab2',
        title: 'Tab 2',
        columns: [
          {
            id: 'column1',
            fields: [
              {
                id: 'column1field1',
                type: 'text',
                title: 'Column 1 Field 1',
              },
              {
                id: 'column1field2',
                type: 'text',
                props: {
                  placeholder: 'Column 1 Field 2',
                },
              },
              {
                id: 'column1field3',
                type: 'text',
              },
            ],
          },
          {
            id: 'column2',
            fields: [
              {
                id: 'column2field1',
                type: 'textarea',
              },
            ],
          },
          {
            id: 'column3',
            fields: [
              {
                id: 'column3field1',
                type: 'select',
                title: 'Column 3 Field 1',
                props: {
                  options: [
                    {
                      label: 'option 1',
                      value: 'value 1',
                    },
                  ],
                },
              },
              {
                id: 'column3field2',
                type: 'select',
                props: {
                  placeholder: 'Column 3 Field 2',
                },
              },
              {
                id: 'column3field3',
                type: 'select',
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
  const form = useForm({ contract });

  useEffect(() => {
    try {
      const parsed = JSON.parse(value) as Contract<unknown>;
      const fields = [SelectField, TextAreaField, TextField];

      //TODO ver uma forma de nao precisar disso! talvez try catch no <Form />
      validateContract({
        contract: parsed,
        allowedFieldTypes: fields.map((field) => field.id),
      });

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
        {error ? <>{error}</> : <Form form={form} />}
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
