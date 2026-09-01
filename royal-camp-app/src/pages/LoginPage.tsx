import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentAuth } from "../lib/auth";
import { useAdminAuth } from "../lib/adminAuth";
import Header from "../components/Header";

export default function LoginPage() {
  const { login } = useStudentAuth();
  const { login: adminLogin } = useAdminAuth();
  const navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (adminLogin(studentNumber.trim(), password)) {
      navigate("/admin");
      return;
    }
    const result = login(studentNumber.trim(), password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/home");
  }

  return (
    <div className="app-shell flex flex-col">
      <Header title="로열캠프 알리미" />
      <div className="p-6 flex-1">
        {showForgot ? (
          <div className="text-center py-10">
            <p className="text-text-dark text-sm leading-relaxed">
              비밀번호는 학생이 직접 재설정할 수 없어요.
              <br />
              선생님(관리자)에게 문의해 주세요.
            </p>
            <button
              onClick={() => setShowForgot(false)}
              className="mt-6 w-full h-10 rounded-lg bg-bg-light text-point-blue text-sm"
            >
              돌아가기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block text-text-dark text-xs mb-1">아이디</label>
            <input
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              className="w-full h-10 rounded-lg bg-bg-light px-3 text-sm text-text-dark outline-none mb-4"
            />
            <label className="block text-text-dark text-xs mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 rounded-lg bg-bg-light px-3 text-sm text-text-dark outline-none mb-2"
            />
            {error && <p className="text-red-600 text-xs mb-2">{error}</p>}
            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-main-dark text-white text-sm font-medium mt-2"
            >
              로그인
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-text-dark text-xs"
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-point-blue text-sm"
              >
                회원가입
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
