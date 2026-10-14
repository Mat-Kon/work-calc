import { forwardRef } from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  optionValues: string[];
  hasDisable: boolean;
}

export const CustomSelect = forwardRef<HTMLSelectElement, Props>(
  function CustomSelect({ name, id, optionValues, hasDisable, ...props }, ref) {
    return (
      <select name={name} id={id} {...props} ref={ref}>
        {optionValues.map((value, index) => {
          if (hasDisable && index === 0) {
            return (
              <option key={index} value={value} disabled>
                {value}
              </option>
            );
          }
          return (
            <option key={index} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    );
  },
);
