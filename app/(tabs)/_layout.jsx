import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { auth } from "@/FirebaseConfig";
import { View } from 'react-native';
import UserDropdown from '@/components/UserDropdown';

export default function TabLayout() {

  const router = useRouter()
  const user = auth.currentUser;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/signIn')
      }
    })
  }, [])

  if (!user) {
    return <View />
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
