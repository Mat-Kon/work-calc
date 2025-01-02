import { forwardRef } from 'react';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  id: string;
  optionValues: string[];
}

type Ref = HTMLSelectElement;

export const CustomSelect: React.FC<Props> = forwardRef<Ref, Props>(
  ({ name, id, optionValues, ...props }, ref) => {
    return (
      <select name={name} id={id} {...props} ref={ref}>
        {optionValues.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  }
);
