"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { catalogApi } from "@/shared/api";
import { BaseBtn } from "@/shared/buttons/base";
import { TextInput } from "@/shared/inputs";
import { PopupWrapper } from "@/shared/popups";
import { SelectMeasure } from "@/shared/select-measure";
import { type ServiceItemData } from "@/shared/types/my-services";

import st from "./index.module.scss";
import { type FormDataAddMyServiceForm, schemaAddServiceForm } from "./model";

interface AddMyServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  serviceItem: ServiceItemData | null;
}

export function AddMyServiceForm({
  isOpen,
  onClose,
  serviceItem,
}: AddMyServiceFormProps) {
  const btnName = serviceItem ? "Изменить" : "Добавить";
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAddMyServiceForm>({
    resolver: yupResolver(schemaAddServiceForm),
    defaultValues: {
      name: serviceItem?.name ?? "",
      costPerUnit: serviceItem?.costPerUnit ?? 0,
    },
  });

  const onSubmit = async (data: FormDataAddMyServiceForm) => {
    try {
      if (serviceItem) {
        await catalogApi.update(serviceItem.id, data);
      } else {
        await catalogApi.add("SERVICE", data);
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
          placeholder="Название услуги"
          id="nameService"
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
