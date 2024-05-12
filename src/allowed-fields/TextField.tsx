import { Text } from '@tarsilla/react-components/text';

import { FormField } from '../types';

const TextField: FormField<string> = {
  id: 'text',
  render: ({
    value,
    onChange,
    props,
  }: {
    value?: string;
    onChange: (value?: string) => void;
    props?: object;
  }) => {
    return (
      <Text
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    );
  },
};

export { TextField };
