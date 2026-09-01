import {
  Agreement,
  DdaySettings,
  GuidebookContent,
  Notice,
  RosterEntry,
  ScheduleDay,
  SchoolInfo,
  Student,
} from "../types";

const KEYS = {
  roster: "rc_roster",
  students: "rc_students",
  notices: "rc_notices",
  schedule: "rc_schedule",
  dday: "rc_dday",
  schoolInfo: "rc_school_info",
  guidebook: "rc_guidebook",
  agreements: "rc_agreements",
  seeded: "rc_seeded",
};

function read<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------- 최초 실행 시 데모용 초기 데이터 심기 ----------
export function seedIfNeeded() {
  if (localStorage.getItem(KEYS.seeded)) return;

  const roster: RosterEntry[] = ["20301", "20302", "20303", "20304", "20305"].map(
    (n) => ({ studentNumber: n, signedUp: false })
  );
  write(KEYS.roster, roster);

  write<Notice[]>(KEYS.notices, [
    {
      id: crypto.randomUUID(),
      title: "입소 준비물 안내",
      content: "캠프 입소 전 준비물 목록을 꼭 확인해 주세요. 세면도구, 여벌 옷, 필기구를 챙겨주세요.",
      isImportant: true,
      screen: "general",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: "버스 탑승 시간 변경 안내",
      content: "입소일 버스 탑승 시간이 오전 8시 30분으로 변경되었습니다.",
      isImportant: false,
      screen: "general",
      createdAt: new Date().toISOString(),
    },
  ]);

  write<ScheduleDay[]>(KEYS.schedule, [
    {
      id: crypto.randomUUID(),
      dayLabel: "1일차",
      items: [
        { time: "09:00", activity: "입소식", location: "대강당" },
        { time: "14:00", activity: "오리엔테이션", location: "세미나실" },
      ],
    },
    {
      id: crypto.randomUUID(),
      dayLabel: "2일차",
      items: [{ time: "10:00", activity: "팀 프로젝트", location: "세미나실" }],
    },
  ]);

  const dday: DdaySettings = {
    targetDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    label: "로열캠프",
  };
  write(KEYS.dday, dday);

  const schoolInfo: SchoolInfo = {
    introduction: "국제 감각을 갖춘 인재를 키우는 청담국제고등학교입니다.",
    address: "서울시 강남구 청담로 000",
    phone: "02-000-0000",
    email: "info@cheongdam-hs.example",
  };
  write(KEYS.schoolInfo, schoolInfo);

  const guidebook: GuidebookContent = {
    rules:
      "1. 정해진 시간을 반드시 지킨다.\n2. 외출은 사전 허가를 받는다.\n3. 흡연 및 음주를 금지한다.\n4. 기숙사 내 소음을 자제한다.",
    overview: {
      period: "2026.08.10 ~ 08.14",
      location: "청담국제고등학교",
      target: "2학년 전체",
      host: "청담국제고등학교",
    },
    agreement:
      "본인은 청담국제고 로열캠프 프로그램과 관련된 모든 정보를 비밀로 유지할 것을 다음과 같이 서약합니다.\n1. 캠프 진행 상황을 SNS 등에 업로드하지 않는다.\n2. 캠프 프로그램을 무단으로 촬영하거나 녹음하지 않는다.\n3. 위 사항을 위반할 경우 캠프 측의 조치를 따른다.\n4. 비밀유지의무는 캠프 종료 후에도 유효하다.",
  };
  write(KEYS.guidebook, guidebook);

  write<Student[]>(KEYS.students, []);
  write<Record<string, Agreement>>(KEYS.agreements, {});

  localStorage.setItem(KEYS.seeded, "true");
}

