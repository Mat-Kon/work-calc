interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const BaseBtn: React.FC<Props> = ({ text, ...props }) => {
  return <button {...props}>{text}</button>;
};
