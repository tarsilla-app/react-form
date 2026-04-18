import styled from '@emotion/styled';
import { JSX } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';

import { FormComponent } from '@tarsilla/react-form-components';

import { ContractField } from '@types';

const Container = styled.div`
  gap: 4px;
  display: flex;
  flex-flow: row;
  align-items: center;
`;

type Props<FormValue extends FieldValues> = {
  components: FormComponent<unknown, object>[];

  contract: ContractField<FormValue>;
};

function Field<FormValue extends FieldValues>({ components, contract }: Props<FormValue>): JSX.Element {
  const { control } = useFormContext<FormValue>();

  const { component, id, key, title, ...rest } = contract;

  const Component = components.find((c) => c.id === component);
  if (!Component) {
    throw new Error(`Component '${component}' not found`);
  }

  return (
    <Container>
      {title && <>{title}:</>}
      <Controller
        control={control}
        name={id}
        render={({ field: { onChange, value } }) => (
          <Component.render id={id} key={key} onChange={onChange} value={value} {...rest} />
        )}
      />
    </Container>
  );
}

export { Field };
