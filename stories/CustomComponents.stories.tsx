import type { Meta, StoryObj } from '@storybook/react-vite';

import { HTMLAttributes, JSX } from 'react';

import { FormComponent, FormComponentProps } from '@tarsilla/react-form-components';

import { Contract, Form, useForm } from '../src/index.js';

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

const CustomInput: FormComponent<string, HTMLAttributes<HTMLInputElement>> = {
  id: 'custom-input',
  render: ({ onChange, ...rest }) => (
    <input
      onChange={(e) => {
        onChange(e.target.value);
      }}
      {...rest}
    />
  ),
};

const InoutOverride = {
  id: 'input',
  render: ({ onChange, ...rest }: FormComponentProps<string, HTMLAttributes<HTMLInputElement>>) => {
    return (
      <input
        onChange={(e) => {
          onChange(e.target.value);
        }}
        {...rest}
      />
    );
  },
};

function FormStory(): JSX.Element {
  const contract: Contract<Value> = {
    tab: {
      tabs: [
        {
          rows: [
            {
              fields: [
                {
                  component: 'custom-input',
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
  const customComponents = [CustomInput, InoutOverride];

  const form = useForm({
    contract,
    customComponents,
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
    <Form
      form={form}
      onChange={(event) => {
        console.log(event);
      }}
    />
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
  title: 'Custom Components',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CustomComponents: Story = {};
