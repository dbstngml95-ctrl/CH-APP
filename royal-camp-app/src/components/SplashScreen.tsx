import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), 1200);
    const doneTimer = setTimeout(onDone, 1600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 bg-main-dark flex flex-col items-center justify-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={`${import.meta.env.BASE_URL}icon-192.png`}
        alt=""
        className="w-16 h-16 rounded-2xl object-cover mb-4"
        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
      />
      <p className="text-white text-lg font-medium text-center leading-relaxed">
        청담국제고등학교
        <br />
        로열캠프
      </p>
      <p className="text-point-yellow text-sm mt-3">로열캠프 알리미</p>
    </div>
  );
}
