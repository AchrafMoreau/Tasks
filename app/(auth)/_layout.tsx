import { auth } from "@/FirebaseConfig";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "@/providers/AuthProvider";


export default function Layout(){

  return(
    <Stack>
      <Stack.Screen name="signIn" options={{ headerShown : false }} />
      <Stack.Screen name="signUp" options={{ headerShown : false }} />
    </Stack>
  )
  
}
