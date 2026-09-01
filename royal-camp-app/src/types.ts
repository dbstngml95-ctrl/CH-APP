export interface RosterEntry {
  studentNumber: string;
  signedUp: boolean;
}

export interface Student {
  uid: string;
  studentNumber: string;
  name: string;
  phone: string;
  password: string; // 데모용 평문 저장. 실제 서비스에서는 Firebase Auth로 대체할 것.
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  isImportant: boolean;
  screen: "general" | "schedule";
  createdAt: string;
}

export interface ScheduleItem {
  time: string;
  activity: string;
  location: string;
}

export interface ScheduleDay {
  id: string;
  dayLabel: string;
  items: ScheduleItem[];
}

export interface DdaySettings {
  targetDate: string; // YYYY-MM-DD
  label: string;
}

export interface SchoolInfo {
  introduction: string;
  address: string;
  phone: string;
  email: string;
}

export interface GuidebookContent {
  rules: string;
  overview: {
    period: string;
    location: string;
    target: string;
    host: string;
  };
  agreement: string;
}

export interface Agreement {
  signed: boolean;
  signatureDataUrl: string;
  signedAt: string;
}
