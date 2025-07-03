import { app } from '@/FirebaseConfig';
import { useTask } from '@/hooks/useTask';
import { Task } from '@/models/Task';
import { useAuth } from '@/providers/AuthProvider';
import { createTask, getAllTask } from '@/services/TaskServices';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const TaskScreen = () => {
  const [taskText, setTaskText] = useState('');

  const { tasks, loading, reload } = useTask();

  const handleAddTask = async() => {
    console.log(taskText);
    if (!taskText.trim()) return;
    const newTask: Task = { title: taskText, completed: false };
    await createTask(newTask);
    await reload();
  };

  console.log(tasks);

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
            onPress={handleAddTask}
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-medium">Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item?.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-3 rounded-xl shadow-sm border border-gray-200">
              <Text className="text-gray-800 text-base">{item.title}</Text>
            </View>
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
