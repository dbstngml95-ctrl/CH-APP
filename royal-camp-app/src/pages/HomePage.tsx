import Header from "../components/Header";
import MenuGrid from "../components/MenuGrid";
import { getNotices } from "../lib/storage";

export default function HomePage() {
  const hasUnread = getNotices().length > 0;

  return (
    <div className="app-shell flex flex-col" style={{ minHeight: "100vh" }}>
      <Header title="로열캠프 알리미" />
      <MenuGrid hasUnreadNotice={hasUnread} />
    </div>
  );
}
