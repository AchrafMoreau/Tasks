import { Task } from "@/models/Task"
import { useAuth } from "@/providers/AuthProvider";
import { getAllTask } from "@/services/TaskServices";
import { use, useEffect, useState } from "react"

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth()

  const LoadingTask = async() => {
    console.log(user?.uid)
    const data = await getAllTask(user?.uid);
    setTasks(data);
    setLoading(false);
  }

  useEffect(() => {
    LoadingTask()
  }, [])

  return { tasks, loading, reload:LoadingTask }
}


