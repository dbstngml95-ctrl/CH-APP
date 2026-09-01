import { useState } from "react";
import { useAdminAuth } from "../../lib/adminAuth";
import AdminNoticesTab from "./AdminNoticesTab";
import AdminScheduleTab from "./AdminScheduleTab";
import AdminRosterTab from "./AdminRosterTab";
import { AdminDdayTab, AdminGuidebookTab, AdminSchoolInfoTab } from "./AdminSettingsTabs";

const TABS = [
  { key: "notices", label: "공지사항 관리" },
  { key: "dday", label: "디데이 설정" },
  { key: "schedule", label: "일정표 관리" },
  { key: "roster", label: "학생 명단 관리" },
  { key: "schoolInfo", label: "학교정보 관리" },
  { key: "guidebook", label: "가이드북 관리" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AdminDashboardPage() {
  const { logout } = useAdminAuth();
  const [tab, setTab] = useState<TabKey>("notices");

  function renderTab() {
    switch (tab) {
      case "notices":
        return <AdminNoticesTab />;
      case "dday":
        return <AdminDdayTab />;
      case "schedule":
        return <AdminScheduleTab />;
      case "roster":
        return <AdminRosterTab />;
      case "schoolInfo":
        return <AdminSchoolInfoTab />;
      case "guidebook":
        return <AdminGuidebookTab />;
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      <aside className="w-56 bg-bg-light p-4 flex flex-col">
        <p className="text-main-dark font-medium text-sm mb-6 px-2">로열캠프 알리미 관리자</p>
        <nav className="flex-1 space-y-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                tab === t.key ? "bg-main-dark text-white" : "text-text-dark hover:bg-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <button
          onClick={logout}
          className="w-full h-10 rounded-lg border border-line-light text-text-dark text-sm mt-4"
        >
          로그아웃
        </button>
      </aside>
      <main className="flex-1 p-8">{renderTab()}</main>
    </div>
  );
}
