import { useState } from "react";
import { getDday, getGuidebook, getSchoolInfo, setDday, setGuidebook, setSchoolInfo } from "../../lib/storage";

export function AdminDdayTab() {
  const [dday, setDdayState] = useState(getDday());

  function handleSave() {
    setDday(dday);
    alert("디데이 설정이 저장되었습니다.");
  }

  return (
    <div className="max-w-sm">
      <h2 className="text-main-dark font-medium mb-4">디데이 설정</h2>
      <label className="block text-xs text-text-dark mb-1">목표 날짜</label>
      <input
        type="date"
        value={dday.targetDate}
        onChange={(e) => setDdayState({ ...dday, targetDate: e.target.value })}
        className="w-full h-9 px-3 rounded-lg border border-line-light text-sm mb-3"
      />
      <label className="block text-xs text-text-dark mb-1">문구</label>
      <input
        value={dday.label}
        onChange={(e) => setDdayState({ ...dday, label: e.target.value })}
        className="w-full h-9 px-3 rounded-lg border border-line-light text-sm mb-3"
      />
      <button onClick={handleSave} className="h-9 px-4 rounded-lg bg-main-dark text-white text-sm">
        저장
      </button>
    </div>
  );
}

export function AdminSchoolInfoTab() {
  const [info, setInfo] = useState(getSchoolInfo());

  function handleSave() {
    setSchoolInfo(info);
    alert("학교정보가 저장되었습니다.");
  }

  return (
    <div className="max-w-md space-y-3">
      <h2 className="text-main-dark font-medium mb-1">학교정보 관리</h2>
      <textarea
        value={info.introduction}
        onChange={(e) => setInfo({ ...info, introduction: e.target.value })}
        className="w-full h-20 px-3 py-2 rounded-lg border border-line-light text-sm"
        placeholder="학교 소개"
      />
      <input
        value={info.address}
        onChange={(e) => setInfo({ ...info, address: e.target.value })}
        className="w-full h-9 px-3 rounded-lg border border-line-light text-sm"
        placeholder="주소"
      />
      <input
        value={info.phone}
        onChange={(e) => setInfo({ ...info, phone: e.target.value })}
        className="w-full h-9 px-3 rounded-lg border border-line-light text-sm"
        placeholder="전화번호"
      />
      <input
        value={info.email}
        onChange={(e) => setInfo({ ...info, email: e.target.value })}
        className="w-full h-9 px-3 rounded-lg border border-line-light text-sm"
        placeholder="이메일"
      />
      <button onClick={handleSave} className="h-9 px-4 rounded-lg bg-main-dark text-white text-sm">
        저장
      </button>
    </div>
  );
}

export function AdminGuidebookTab() {
  const [content, setContent] = useState(getGuidebook());

  function handleSave() {
    setGuidebook(content);
    alert("가이드북 내용이 저장되었습니다.");
  }

  return (
    <div className="max-w-md space-y-4">
      <h2 className="text-main-dark font-medium mb-1">가이드북 관리</h2>
      <div>
        <label className="block text-xs text-text-dark mb-1">규칙</label>
        <textarea
          value={content.rules}
          onChange={(e) => setContent({ ...content, rules: e.target.value })}
          className="w-full h-24 px-3 py-2 rounded-lg border border-line-light text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input
          value={content.overview.period}
          onChange={(e) => setContent({ ...content, overview: { ...content.overview, period: e.target.value } })}
          placeholder="기간"
          className="h-9 px-3 rounded-lg border border-line-light text-sm"
        />
        <input
          value={content.overview.location}
          onChange={(e) => setContent({ ...content, overview: { ...content.overview, location: e.target.value } })}
          placeholder="장소"
          className="h-9 px-3 rounded-lg border border-line-light text-sm"
        />
        <input
          value={content.overview.target}
          onChange={(e) => setContent({ ...content, overview: { ...content.overview, target: e.target.value } })}
          placeholder="대상"
          className="h-9 px-3 rounded-lg border border-line-light text-sm"
        />
        <input
          value={content.overview.host}
          onChange={(e) => setContent({ ...content, overview: { ...content.overview, host: e.target.value } })}
          placeholder="주최"
          className="h-9 px-3 rounded-lg border border-line-light text-sm"
        />
      </div>
      <div>
        <label className="block text-xs text-text-dark mb-1">비밀 유지 계약서 전문</label>
        <textarea
          value={content.agreement}
          onChange={(e) => setContent({ ...content, agreement: e.target.value })}
          className="w-full h-28 px-3 py-2 rounded-lg border border-line-light text-sm"
        />
      </div>
      <button onClick={handleSave} className="h-9 px-4 rounded-lg bg-main-dark text-white text-sm">
        저장
      </button>
    </div>
  );
}
