import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  id?: string;
  variant?: 'text' | 'contained' | 'outlined';
  onClick?: () => void;
  type: 'submit';
  children: React.ReactNode;
  loading?: boolean;
}
export default function Button({
  id,
  variant,
  onClick,
  type,
  children,
  loading,
}: Props) {
  return (
    <LoadingButton
      loadingPosition="center"
      loading={loading}
      id={id}
      onClick={onClick}
      variant={variant}
      type={type}
    >
      {children}
    </LoadingButton>
  );
}

Button.defaultProps = {
  id: '',
  variant: 'outlined',
  onClick: undefined,
  loading: undefined,
};
