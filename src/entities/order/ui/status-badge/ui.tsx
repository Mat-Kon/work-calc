import { type OrderStatus } from "@/shared/types/calculate";

import st from "./index.module.scss";

interface StatusBadgeProps {
  status: OrderStatus;
}

const LABELS: Record<OrderStatus, string> = {
  QUEUED: "В очереди",
  IN_PROGRESS: "В работе",
  DONE: "Завершён",
};

const CLASS: Record<OrderStatus, string> = {
  QUEUED: st.queued,
  IN_PROGRESS: st.inProgress,
  DONE: st.done,
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${st.badge} ${CLASS[status]}`}>{LABELS[status]}</span>
  );
}
