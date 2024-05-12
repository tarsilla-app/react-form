import { Option, Select } from '@tarsilla/react-components/select';

import { FormField } from '../types';

const SelectField: FormField<Option | Option[]> = {
  id: 'select',
  render: ({
    value,
    onChange,
    props,
  }: {
    value?: Option | Option[];
    onChange: (value?: Option | Option[]) => void;
    props?: object;
  }) => {
    return (
      <Select
        value={value}
        onChange={(newValue: Option | Option[] | undefined) =>
          onChange(newValue)
        }
        {...props}
      />
    );
  },
};

export { SelectField };
