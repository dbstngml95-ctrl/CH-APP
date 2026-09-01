import { useState } from "react";
import Header from "../../components/Header";
import { getDday, getSchedule, getScheduleBanner } from "../../lib/storage";

function calcDday(targetDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

export default function SchedulePage() {
  const dday = getDday();
  const banner = getScheduleBanner();
  const days = getSchedule();
  const [openDay, setOpenDay] = useState<string | null>(days[0]?.id ?? null);
  const diff = calcDday(dday.targetDate);

  return (
    <div className="app-shell flex flex-col">
      <Header title="일정표" showBack backTo="/guidebook" />
      <div className="p-4 space-y-3">
        <div className="bg-main-dark rounded-2xl p-5 text-center">
          <p className="text-white text-xs">{dday.label}</p>
          <p className="text-point-yellow text-3xl font-medium mt-1">
            {diff === 0 ? "D-Day" : diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`}
          </p>
        </div>

        {banner && (
          <div className="bg-point-yellow rounded-xl p-3">
            <p className="text-[#412402] text-xs">{banner.content}</p>
          </div>
        )}

        {days.map((day) => (
          <div key={day.id} className="bg-bg-light rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenDay(openDay === day.id ? null : day.id)}
              className="w-full flex items-center justify-between p-3"
            >
              <span className="text-text-dark text-sm font-medium">{day.dayLabel}</span>
              <span className="text-text-dark text-xs">{openDay === day.id ? "▲" : "▼"}</span>
            </button>
            {openDay === day.id && (
              <div className="px-3 pb-3 space-y-2">
                {day.items.map((item, i) => (
                  <div key={i} className="text-text-dark text-xs">
                    {item.time} {item.activity} · {item.location}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
