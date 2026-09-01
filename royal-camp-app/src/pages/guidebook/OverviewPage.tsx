import Header from "../../components/Header";
import { getGuidebook } from "../../lib/storage";

export default function OverviewPage() {
  const { overview } = getGuidebook();
  const rows = [
    { label: "기간", value: overview.period },
    { label: "장소", value: overview.location },
    { label: "대상", value: overview.target },
    { label: "주최", value: overview.host },
  ];

  return (
    <div className="app-shell flex flex-col">
      <Header title="캠프 개요" showBack backTo="/guidebook" />
      <div className="p-4">
        <div className="bg-bg-light rounded-2xl p-4 divide-y divide-line-light">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between py-2 text-sm">
              <span className="text-point-blue">{row.label}</span>
              <span className="text-text-dark">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
