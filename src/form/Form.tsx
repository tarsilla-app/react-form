import { TabWrapper } from '@tarsilla/react-components/tab';
import { FieldValues, FormProvider } from 'react-hook-form';

import { Column } from './column';
import styles from './Form.module.css';
import { Row } from './row';
import { Tab } from './tab';
import { FormProps } from '../types';

function Form<T extends FieldValues>({
  form,
}: {
  form: FormProps<T>;
}): JSX.Element {
  const { contract, fields, ...methods } = form;

  return (
    <FormProvider {...methods}>
      <div
        className={styles.form}
        style={{
          '--flex-flow': contract.rows ? 'column' : 'row',
        }}
      >
        {contract.rows?.map((row) => (
          <Row contract={row} fields={fields} key={row.id} />
        ))}
        {contract.columns?.map((column) => (
          <Column contract={column} fields={fields} key={column.id} />
        ))}
        {contract.tabs && (
          <TabWrapper
            tabs={contract.tabs.map((tab) => ({
              header: <>{tab.title}</>,
              content: <Tab contract={tab} fields={fields} key={tab.id} />,
            }))}
          />
        )}
      </div>
    </FormProvider>
  );
}

export { Form };
