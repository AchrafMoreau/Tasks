import { Link } from 'expo-router';
import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '@/providers/AuthProvider'; // Your auth context

export default function UserDropdown() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  return (
    <View className="relative m-4">
      <TouchableOpacity onPress={toggleDropdown} className="flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center">
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} className="w-full h-full rounded-full" />
          ) : (
            <FontAwesome name="user" size={20} color="#6B7280" />
          )}
        </View>
      </TouchableOpacity>

      <Animated.View 
        style={[
          styles.dropdown,
          { 
            opacity: animation,
            transform: [{ translateY }],
          }
        ]}
        className="absolute right-0 top-12 bg-white rounded-lg shadow-lg w-48 z-50"
      >
        <View className="p-2 border-b border-gray-100">
          <Text className="font-semibold text-gray-800">{user?.displayName || 'User'}</Text>
          <Text className="text-xs text-gray-500">{user?.email}</Text>
        </View>

        <Link href="/profile" asChild>
          <TouchableOpacity className="flex-row items-center px-4 py-3 hover:bg-gray-50">
            <FontAwesome name="user" size={16} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700">Profile</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity 
          onPress={signOut}
          className="flex-row items-center px-4 py-3 hover:bg-gray-50"
        >
          <FontAwesome name="sign-out" size={16} color="#6B7280" className="mr-3" />
          <Text className="text-gray-700">Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }
});
