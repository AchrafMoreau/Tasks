import { auth } from "@/FirebaseConfig";
import { Task } from "@/models/Task"
import { useAuth } from "@/providers/AuthProvider";
import { getAllTask } from "@/services/TaskServices";
import { use, useEffect, useState } from "react"

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, authLoading } = useAuth()

  const LoadingTask = async () => {
    if (!user?.uid) return;
    const data = await getAllTask(user?.uid);
    setTasks(data);
    setLoading(false);
  }

  useEffect(() => {
    if (!authLoading && user?.uid) {
      LoadingTask()
    }
  }, [user, authLoading])

  return { tasks, loading, reload: LoadingTask }
}


