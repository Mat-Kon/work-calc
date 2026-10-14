import { type LinkData } from "@/shared/types/header";

export const linksMap = [
  { link: "/calculate", label: "Рассчитать" },
  { link: "/orders", label: "Заказы" },
  { link: "/services", label: "Услуги" },
  { link: "/materials", label: "Материалы" },
] as const satisfies readonly LinkData[];

export type HeaderLink = (typeof linksMap)[number]["link"];
