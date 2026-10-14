"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ordersApi, toInputValue, toIso } from "@/shared/api";
import { TextInput } from "@/shared/inputs";
import { getCalcList, removeCalcList } from "@/shared/helpers/functions";
import { type Order, type OrderInput } from "@/shared/types/calculate";

import st from "./index.module.scss";
import { type FormDataAddOrder, schemaAddOrderForm } from "./model";

interface AddOrderFormProps {
  order?: Order | null;
}

export const AddOrderForm = forwardRef<HTMLFormElement, AddOrderFormProps>(
  ({ order }, ref) => {
    const { replace } = useRouter();
    const [submitError, setSubmitError] = useState("");
    const [isSaving, setSaving] = useState(false);

    const {
      formState: { errors },
      handleSubmit,
      register,
      reset,
    } = useForm<FormDataAddOrder>({
      resolver: yupResolver(schemaAddOrderForm),
    });

    useEffect(() => {
      if (!order) return;

      const { id: _id, items: _items, ...orderData } = order;

      reset({
        ...orderData,
        orderNumber: orderData.orderNumber ?? "",
        startWorkDate: toInputValue(orderData.startWorkDate),
        meetingDateTime: toInputValue(orderData.meetingDateTime),
      });
    }, [order, reset]);

    const onSubmit = async (formData: FormDataAddOrder) => {
      if (isSaving) return;

      const items = getCalcList() ?? [];

      if (items.length === 0) {
        setSubmitError("Добавьте хотя бы одну позицию в расчёт");
        return;
      }

      const payload: OrderInput = {
        orderNumber: formData.orderNumber ?? "",
        name: formData.name,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        meetingDateTime: toIso(formData.meetingDateTime),
        startWorkDate: toIso(formData.startWorkDate),
        items: items.map(({ kind, name, typeValue, costPerUnit, count }) => ({
          kind,
          name,
          typeValue,
          costPerUnit,
          count,
        })),
      };

      setSaving(true);
      setSubmitError("");

      try {
        const saved = order
          ? await ordersApi.update(order.id, payload)
          : await ordersApi.create(payload);

        removeCalcList();
        replace(`/orders/${saved.id}`);
      } catch (e) {
        setSubmitError(
          e instanceof Error ? e.message : "Не удалось сохранить заказ",
        );
        setSaving(false);
      }
    };

    return (
      <form
        className={st.orderForm}
        onSubmit={handleSubmit(onSubmit)}
        ref={ref}
      >
        <TextInput
          placeholder="Номер договора"
          className={`${st.textInput} ${errors.orderNumber ? st.error : ""}`}
          {...register("orderNumber")}
        />
        <TextInput
          placeholder="ФИО"
          className={`${st.textInput} ${errors.name ? st.error : ""}`}
          {...register("name")}
        />
        <TextInput
          placeholder="Адрес"
          className={`${st.textInput} ${errors.address ? st.error : ""}`}
          {...register("address")}
        />
        <TextInput
          placeholder="Номер телефона"
          className={`${st.textInput} ${errors.phoneNumber ? st.error : ""}`}
          {...register("phoneNumber")}
        />

        <label className={st.dateLabel}>
          Замер на
          <TextInput type="datetime-local" {...register("meetingDateTime")} />
        </label>

        <label className={st.dateLabel}>
          Начало работ на
          <TextInput type="datetime-local" {...register("startWorkDate")} />
        </label>

        {submitError ? (
          <p className={st.errorText} role="alert">
            {submitError}
          </p>
        ) : null}
      </form>
    );
  },
);

AddOrderForm.displayName = "AddOrderForm";
