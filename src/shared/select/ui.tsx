import { forwardRef, type SelectHTMLAttributes } from "react";

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  optionValues: string[];
  hasDisable: boolean;
}

export const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>(
  function CustomSelect({ name, id, optionValues, hasDisable, ...props }, ref) {
    return (
      <select name={name} id={id} {...props} ref={ref}>
        {optionValues.map((value, index) => {
          if (hasDisable && index === 0) {
            return (
              <option key={value} value={value} disabled>
                {value}
              </option>
            );
          }
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    );
  },
);

CustomSelect.displayName = "CustomSelect";
