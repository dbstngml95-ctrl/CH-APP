import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import { useStudentAuth } from "../../lib/auth";
import { getAgreement, getGuidebook, saveAgreement } from "../../lib/storage";

export default function AgreementPage() {
  const { student } = useStudentAuth();
  const { agreement: agreementText } = getGuidebook();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const existing = student ? getAgreement(student.uid) : undefined;
  const [signed, setSigned] = useState(!!existing?.signed);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    let drawing = false;

    function pos(e: MouseEvent | TouchEvent) {
      const rect = canvas!.getBoundingClientRect();
      const point = "touches" in e ? e.touches[0] : e;
      return {
        x: ((point.clientX - rect.left) * canvas!.width) / rect.width,
        y: ((point.clientY - rect.top) * canvas!.height) / rect.height,
      };
    }
    function start(e: MouseEvent | TouchEvent) {
      drawing = true;
      setHasDrawing(true);
      const p = pos(e);
      ctx!.beginPath();
      ctx!.moveTo(p.x, p.y);
      e.preventDefault();
    }
    function move(e: MouseEvent | TouchEvent) {
      if (!drawing) return;
      const p = pos(e);
      ctx!.lineTo(p.x, p.y);
      ctx!.stroke();
      e.preventDefault();
    }
    function end() {
      drawing = false;
    }

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", move);
    canvas.addEventListener("touchend", end);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", move);
      canvas.removeEventListener("touchend", end);
    };
  }, []);

  function handleClear() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
    setHasDrawing(false);
  }

  function handleSubmit() {
    if (!hasDrawing || !agreed) {
      setError("서명을 입력하고 동의에 체크해 주세요.");
      return;
    }
    if (!student) return;
    const dataUrl = canvasRef.current!.toDataURL();
    saveAgreement(student.uid, {
      signed: true,
      signatureDataUrl: dataUrl,
      signedAt: new Date().toISOString(),
    });
    setSigned(true);
    setError("");
  }

  if (signed) {
    return (
      <div className="app-shell flex flex-col">
        <Header title="비밀 유지 계약서" showBack backTo="/guidebook" />
        <div className="p-4">
          <div className="bg-bg-light rounded-xl p-3 text-center text-sm text-point-blue mb-4">
            {new Date(existing?.signedAt ?? Date.now()).toLocaleDateString("ko-KR")} 서명 완료
          </div>
          <p className="text-text-dark text-xs leading-relaxed whitespace-pre-line">
            {agreementText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell flex flex-col">
      <Header title="비밀 유지 계약서" showBack backTo="/guidebook" />
      <div className="p-4">
        <div className="border border-line-light rounded-2xl p-4">
          <p className="text-text-dark text-xs leading-relaxed whitespace-pre-line">
            {agreementText}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 mb-2">
          <span className="text-text-dark text-sm font-medium">
            서명 <span className="text-red-500">*</span>
          </span>
          <button onClick={handleClear} className="text-gray-400 text-xs">
            삭제
          </button>
        </div>
        <div className="border border-line-light rounded-xl">
          <canvas ref={canvasRef} width={320} height={130} className="w-full touch-none" />
        </div>

        <label className="flex items-center gap-2 text-text-dark text-xs mt-4">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          서명 및 날짜를 문서에 적용하는 데 동의합니다.
        </label>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full h-12 rounded-xl bg-main-dark text-white text-sm font-medium mt-4"
        >
          서명 완료
        </button>
      </div>
    </div>
  );
}
