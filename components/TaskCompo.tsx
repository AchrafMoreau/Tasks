import { View, Text, Pressable, TouchableOpacity } from 'react-native';

function TaskItem({ item, handelCompleted, handleDeleteTask }) {
  return (
    <View className="flex-row items-center mb-3">
      <Pressable
        onPress={() => handelCompleted(item)}
        className={`
          flex-1
          ${item.completed ? 'bg-gray-200' : 'bg-white'}
          p-4 rounded-xl shadow-sm border border-gray-200
        `}
      >
        <Text
          className={`${item.completed ? 'line-through text-gray-800' : 'text-gray-800'} text-base`}
        >
          {item.title}
        </Text>
      </Pressable>

      <TouchableOpacity
        onPress={() => handleDeleteTask(item)}
        className="ml-3 px-4 py-3 bg-red-400 rounded-xl"
      >
        <Text className="text-white font-medium">Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TaskItem;
