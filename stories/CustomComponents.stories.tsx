import { HTMLAttributes } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { FormComponent, FormComponentProps } from '@tarsilla/react-form-components';

import { Contract, Form, useForm } from '../src/index.js';

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

const CustomInput: FormComponent<string, HTMLAttributes<HTMLInputElement>> = {
  id: 'custom-input',
  render: ({ onChange, ...rest }) => <input onChange={(e) => onChange(e.target.value)} {...rest} />,
};

const TextFieldOverride = {
  id: 'input',
  render: ({ onChange, ...rest }: FormComponentProps<string, HTMLAttributes<HTMLInputElement>>): JSX.Element => {
    return <input onChange={(e) => onChange(e.target.value)} {...rest} />;
  },
};

function FormStory(): JSX.Element {
  const contract: Contract<Value> = {
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
                  component: 'custom-input',
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
  const customComponents = [CustomInput, TextFieldOverride];

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
    customComponents,
  });

  return <Form form={form} onChange={(event) => console.log(event)} />;
}

const meta: Meta<typeof FormStory> = {
  title: 'Custom Components',
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

export const CustomComponents: Story = {};
