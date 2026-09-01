import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ITEMS = [
  { label: "일정표", to: "/guidebook/schedule", icon: "📅" },
  { label: "규칙", to: "/guidebook/rules", icon: "📋" },
  { label: "캠프 개요", to: "/guidebook/overview", icon: "ℹ️" },
  { label: "로열캠프 비밀 유지 계약서", to: "/guidebook/agreement", icon: "📄" },
];

export default function GuidebookPage() {
  const navigate = useNavigate();

  return (
    <div className="app-shell flex flex-col">
      <Header title="가이드북" showBack />
      <div className="flex-1">
        {ITEMS.map((item) => (
          <button
            key={item.to}
            onClick={() => navigate(item.to)}
            className="w-full flex items-center justify-between p-4 border-b border-line-light"
          >
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true">{item.icon}</span>
              <span className="text-text-dark text-sm">{item.label}</span>
            </div>
            <span className="text-text-dark text-sm">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
