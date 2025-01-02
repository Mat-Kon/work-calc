import { forwardRef } from 'react';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  id: string;
}

type Ref = HTMLSelectElement;

const MEASURES = ['м2', 'пог.м', 'за услугу', 'за штуку'];

export const SelectMeasure: React.FC<Props> = forwardRef<Ref, Props>(
  ({ name, id, ...props }, ref) => {
    return (
      <select name={name} id={id} {...props} ref={ref}>
        {MEASURES.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  }
);
