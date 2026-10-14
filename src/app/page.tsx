import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { OrderColumn, getOrders } from "@/entities/order";
import { auth } from "@/auth";

import st from "./page.module.scss";

export const metadata: Metadata = {
  title: "Главная",
};

export default async function MainPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const orders = await getOrders({ userId: session.user.id });

  const queued = orders.filter((o) => o.status === "QUEUED");
  const inProgress = orders.filter((o) => o.status === "IN_PROGRESS");
  const done = orders.filter((o) => o.status === "DONE");

  return (
    <div className={st.wrap}>
      <header className={st.head}>
        <h1 className={st.title}>Заказы</h1>
        <p className={st.subtitle}>Всего {orders.length}</p>
      </header>

      <div className={st.board}>
        <OrderColumn status="QUEUED" title="В очереди" orders={queued} />
        <OrderColumn
          status="IN_PROGRESS"
          title="В работе"
          orders={inProgress}
        />
        <OrderColumn status="DONE" title="Завершённые" orders={done} />
      </div>
    </div>
  );
}
