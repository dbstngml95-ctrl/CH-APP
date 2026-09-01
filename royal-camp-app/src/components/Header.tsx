import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  backTo?: string;
}

export default function Header({ title, showBack, backTo = "/home" }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="h-[52px] bg-main-dark flex items-center gap-3 px-4 flex-shrink-0">
      {showBack && (
        <button
          aria-label="뒤로가기"
          onClick={() => navigate(backTo)}
          className="text-white text-lg leading-none"
        >
          &#8592;
        </button>
      )}
      <span className="text-white text-[15px] font-medium">{title}</span>
    </div>
  );
}
