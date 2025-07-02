import { auth } from '@/FirebaseConfig';
import { FacebookAuthProvider, signInWithCredential } from '@firebase/auth';
import * as Facebook from 'expo-facebook';

const signInWithFacebook = async () => {
  try {
    await Facebook.initializeAsync({
      appId: '763048699615000',
    });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });
    
    if (type === 'success') {
      const credential = FacebookAuthProvider.credential(token);
      return signInWithCredential(auth, credential);
    }
  } catch (error) {
    console.error(error);
  }
};

export default signInWithFacebook;
