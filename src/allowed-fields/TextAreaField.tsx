import { TextArea } from '@tarsilla/react-components/textarea';

import { FormField } from '../types';

const TextAreaField: FormField<string> = {
  id: 'textarea',
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
      <TextArea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    );
  },
};

export { TextAreaField };
