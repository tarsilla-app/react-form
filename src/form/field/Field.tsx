import styled from '@emotion/styled';
import { FormComponent } from '@tarsilla/react-form-components';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';

import { ContractField } from '@types';

const Container = styled.div`
  gap: 4px;
  display: flex;
  flex-flow: row;
  align-items: center;
`;

type Props<FormValue extends FieldValues> = {
  contract: ContractField<FormValue>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: FormComponent<any, any>[];
};

function Field<FormValue extends FieldValues>({ contract, components }: Props<FormValue>): JSX.Element {
  const { control } = useFormContext<FormValue>();

  const { id, component, title, ...rest } = contract;

  const Component = components.find((c) => c.id === component);
  if (!Component) {
    throw new Error(`Component '${component}' not found`);
  }

  return (
    <Container>
      {title && <>{title}:</>}
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Component.render id={id} value={value} onChange={onChange} {...rest} />
        )}
      />
    </Container>
  );
}

export { Field };
