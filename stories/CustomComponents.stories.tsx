import { HTMLAttributes } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { FormComponent, FormComponentProps } from '@tarsilla/react-form-components';

import { Form, useForm } from '../src/index.js';

const CustomInput: FormComponent<string, HTMLAttributes<HTMLInputElement>> = {
  id: 'custom-input',
  render: ({ onChange, ...rest }) => <input onChange={(e) => onChange(e.target.value)} {...rest} />,
};

const TextFieldOverride = {
  id: 'text',
  render: ({ onChange, ...rest }: FormComponentProps<string, HTMLAttributes<HTMLInputElement>>): JSX.Element => {
    return <input onChange={(e) => onChange(e.target.value)} {...rest} />;
  },
};

function FormStory(): JSX.Element {
  const contract = {
    style: {},
    tab: {
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
                  component: 'custom-input',
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
      style: {},
    },
  };
  const customComponents = [CustomInput, TextFieldOverride];

  const form = useForm({ contract, customComponents });

  return <Form form={form} />;
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
