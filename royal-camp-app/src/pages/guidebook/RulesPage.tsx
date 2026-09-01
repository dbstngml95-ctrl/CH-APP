import Header from "../../components/Header";
import { getGuidebook } from "../../lib/storage";

export default function RulesPage() {
  const { rules } = getGuidebook();

  return (
    <div className="app-shell flex flex-col">
      <Header title="규칙" showBack backTo="/guidebook" />
      <div className="p-4">
        <p className="text-text-dark text-sm leading-relaxed whitespace-pre-line">{rules}</p>
      </div>
    </div>
  );
}
