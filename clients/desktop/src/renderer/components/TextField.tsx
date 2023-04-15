import React from 'react';
import { withStyles } from '@mui/styles';
import MuiTextField from '@mui/material/TextField';

interface Props {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  type?: 'text' | 'password';
  variant?: 'filled' | 'standard' | 'outlined';
  color?: 'secondary' | 'success' | 'warning';
}

function TextField({
  id,
  name,
  onChange,
  value,
  label,
  variant,
  type,
  color,
}: Props) {
  return (
    <MuiTextField
      id={id}
      name={name}
      type={type}
      label={label}
      value={value}
      variant={variant}
      onChange={onChange}
      color={color}
    />
  );
}

TextField.defaultProps = {
  variant: 'filled',
  type: 'text',
  color: undefined,
};

export default TextField;
