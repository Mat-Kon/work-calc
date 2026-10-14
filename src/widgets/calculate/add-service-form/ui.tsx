"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { CalcSelect } from "@/features/calculate";
import { catalogApi } from "@/shared/api";
import { BaseBtn } from "@/shared/buttons/base";
import { TextInput } from "@/shared/inputs";
import { PopupWrapper } from "@/shared/popups";
import {
  type CalcItem,
  type ItemKind,
  type ItemData,
} from "@/shared/types/calculate";

import st from "./index.module.scss";
import {
  addServiceItem,
  type FormDataAddServiceCalc,
  schemaAddServiceForm,
  updateServiceItem,
} from "./model";

interface AddServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  serviceItem: CalcItem | null;
}

export function AddServicePopup({
  isOpen,
  onClose,
  serviceItem,
}: AddServicePopupProps) {
  const [services, setServices] = useState<ItemData[]>([]);
  const [materials, setMaterials] = useState<ItemData[]>([]);

  const names = [...services, ...materials].map((item) => item.name);
  const btnName = serviceItem ? "Обновить" : "Добавить";
  const hasServices = services.length > 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAddServiceCalc>({
    resolver: yupResolver(schemaAddServiceForm),
    defaultValues: {
      count: serviceItem?.count ?? 0,
      name: serviceItem?.name ?? "",
    },
  });

  useEffect(() => {
    let cancelled = false;

    Promise.all([catalogApi.list("SERVICE"), catalogApi.list("MATERIAL")])
      .then(([serviceList, materialList]) => {
        if (cancelled) return;
        setServices(serviceList);
        setMaterials(materialList);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const onSubmit = (data: FormDataAddServiceCalc) => {
    const service = services.find((item) => item.name === data.name);
    const material = materials.find((item) => item.name === data.name);
    const source = service ?? material;
    const kind: ItemKind = service ? "SERVICE" : "MATERIAL";
    const costPerUnit = source?.costPerUnit ?? 0;
    const typeValue = source?.typeValue ?? "";
    const cost = Math.round(data.count * costPerUnit * 100) / 100;

    const payload: CalcItem = {
      ...data,
      id: serviceItem?.id ?? uuidv4(),
      costPerUnit,
      cost,
      typeValue,
      kind,
    };

    if (serviceItem) {
      updateServiceItem(payload);
    } else {
      addServiceItem(payload);
    }

    onClose();
  };

  return (
    <PopupWrapper isOpen={isOpen}>
      <div className={st.wrapCloseBtn}>
        <BaseBtn text="Закрыть" onClick={onClose} />
      </div>

      {hasServices ? (
        <form className={st.addService} onSubmit={handleSubmit(onSubmit)}>
          <CalcSelect
            id="typeService"
            optionValues={names}
            {...register("name")}
          />

          <TextInput
            type="number"
            step="any"
            className={`${st.serviceValue} ${errors.count ? st.error : ""}`}
            {...register("count", { required: true })}
          />

          <BaseBtn text={btnName} type="submit" />
        </form>
      ) : (
        <p>Добавьте хотя бы одну услугу в &quot;Мои услуги&quot;</p>
      )}
    </PopupWrapper>
  );
}
