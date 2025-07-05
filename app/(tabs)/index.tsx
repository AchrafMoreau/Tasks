import TaskItem from "@/components/TaskCompo";
import { useTask } from '@/hooks/useTask';
import { Task } from '@/models/Task';
import { useAuth } from '@/providers/AuthProvider';
import { createTask, deleteTask, getAllTask, updateTask } from '@/services/TaskServices';
import { useState } from 'react';
import registerNNPushToken from 'native-notify';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Pressable,
} from 'react-native';

const TaskScreen = () => {
  // registerNNPushToken(31088, 'fUVea49dd40gSfQbtcmb1U');
  const google_token_key = "25b0243e4edf4a707a1a9c0fa1b034f9e24878e5";
  const [taskText, setTaskText] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const { user } = useAuth()

  const { tasks, loading, reload } = useTask();

  const handleAddTask = async () => {
    const newTask: Task = { title: taskText, completed: false, userId: user?.uid };
    try {
      setCreateLoading(true)
      await createTask(newTask);
      await reload();
    } catch (err) {
      console.log(err)
    } finally {
      setCreateLoading(false)
      setTaskText("")
    }
  };


  const handelCompleted = async (task: Task) => {
    try {
      if (task.id) {
        await updateTask(task.id, {
          completed: !task.completed,
        })
        await reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteTask = async(task:Task) => {
    try{
      if(task.id){
        await deleteTask(task.id);
        await reload();
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-gray-100 px-4 pt-10"
    >
      <Text className="text-2xl font-bold text-gray-800 mb-4">My Tasks</Text>

      <View className="flex-row items-center mb-6 rounded-xl bg-white shadow px-3 py-2">
        <TextInput
          value={taskText}
          onChangeText={setTaskText}
          placeholder="Add a new task"
          className="flex-1 text-base px-2 py-1"
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          disabled={createLoading}
          onPress={handleAddTask}
          className={`flex-row items-center justify-center px-4 py-3 rounded-xl ${createLoading ? 'bg-blue-400' : 'bg-blue-600'
            }`}
        >
          {createLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : null}
          <Text className="text-white font-medium">
            {createLoading ? 'Loading...' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item?.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TaskItem item={item} handelCompleted={handelCompleted} handleDeleteTask={handleDeleteTask} />
        )}
        ListEmptyComponent={(
          <Text className="text-center text-gray-400 mt-10">
            No tasks yet. Add one above!
          </Text>
        )}
      />
    </KeyboardAvoidingView>
  );
};

export default TaskScreen;
