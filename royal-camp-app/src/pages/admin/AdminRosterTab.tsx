import { useState } from "react";
import { deleteStudent, getStudents, resetStudentPassword } from "../../lib/storage";

export default function AdminRosterTab() {
  const [students, setStudents] = useState(getStudents());

  function refresh() {
    setStudents(getStudents());
  }

  function handleResetPassword(studentNumber: string) {
    const newPw = prompt(`${studentNumber}님의 새 비밀번호를 입력하세요.`);
    if (newPw) {
      resetStudentPassword(studentNumber, newPw);
      alert("비밀번호가 초기화되었습니다.");
      refresh();
    }
  }

  function handleDelete(studentNumber: string) {
    if (confirm(`${studentNumber}님을 명단에서 삭제할까요? 해당 계정은 더 이상 로그인할 수 없습니다.`)) {
      deleteStudent(studentNumber);
      refresh();
    }
  }

  return (
    <div>
      <h2 className="text-main-dark font-medium mb-4">학생 명단</h2>

      <table className="text-sm max-w-md w-full">
        <thead>
          <tr className="text-left text-text-dark border-b border-line-light">
            <th className="py-2">아이디</th>
            <th className="py-2">이름</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.uid} className="border-b border-line-light">
              <td className="py-2 text-text-dark">{s.studentNumber}</td>
              <td className="py-2 text-text-dark">{s.name}</td>
              <td className="py-2 whitespace-nowrap">
                <button
                  onClick={() => handleResetPassword(s.studentNumber)}
                  className="text-xs text-red-500"
                >
                  비밀번호 초기화
                </button>
                <button
                  onClick={() => handleDelete(s.studentNumber)}
                  className="text-xs text-red-500 ml-3"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {students.length === 0 && (
        <p className="text-xs text-gray-400 mt-2">아직 가입한 학생이 없습니다.</p>
      )}
    </div>
  );
}
