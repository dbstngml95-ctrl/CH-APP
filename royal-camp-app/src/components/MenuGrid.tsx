import { useNavigate } from "react-router-dom";

const MENU = [
  { label: "내 정보", to: "/my-info", icon: "👤" },
  { label: "학교정보", to: "/school-info", icon: "🎓" },
  { label: "공지사항", to: "/notices", icon: "🔔" },
  { label: "가이드북", to: "/guidebook", icon: "📖" },
];

export default function MenuGrid({ hasUnreadNotice }: { hasUnreadNotice?: boolean }) {
  const navigate = useNavigate();

  return (
    <div className="bg-bg-light p-4 grid grid-cols-2 gap-3 flex-1">
      {MENU.map((item) => (
        <button
          key={item.to}
          onClick={() => navigate(item.to)}
          className="relative bg-white rounded-2xl py-6 flex flex-col items-center gap-2 shadow-sm"
        >
          {item.label === "공지사항" && hasUnreadNotice && (
            <span className="absolute top-3 right-8 w-2 h-2 rounded-full bg-red-500" />
          )}
          <span className="text-2xl" aria-hidden="true">
            {item.icon}
          </span>
          <span className="text-text-dark text-sm">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
