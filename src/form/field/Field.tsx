import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import styles from './Field.module.css';
import { ContractField, FormField } from '../../types';

type Props<T> = {
  contract: ContractField<T>;
  fields: FormField<unknown>[];
};

function Field<T extends FieldValues>({
  contract,
  fields,
}: Props<T>): JSX.Element {
  const { control } = useFormContext<T>();

  const field = fields.find((field) => field.id === contract.type);
  if (!field) {
    throw new Error(`Field with type ${contract.type} not found`);
  }

  return (
    <div className={styles.field}>
      {contract.title && <>{contract.title}:</>}
      <Controller
        name={contract.id as Path<T>}
        control={control}
        render={({ field: { onChange, value } }) => (
          <field.render
            value={value}
            onChange={onChange}
            props={contract.props}
          />
        )}
      />
    </div>
  );
}

export { Field };
