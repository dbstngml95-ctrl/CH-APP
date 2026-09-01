import { FormEvent, useState } from "react";
import { addNotice, deleteNotice, getNotices } from "../../lib/storage";
import { Notice } from "../../types";

export default function AdminNoticesTab() {
  const [notices, setNotices] = useState<Notice[]>(getNotices());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [screen, setScreen] = useState<"general" | "schedule">("general");

  function refresh() {
    setNotices(getNotices());
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    addNotice({ title: title.trim(), content: content.trim(), isImportant, screen });
    setTitle("");
    setContent("");
    setIsImportant(false);
    setScreen("general");
    refresh();
  }

  return (
    <div>
      <h2 className="text-main-dark font-medium mb-4">공지사항 관리</h2>
      <form onSubmit={handleSubmit} className="bg-bg-light rounded-xl p-4 mb-6 space-y-2 max-w-md">
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-9 px-3 rounded-lg border border-line-light text-sm"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-20 px-3 py-2 rounded-lg border border-line-light text-sm"
        />
        <div className="flex items-center gap-4 text-sm text-text-dark">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
            />
            중요
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={screen === "general"}
              onChange={() => setScreen("general")}
            />
            일반 공지사항
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={screen === "schedule"}
              onChange={() => setScreen("schedule")}
            />
            일정표 화면 전용
          </label>
        </div>
        <button type="submit" className="h-9 px-4 rounded-lg bg-main-dark text-white text-sm">
          등록
        </button>
      </form>

      <div className="space-y-2 max-w-md">
        {notices.map((n) => (
          <div key={n.id} className="border border-line-light rounded-lg p-3 flex justify-between items-start">
            <div>
              <p className="text-sm text-text-dark font-medium">
                {n.isImportant && "🌟 "}
                {n.title}{" "}
                <span className="text-xs text-gray-400">
                  ({n.screen === "schedule" ? "일정표 전용" : "일반"})
                </span>
              </p>
              <p className="text-xs text-text-dark mt-1">{n.content}</p>
            </div>
            <button
              onClick={() => {
                deleteNotice(n.id);
                refresh();
              }}
              className="text-red-500 text-xs"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
