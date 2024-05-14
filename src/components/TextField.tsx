import { Text, TextProps } from '@tarsilla/react-components/text';

import { FormComponent } from '../types';

const TextField: FormComponent<string, TextProps> = {
  id: 'text',
  render: ({ value, onChange, ...rest }) => {
    return (
      <Text
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      />
    );
  },
};

export { TextField };
