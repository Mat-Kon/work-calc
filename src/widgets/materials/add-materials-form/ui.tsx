"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { catalogApi } from "@/shared/api";
import { BaseBtn } from "@/shared/buttons/base";
import { TextInput } from "@/shared/inputs";
import { PopupWrapper } from "@/shared/popups";
import { SelectMeasure } from "@/shared/select-measure";
import { type MaterialItemData } from "@/shared/types/materials";

import st from "./index.module.scss";
import { type FormDataAddMaterial, schemaAddMaterialForm } from "./model";

interface AddMaterialFormProps {
  isOpen: boolean;
  onClose: () => void;
  materialItem: MaterialItemData | null;
}

export function AddMaterialForm({
  isOpen,
  materialItem,
  onClose,
}: AddMaterialFormProps) {
  const btnName = materialItem ? "Изменить" : "Добавить";
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAddMaterial>({
    resolver: yupResolver(schemaAddMaterialForm),
    defaultValues: {
      name: materialItem?.name ?? "",
      costPerUnit: materialItem?.costPerUnit ?? 0,
    },
  });

  const onSubmit = async (data: FormDataAddMaterial) => {
    try {
      if (materialItem) {
        await catalogApi.update(materialItem.id, data);
      } else {
        await catalogApi.add("MATERIAL", data);
      }
      onClose();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Не удалось сохранить");
    }
  };

  return (
    <PopupWrapper isOpen={isOpen} onClose={onClose}>
      <div className={st.wrapCloseBtn}>
        <BaseBtn text="Закрыть" variant="ghost" onClick={onClose} />
      </div>
      <form className={st.addService} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="Название материала"
          id="name"
          {...register("name")}
          className={`${st.serviceInput} ${errors.name ? st.error : ""}`}
        />

        <SelectMeasure id="typeValue" {...register("typeValue")} />

        <TextInput
          type="number"
          step="any"
          {...register("costPerUnit", { required: true })}
          className={`${st.serviceInput} ${errors.costPerUnit ? st.error : ""}`}
        />

        {submitError ? <p role="alert">{submitError}</p> : null}

        <BaseBtn text={btnName} type="submit" />
      </form>
    </PopupWrapper>
  );
}
