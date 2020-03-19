import * as React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { Field } from 'react-final-form';
import { IBaseFormFieldProps } from '../form.types';
import './StandardSelectInput.scss';

interface IStandardSelectInputProps {
  options: Array<{[key: string]: string}>;
}

const StandardSelectInput = (props: IBaseFormFieldProps & IStandardSelectInputProps) => {
  const { name, label, fullWidth, options } = props;

  return (
    <Field
      name={name}
      render={({ input }) => (
        <TextField
          select
          label={label}
          {...input}
          SelectProps={{
            native: true,
          }}
          classes={{
            root: 'standard-select',
          }}
          fullWidth={fullWidth !== undefined ? fullWidth : true }
          margin='dense'
          variant='outlined'
        >
          <option/>
          {options.map((opt) => (
            <option key={opt.key} value={opt.value}>
              {opt.key}
            </option>
          ))}
        </TextField>
      )}
    />
  );
};

export default StandardSelectInput;
