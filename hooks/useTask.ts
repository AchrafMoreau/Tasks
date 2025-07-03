import { Task } from "@/models/Task"
import { getAllTask } from "@/services/TaskServices";
import { useEffect, useState } from "react"

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const LoadingTask = async() => {
    const data = await getAllTask();
    setTasks(data);
    setLoading(false);
  }

  useEffect(() => {
    LoadingTask()
  }, [])

  return { tasks, loading, reload:LoadingTask }
}


