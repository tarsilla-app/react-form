import { Option, Select, SelectProps } from '@tarsilla/react-components/select';

import { FormComponent } from '../types';

const SelectField: FormComponent<Option | Option[], SelectProps> = {
  id: 'select',
  render: ({ value, onChange, ...rest }) => {
    return (
      <Select
        value={value}
        onChange={(newValue: Option | Option[] | undefined) =>
          onChange(newValue)
        }
        {...rest}
      />
    );
  },
};

export { SelectField };
