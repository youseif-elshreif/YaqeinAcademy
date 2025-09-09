// ==================================================
// Payment Types
// ==================================================

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  status: "paid" | "unpaid" | "partial";
  allowedLessons: number;
  usedLessons: number;
  paymentDate?: string;
  dueDate: string;
  paymentMethod?: "cash" | "bank_transfer" | "card";
  notes?: string;
}

export interface PaymentHistory {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  method: string;
  notes?: string;
}

export interface CreditsFormData {
  privateAmount: number;
  publicAmount?: number;
}
