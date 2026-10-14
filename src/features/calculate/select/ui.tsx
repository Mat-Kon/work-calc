import { forwardRef, type SelectHTMLAttributes } from 'react';

import st from './index.module.scss';

interface CalcSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  optionValues: string[];
}

export const CalcSelect = forwardRef<HTMLSelectElement, CalcSelectProps>(
  function CalcSelect({ id, optionValues, className, ...props }, ref) {
    return (
      <select
        ref={ref}
        id={id}
        className={[st.select, className].filter(Boolean).join(' ')}
        {...props}
      >
        {optionValues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  },
);

CalcSelect.displayName = 'CalcSelect';