import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useStudentAuth } from "../lib/auth";
import { updateStudent } from "../lib/storage";

export default function MyInfoPage() {
  const { student, refresh, logout } = useStudentAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(student?.name ?? "");
  const [phone, setPhone] = useState(student?.phone ?? "");

  if (!student) return null;

  function handleSave() {
    updateStudent(student!.uid, { name, phone });
    refresh();
    setEditing(false);
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app-shell flex flex-col">
      <Header title="내 정보" showBack />
      <div className="p-4 flex-1">
        <div className="bg-bg-light rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full bg-point-blue text-white flex items-center justify-center text-sm">
              {student.name.charAt(0)}
            </div>
            <div>
              {editing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-sm text-text-dark bg-white rounded px-2 py-1"
                />
              ) : (
                <p className="text-text-dark text-sm font-medium">{student.name}</p>
              )}
              <p className="text-text-dark text-xs mt-0.5">아이디 {student.studentNumber}</p>
            </div>
          </div>
          <div className="border-t border-line-light pt-3 text-sm text-text-dark">
            {editing ? (
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-sm text-text-dark bg-white rounded px-2 py-1 w-full"
              />
            ) : (
              <span>{student.phone}</span>
            )}
          </div>
        </div>

        {editing ? (
          <button
            onClick={handleSave}
            className="w-full mt-4 h-10 rounded-xl bg-main-dark text-white text-sm"
          >
            저장
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="w-full mt-4 h-10 rounded-xl bg-point-blue text-white text-sm"
          >
            정보 수정
          </button>
        )}

        <button
          onClick={handleLogout}
          className="w-full mt-3 h-10 rounded-xl bg-white border border-line-light text-text-dark text-sm"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
