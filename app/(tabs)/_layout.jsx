import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { auth } from "@/FirebaseConfig";
import { View, Text } from 'react-native';
import UserDropdown from '@/components/UserDropdown';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { app } from '@/FirebaseConfig';
import { useAuth } from "@/providers/AuthProvider";

export default function TabLayout() {

  const router = useRouter()

  const { user, authLoading } = useAuth();

  console.log(user, authLoading)

  useEffect(() => {
    if (!user && !authLoading) {
      router.push("/signIn");
    }
  }, [authLoading, user])

  if (authLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    )
  }


  return (

    <Tabs
      screenOptions={{
        headerRight: () => <UserDropdown />,
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
    </Tabs>
  );
}
