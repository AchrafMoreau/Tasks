import { auth } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const router = useRouter();
  const [value, setValue] = useState({
    email: "",
    password: "",
    confirmPass: "",
  })


  const signUp = async () => {
    if(value.password !== value.confirmPass) return;
    try {
      const user = await createUserWithEmailAndPassword(auth, value.email, value.password);
      if (user) router.push("/signIn")
    } catch (err) {
      console.log(err);
      alert("error create user " + err?.message);
    }
  }


  return(
    
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-4">
        <Text className="font-bold text-6xl text-primary mb-8 border border-black px-4 py-2 rounded-lg">
          SIGN UP
        </Text>

        <View className="w-full max-w-md border-1 border-accent rounded-3xl p-6 bg-blue-100 shadow-lg">
          <TextInput
            className="w-full border-b-2 border-gray-300 pb-2 mb-4 text-lg text-gray-500"
            placeholder="email"
            placeholderTextColor="#9CA3AF"
            value={value.email}
            onChangeText={(text: string) => setValue((prev) => ({ ...prev, email: text }))}
          />

          <TextInput
            className="w-full border-b-2 border-gray-300 pb-2 mb-6 text-lg text-gray-500"
            placeholder="password"
            placeholderTextColor="#9CA3AF"
            value={value.password}
            onChangeText={(text: string) => setValue((prev) => ({ ...prev, password: text }))}
            secureTextEntry
          />

          <TextInput
            className="w-full border-b-2 border-gray-300 pb-2 mb-6 text-lg text-gray-500"
            placeholder="confirm password"
            placeholderTextColor="#9CA3AF"
            value={value.confirmPass}
            onChangeText={(text: string) => setValue((prev) => ({ ...prev, confirmPass: text }))}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={signUp}
            className="bg-primary py-3 px-6 rounded-full mb-4 items-center"
          >
            <Text className="text-white font-bold text-lg">Sign Up</Text>
          </TouchableOpacity>

          <Link href="/signIn" asChild>
            <TouchableOpacity className="items-center">
              <Text className="text-blue-900 font-medium">
                Already have an Account !
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>

  )
}


export default SignUp;
