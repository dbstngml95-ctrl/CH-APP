import { useState } from "react";
import { getSchedule, setSchedule } from "../../lib/storage";
import { ScheduleDay } from "../../types";

export default function AdminScheduleTab() {
  const [days, setDays] = useState<ScheduleDay[]>(getSchedule());

  function persist(next: ScheduleDay[]) {
    setDays(next);
    setSchedule(next);
  }

  function addDay() {
    persist([...days, { id: crypto.randomUUID(), dayLabel: `${days.length + 1}일차`, items: [] }]);
  }

  function removeDay(id: string) {
    persist(days.filter((d) => d.id !== id));
  }

  function addItem(dayId: string) {
    persist(
      days.map((d) =>
        d.id === dayId
          ? { ...d, items: [...d.items, { time: "09:00", activity: "", location: "" }] }
          : d
      )
    );
  }

  function updateItem(dayId: string, index: number, patch: Partial<ScheduleDay["items"][0]>) {
    persist(
      days.map((d) =>
        d.id === dayId
          ? { ...d, items: d.items.map((it, i) => (i === index ? { ...it, ...patch } : it)) }
          : d
      )
    );
  }

  function removeItem(dayId: string, index: number) {
    persist(
      days.map((d) => (d.id === dayId ? { ...d, items: d.items.filter((_, i) => i !== index) } : d))
    );
  }

  return (
    <div>
      <h2 className="text-main-dark font-medium mb-4">일정표 관리</h2>
      <div className="space-y-4 max-w-lg">
        {days.map((day) => (
          <div key={day.id} className="border border-line-light rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <input
                value={day.dayLabel}
                onChange={(e) => persist(days.map((d) => (d.id === day.id ? { ...d, dayLabel: e.target.value } : d)))}
                className="text-sm font-medium text-text-dark border-b border-line-light outline-none"
              />
              <button onClick={() => removeDay(day.id)} className="text-red-500 text-xs">
                일차 삭제
              </button>
            </div>
            {day.items.map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={item.time}
                  onChange={(e) => updateItem(day.id, i, { time: e.target.value })}
                  className="w-16 text-xs border border-line-light rounded px-1"
                />
                <input
                  value={item.activity}
                  placeholder="활동"
                  onChange={(e) => updateItem(day.id, i, { activity: e.target.value })}
                  className="flex-1 text-xs border border-line-light rounded px-1"
                />
                <input
                  value={item.location}
                  placeholder="장소"
                  onChange={(e) => updateItem(day.id, i, { location: e.target.value })}
                  className="flex-1 text-xs border border-line-light rounded px-1"
                />
                <button onClick={() => removeItem(day.id, i)} className="text-red-500 text-xs">
                  ×
                </button>
              </div>
            ))}
            <button onClick={() => addItem(day.id)} className="text-point-blue text-xs">
              + 세부 일정 추가
            </button>
          </div>
        ))}
        <button onClick={addDay} className="h-9 px-4 rounded-lg bg-bg-light text-point-blue text-sm">
          + 일차 추가
        </button>
      </div>
    </div>
  );
}
