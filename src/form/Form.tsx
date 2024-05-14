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
  const { contract, components, ...methods } = form;

  return (
    <FormProvider {...methods}>
      <div
        className={styles.form}
        style={{
          '--flex-flow': contract.rows ? 'column' : 'row',
          width: '100%',
          height: '100%',
          ...contract.style,
        }}
      >
        {contract.rows?.map((row) => (
          <Row
            contract={row}
            components={components}
            style={row.style}
            key={row.id}
          />
        ))}
        {contract.columns?.map((column) => (
          <Column
            contract={column}
            components={components}
            style={column.style}
            key={column.id}
          />
        ))}
        {contract.tabs && (
          <TabWrapper
            tabs={contract.tabs.map((tab) => ({
              header: <>{tab.title}</>,
              content: (
                <Tab
                  contract={tab}
                  components={components}
                  style={tab.style}
                  key={tab.id}
                />
              ),
            }))}
            style={contract.style}
          />
        )}
      </div>
    </FormProvider>
  );
}

export { Form };
