// src/layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";
import { Cabecalho } from "../Cabecalho/Cabecalho";
import { SideBar } from "../SideBar/SideBar";

export function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <header className="dashboard-layout__header">
        <Cabecalho />
      </header>

      <aside className="dashboard-layout__sidebar">
        <SideBar />
      </aside>

      <main className="dashboard-layout__main">
        <Outlet />
      </main>
    </div>
  );
}
