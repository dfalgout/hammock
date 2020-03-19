import * as React from 'react';
import { Field } from 'react-final-form';
import { TextField } from '@material-ui/core';
import { IBaseFormFieldProps } from '../form.types';

interface IStandardFieldProps {
  required: boolean;
}

const StandardField = (props: IBaseFormFieldProps & IStandardFieldProps) => {
  const { name, label, required, validate, type } = props;
  return (
    <Field
      name={name}
      validate={validate}
      render={({ input, meta }) => (
        <TextField
          {...input}
          type={type ? type : 'text'}
          required={required}
          error={meta.error && meta.touched}
          helperText={meta.touched ? meta.error : null}
          fullWidth={true}
          style={{
            paddingRight: '16px',
          }}
          label={label}
          margin='dense'
          variant='outlined'
        />
      )}
    />
  );
};

export default StandardField;
