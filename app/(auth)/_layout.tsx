import { auth } from "@/FirebaseConfig";
import {  Stack, useRouter } from "expo-router";
import { useEffect } from "react";


export default function Layout(){

  const router = useRouter()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        router.push("/");
      }
    })
  }, [])

  return(
    <Stack>
      <Stack.Screen name="signIn" options={{ headerShown : false }} />
      <Stack.Screen name="signUp" options={{ headerShown : false }} />
    </Stack>
  )
  
}
