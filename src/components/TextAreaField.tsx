import { TextArea, TextAreaProps } from '@tarsilla/react-components/textarea';

import { FormComponent } from '../types';

const TextAreaField: FormComponent<string, TextAreaProps> = {
  id: 'textarea',
  render: ({ value, onChange, ...rest }) => {
    return (
      <TextArea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      />
    );
  },
};

export { TextAreaField };
