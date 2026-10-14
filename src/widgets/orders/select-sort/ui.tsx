"use client";

import { type ChangeEvent } from "react";

import { DEFAULT_SORT, SORT_OPTIONS } from "@/features/orders/model";
import { CustomSelect } from "@/shared/select";

import st from "./index.module.scss";

interface SelectSortProps {
  onChange: (value: string) => void;
  defaultValue?: string;
}

export function SelectSort({
  onChange,
  defaultValue = DEFAULT_SORT,
}: SelectSortProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <CustomSelect
      className={st.sort}
      optionValues={[...SORT_OPTIONS]}
      defaultValue={defaultValue}
      hasDisable
      onChange={handleChange}
    />
  );
}
