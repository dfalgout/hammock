import * as React from 'react';

export interface IBaseFormFieldProps {
  name: string;
  label: string;
  type?: string;
  fullWidth?: boolean;
  validate?: (value: string) => any;
  [option: string]: any;
}