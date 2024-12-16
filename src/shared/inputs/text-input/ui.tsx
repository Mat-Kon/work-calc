import { forwardRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(({ placeholder, ...props }, ref) => {
  return <input type="text" placeholder={placeholder ?? ''} {...props} ref={ref} />;
});
