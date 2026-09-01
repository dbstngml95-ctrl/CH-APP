import { useState } from "react";
import Header from "../components/Header";
import { getNotices } from "../lib/storage";
import { Notice } from "../types";

export default function NoticesPage() {
  const [notices] = useState<Notice[]>(getNotices());
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="app-shell flex flex-col">
      <Header title="공지사항" showBack />
      <div className="p-4 space-y-3">
        {notices.length === 0 && (
          <p className="text-text-dark text-sm text-center py-10">등록된 공지사항이 없어요.</p>
        )}
        {notices.map((n) => (
          <div
            key={n.id}
            onClick={() => setOpenId(openId === n.id ? null : n.id)}
            className="bg-white border border-line-light rounded-2xl p-4 cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              {n.isImportant && (
                <span className="bg-point-yellow text-[#412402] text-[11px] px-2 py-0.5 rounded-full">
                  중요
                </span>
              )}
              <span className="text-text-dark text-sm font-medium">{n.title}</span>
            </div>
            <p className={`text-text-dark text-xs ${openId === n.id ? "" : "line-clamp-2"}`}>
              {n.content}
            </p>
            <p className="text-gray-400 text-[11px] mt-2">
              {new Date(n.createdAt).toLocaleDateString("ko-KR")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
