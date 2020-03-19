import * as React from 'react';
import { InlineDatePicker } from 'material-ui-pickers';
import { Field } from 'react-final-form';
import { IBaseFormFieldProps } from '../form.types';

interface IDatePickerProps {
  format?: string;
  disableFuture?: boolean;
}

const DatePicker = (props: IBaseFormFieldProps & IDatePickerProps) => {
  const { name, label, disableFuture, format } = props;

  const DatePickerWrapper = (props: any) => {
    const {
      input: { name, onChange, value, ...restInput },
      meta,
      ...rest
    } = props;
    const showError =
      ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
      meta.touched;

    return (
      <InlineDatePicker
        keyboard
        clearable
        autoOk
        name={name}
        {...rest}
        inputProps={restInput}
        fullWidth={true}
        helperText={showError ? meta.error || meta.submitError : undefined}
        error={showError}
        value={value === '' ? null : value}
        onChange={onChange}
        format={format !== undefined ? format : 'MM/DD/YYYY'}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      />
    );
  };

  return (
    <Field
      name={name}
      label={label}
      disableFuture={disableFuture !== undefined ? disableFuture : false}
      style={{
        paddingRight: '16px',
      }}
      margin='dense'
      variant='outlined'
      component={DatePickerWrapper}
    />
  );
};

export default DatePicker;
