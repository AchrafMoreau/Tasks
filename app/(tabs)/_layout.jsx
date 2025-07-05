import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from "@/providers/AuthProvider";
import UserIconDropdown from "@/components/UserDropdown";

export default function TabLayout() {
  const router = useRouter();
  const { user, authLoading } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if (!user && !authLoading) {
        return router.push("/signIn");
      }
    }, 500)
  }, [user]);

  return (

    <Tabs
      screenOptions={{
        headerRight: () => <UserIconDropdown />,
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
