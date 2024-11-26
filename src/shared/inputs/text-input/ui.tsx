interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export const TextInput: React.FC<Props> = ({ placeholder, ...props }) => {
  return <input type="text" placeholder={placeholder ?? ''} {...props} />;
};
