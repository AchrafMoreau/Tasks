import { FieldValue, Timestamp } from "firebase/firestore";

export interface Task {
  id?: string;
  title: string;
  completed: boolean;
  userId?: string;
  createdAt?:  Timestamp | FieldValue;
}