// ---------- roster ----------
export function getRoster(): RosterEntry[] {
  return read(KEYS.roster, []);
}
export function setRoster(entries: RosterEntry[]) {
  write(KEYS.roster, entries);
}
export function addRosterNumbers(numbers: string[]) {
  const roster = getRoster();
  const existing = new Set(roster.map((r) => r.studentNumber));
  numbers
    .map((n) => n.trim())
    .filter((n) => n && !existing.has(n))
    .forEach((n) => roster.push({ studentNumber: n, signedUp: false }));
  setRoster(roster);
}
export function isRegisteredNumber(studentNumber: string): boolean {
  return getRoster().some((r) => r.studentNumber === studentNumber);
}
export function isSignedUp(studentNumber: string): boolean {
  return getRoster().some((r) => r.studentNumber === studentNumber && r.signedUp);
}
export function markSignedUp(studentNumber: string) {
  const roster = getRoster().map((r) =>
    r.studentNumber === studentNumber ? { ...r, signedUp: true } : r
  );
  setRoster(roster);
}

// ---------- students ----------
export function getStudents(): Student[] {
  return read(KEYS.students, []);
}
function setStudents(students: Student[]) {
  write(KEYS.students, students);
}
export function getStudentByNumber(studentNumber: string): Student | undefined {
  return getStudents().find((s) => s.studentNumber === studentNumber);
}
export function getStudentByUid(uid: string): Student | undefined {
  return getStudents().find((s) => s.uid === uid);
}
export function createStudent(input: {
  studentNumber: string;
  name: string;
  phone: string;
  password: string;
}): Student {
  const student: Student = { uid: crypto.randomUUID(), ...input };
  const students = getStudents();
  students.push(student);
  setStudents(students);
  markSignedUp(input.studentNumber);
  return student;
}
export function updateStudent(uid: string, patch: Partial<Student>) {
  const students = getStudents().map((s) => (s.uid === uid ? { ...s, ...patch } : s));
  setStudents(students);
}
export function resetStudentPassword(studentNumber: string, newPassword: string) {
  const students = getStudents().map((s) =>
    s.studentNumber === studentNumber ? { ...s, password: newPassword } : s
  );
  setStudents(students);
}

// ---------- notices ----------
export function getNotices(): Notice[] {
  return read<Notice[]>(KEYS.notices, []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
export function addNotice(notice: Omit<Notice, "id" | "createdAt">) {
  const notices = read<Notice[]>(KEYS.notices, []);
  notices.push({ ...notice, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
  write(KEYS.notices, notices);
}
export function deleteNotice(id: string) {
  write(
    KEYS.notices,
    read<Notice[]>(KEYS.notices, []).filter((n) => n.id !== id)
  );
}
export function getScheduleBanner(): Notice | undefined {
  return getNotices().find((n) => n.screen === "schedule");
}

// ---------- schedule ----------
export function getSchedule(): ScheduleDay[] {
  return read(KEYS.schedule, []);
}
export function setSchedule(days: ScheduleDay[]) {
  write(KEYS.schedule, days);
}

// ---------- d-day ----------
export function getDday(): DdaySettings {
  return read(KEYS.dday, { targetDate: new Date().toISOString().slice(0, 10), label: "로열캠프" });
}
export function setDday(settings: DdaySettings) {
  write(KEYS.dday, settings);
}

// ---------- school info ----------
export function getSchoolInfo(): SchoolInfo {
  return read(KEYS.schoolInfo, {
    introduction: "",
    address: "",
    phone: "",
    email: "",
  });
}
export function setSchoolInfo(info: SchoolInfo) {
  write(KEYS.schoolInfo, info);
}

// ---------- guidebook ----------
export function getGuidebook(): GuidebookContent {
  return read(KEYS.guidebook, {
    rules: "",
    overview: { period: "", location: "", target: "", host: "" },
    agreement: "",
  });
}
export function setGuidebook(content: GuidebookContent) {
  write(KEYS.guidebook, content);
}

// ---------- agreement ----------
export function getAgreement(uid: string): Agreement | undefined {
  const all = read<Record<string, Agreement>>(KEYS.agreements, {});
  return all[uid];
}
export function saveAgreement(uid: string, agreement: Agreement) {
  const all = read<Record<string, Agreement>>(KEYS.agreements, {});
  all[uid] = agreement;
  write(KEYS.agreements, all);
}
