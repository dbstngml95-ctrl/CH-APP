import { useCallback, useEffect, useState } from "react";
import { createStudent, getStudentByNumber, getStudentByUid } from "./storage";
import { Student } from "../types";

const SESSION_KEY = "rc_student_session_uid";

export function useStudentAuth() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = localStorage.getItem(SESSION_KEY);
    if (uid) {
      const found = getStudentByUid(uid);
      if (found) setStudent(found);
    }
    setLoading(false);
  }, []);

  const login = useCallback((studentNumber: string, password: string) => {
    const found = getStudentByNumber(studentNumber);
    if (!found || found.password !== password) {
      return { ok: false as const, error: "아이디 또는 비밀번호가 올바르지 않습니다." };
    }
    localStorage.setItem(SESSION_KEY, found.uid);
    setStudent(found);
    return { ok: true as const };
  }, []);

  const signup = useCallback(
    (input: { studentNumber: string; password: string; name: string; phone: string }) => {
      if (getStudentByNumber(input.studentNumber)) {
        return { ok: false as const, error: "이미 가입된 아이디입니다. 로그인해 주세요." };
      }
      const created = createStudent(input);
      localStorage.setItem(SESSION_KEY, created.uid);
      setStudent(created);
      return { ok: true as const };
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setStudent(null);
  }, []);

  const refresh = useCallback(() => {
    if (student) {
      const found = getStudentByUid(student.uid);
      if (found) setStudent(found);
    }
  }, [student]);

  return { student, loading, login, signup, logout, refresh };
}
