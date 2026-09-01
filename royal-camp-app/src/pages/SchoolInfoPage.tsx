import Header from "../components/Header";
import { getSchoolInfo } from "../lib/storage";

export default function SchoolInfoPage() {
  const info = getSchoolInfo();

  return (
    <div className="app-shell flex flex-col">
      <Header title="학교정보" showBack />
      <div className="p-4 space-y-3">
        <div className="bg-bg-light rounded-2xl p-4">
          <p className="text-text-dark text-sm font-medium mb-1">학교 소개</p>
          <p className="text-text-dark text-sm">{info.introduction}</p>
        </div>
        <div className="bg-bg-light rounded-2xl p-4">
          <p className="text-text-dark text-sm font-medium mb-1">오시는 길</p>
          <p className="text-text-dark text-sm">{info.address}</p>
        </div>
        <div className="bg-bg-light rounded-2xl p-4">
          <p className="text-text-dark text-sm font-medium mb-1">연락처</p>
          <p className="text-text-dark text-sm">
            {info.phone} · {info.email}
          </p>
        </div>
      </div>
    </div>
  );
}
