import { Controller, FieldValues, useFormContext } from 'react-hook-form';

import { ContractField, FormComponent, UnknownObject } from '@types';

import styles from './Field.module.css';

type Props<FormValue extends FieldValues> = {
  contract: ContractField<FormValue>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: FormComponent<any, UnknownObject>[];
};

function Field<FormValue extends FieldValues>({ contract, components }: Props<FormValue>): JSX.Element {
  const { control } = useFormContext<FormValue>();

  const { id, component, title, ...rest } = contract;

  const Component = components.find((c) => c.id === component);
  if (!Component) {
    throw new Error(`Component '${component}' not found`);
  }

  return (
    <div className={styles.field}>
      {title && <>{title}:</>}
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Component.render id={id} value={value} onChange={onChange} {...rest} />
        )}
      />
    </div>
  );
}

export { Field };
