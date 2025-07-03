import { app, db } from "@/FirebaseConfig";

import { Task } from "@/models/Task";
import { useAuth } from "@/providers/AuthProvider";
import { getAuth } from "@firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, Query, updateDoc, where } from "firebase/firestore";

const taskCollection = collection(db, "tasks");
const { user } = useAuth();

const createTask = async (task: Task) => {
  return await addDoc(taskCollection, {
    userId: user?.uid,
    ...task
  });
}

const getAllTask = async (): Promise<Task[]> => {
  const q = query(taskCollection, where("userId" , "==", user?.uid));
  const data = await getDocs(q);
  return data.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Task[]
}

const updateTask = async (id: string, data: Partial<Task>) => {
  return await updateDoc(doc(db, "tasks", id), data);
  
}

const deleteTask = async (id: string) => {
  return await deleteDoc(doc(db, "tasks", id));
}


export {
  createTask, 
  getAllTask,
  updateTask,
  deleteTask
}
