interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  id: string;
  optionValues: string[];
}

export const CalcSelect: React.FC<Props> = ({ name, id, optionValues, ...props }) => {
  return (
    <select name={name} id={id} {...props}>
      {optionValues.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};
