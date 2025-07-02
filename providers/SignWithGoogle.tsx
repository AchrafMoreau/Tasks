import * as Google from 'expo-auth-session/providers/google';
import { auth } from '@/FirebaseConfig';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect } from 'react';

export const useGoogleSignIn = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "689468030110-qn5f6d6elvnqqv2v30mfrmdfuvsiiepp.apps.googleusercontent.com",
    iosClientId: "689468030110-qn5f6d6elvnqqv2v30mfrmdfuvsiiepp.apps.googleusercontent.com",
    webClientId: '689468030110-qn5f6d6elvnqqv2v30mfrmdfuvsiiepp.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return { promptAsync };
};
