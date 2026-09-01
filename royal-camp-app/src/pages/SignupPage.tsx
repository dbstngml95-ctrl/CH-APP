import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentAuth } from "../lib/auth";
import Header from "../components/Header";

export default function SignupPage() {
  const { signup } = useStudentAuth();
  const navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!studentNumber.trim() || !password.trim() || !name.trim() || !phone.trim()) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }

    const result = signup({
      studentNumber: studentNumber.trim(),
      password,
      name: name.trim(),
      phone: phone.trim(),
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    navigate("/home");
  }

  return (
    <div className="app-shell flex flex-col">
      <Header title="회원가입" showBack backTo="/login" />
      <form onSubmit={handleSubmit} className="p-6 flex-1">
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
          className="w-full h-10 rounded-lg bg-bg-light px-3 text-sm text-text-dark outline-none mb-4"
        />
        <label className="block text-text-dark text-xs mb-1">이름</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-10 rounded-lg bg-bg-light px-3 text-sm text-text-dark outline-none mb-4"
        />
        <label className="block text-text-dark text-xs mb-1">휴대폰번호</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full h-10 rounded-lg bg-bg-light px-3 text-sm text-text-dark outline-none mb-2"
        />
        {error && <p className="text-red-600 text-xs mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full h-11 rounded-xl bg-main-dark text-white text-sm font-medium mt-4"
        >
          가입 완료
        </button>
      </form>
    </div>
  );
}
