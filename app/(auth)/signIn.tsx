import images from "@/assets/images";
import { auth } from "@/FirebaseConfig";
import { useAuth } from "@/providers/AuthProvider";
import signInWithFacebook from "@/providers/SignInWithFacebook";
import { useGoogleSignIn } from "@/providers/SignWithGoogle";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const router = useRouter();
  const { promptAsync } = useGoogleSignIn();
  const { user } = useAuth();
  const [value, setValue] = useState({
    email: "",
    password: ""
  })

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, value.email, value.password);
      if (user) router.push("/");


    } catch (err) {
      console.log(err)
      alert("Sign in Faild " + err?.message)
    }
  }

  return (

    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-4">
        <Text className="font-bold text-6xl text-primary mb-8 border border-black px-4 py-2 rounded-lg">
          SIGN IN
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

          <TouchableOpacity
            onPress={signIn}
            className="bg-primary py-3 px-6 rounded-full mb-4 items-center"
          >
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>

          <View className="flex items-center justify-center">
            <TouchableOpacity
              className="flex-row items-center bg-white p-4 rounded-full mb-2 shadow-sm w-full justify-center"
              onPress={() => promptAsync()}
            >
              <Image
                source={images.googelIcon}
                className="w-6 h-6 mr-4"
              />
              <Text className="text-base">Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center bg-[#1877F2] p-4 rounded-full shadow-sm w-full justify-center"
              onPress={signInWithFacebook}
            >
              <Image
                source={images.fbIcon}
                className="w-6 h-6 mr-4"
              />
              <Text className="text-base text-white">Continue with Facebook</Text>
            </TouchableOpacity>
          </View>

          <Link href="/signUp" asChild className="mt-5">
            <TouchableOpacity className="items-center">
              <Text className="text-blue-900 font-medium">
                Create an Account
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>

  )
}


export default SignIn;
