import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import styles from './Field.module.css';
import { ContractField, FormComponent } from '../../types';

type Props<T> = {
  contract: ContractField<T>;
  components: FormComponent<unknown, object>[];
};

function Field<T extends FieldValues>({
  contract,
  components,
}: Props<T>): JSX.Element {
  const { control } = useFormContext<T>();

  const { id, component, title, ...rest } = contract;

  const Component = components.find((c) => c.id === component);
  if (!Component) {
    throw new Error(`Component '${component}' not found`);
  }

  return (
    <div className={styles.field}>
      {title && <>{title}:</>}
      <Controller
        name={id as Path<T>}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Component.render
            id={id}
            value={value}
            onChange={onChange}
            {...rest}
          />
        )}
      />
    </div>
  );
}

export { Field };
