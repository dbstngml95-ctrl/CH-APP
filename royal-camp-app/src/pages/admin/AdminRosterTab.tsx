import { useState } from "react";
import { addRosterNumbers, getRoster, resetStudentPassword } from "../../lib/storage";

export default function AdminRosterTab() {
  const [roster, setRoster] = useState(getRoster());
  const [bulkInput, setBulkInput] = useState("");

  function refresh() {
    setRoster(getRoster());
  }

  function handleAdd() {
    const numbers = bulkInput.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
    if (numbers.length === 0) return;
    addRosterNumbers(numbers);
    setBulkInput("");
    refresh();
  }

  function handleResetPassword(studentNumber: string) {
    const newPw = prompt(`${studentNumber} 학생의 새 비밀번호를 입력하세요.`);
    if (newPw) {
      resetStudentPassword(studentNumber, newPw);
      alert("비밀번호가 초기화되었습니다.");
    }
  }

  return (
    <div>
      <h2 className="text-main-dark font-medium mb-4">학생 명단 관리</h2>
      <div className="bg-bg-light rounded-xl p-4 mb-6 max-w-md">
        <p className="text-xs text-text-dark mb-2">
          학번을 한 줄에 하나씩(또는 쉼표로 구분) 붙여넣으면 한 번에 등록됩니다.
        </p>
        <textarea
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          placeholder={"20301\n20302\n20303"}
          className="w-full h-24 px-3 py-2 rounded-lg border border-line-light text-sm mb-2"
        />
        <button onClick={handleAdd} className="h-9 px-4 rounded-lg bg-main-dark text-white text-sm">
          명단 등록
        </button>
      </div>

      <table className="text-sm max-w-md w-full">
        <thead>
          <tr className="text-left text-text-dark border-b border-line-light">
            <th className="py-2">학번</th>
            <th className="py-2">가입 상태</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {roster.map((r) => (
            <tr key={r.studentNumber} className="border-b border-line-light">
              <td className="py-2 text-text-dark">{r.studentNumber}</td>
              <td className="py-2">
                {r.signedUp ? (
                  <span className="text-point-blue">가입 완료</span>
                ) : (
                  <span className="text-gray-400">미가입</span>
                )}
              </td>
              <td className="py-2">
                {r.signedUp && (
                  <button
                    onClick={() => handleResetPassword(r.studentNumber)}
                    className="text-xs text-red-500"
                  >
                    비밀번호 초기화
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
