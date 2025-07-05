import { db } from "@/FirebaseConfig";

import { Task } from "@/models/Task";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, Query, serverTimestamp, updateDoc, where } from "firebase/firestore";

const taskCollection = collection(db, "tasks");

const createTask = async (task: Task) => {
  try {
    console.log("the tasks: ", task)
    return await addDoc(taskCollection, {
      createdAt: serverTimestamp(),
      ...task
    });
  } catch (err) {
    console.log(err);
  }
}

const getAllTask = async (id: string | undefined): Promise<Task[]> => {
  console.log(id)
  const q = query(taskCollection,
    where("userId", "==", id),
    orderBy("createdAt", "desc")
  );
  const data = await getDocs(q);
  console.log(data)
  return data.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Task[]
}

const updateTask = async (id: string, data: Partial<Task>) => {
  return await updateDoc(doc(db, "tasks", id), data);

}

const deleteTask = async (id: string) => {
  await fetch('https://app.nativenotify.com/api/indie/notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      appId: 31088,
      appToken: "fUVea49dd40gSfQbtcmb1U",
      title: "Push title here as a string",
      body: "Push message here as a string",
      dateSent: "7-4-2025 10:50PM"
    }),
  });
  return await deleteDoc(doc(db, "tasks", id));
}


export {
  createTask,
  getAllTask,
  updateTask,
  deleteTask
}
