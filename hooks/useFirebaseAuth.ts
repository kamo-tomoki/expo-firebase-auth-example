import { userAtom } from "@/atoms/user";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAtom } from "jotai";
import { useEffect } from "react";

GoogleSignin.configure({
  // google-services.jsonまたはGoogleService-Info.plistに記載されているCLIENT_ID
  webClientId:
    "43283490924-1eb0aaldo0s78odf0ht19eu1mus6e8sh.apps.googleusercontent.com",
});

export function useFirebaseAuth() {
  const [user, setUser] = useAtom(userAtom);

  const register = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.error(e);
    }
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      setUser(user);
    } catch (e) {
      console.error(e);
    }
  };

  const signinWithGoogle = async () => {
    try {
      const user = await GoogleSignin.signIn();
      const idToken = user.idToken;

      if (idToken === null) {
        console.error("Google sign in error: idToken is null");
      }

      // IDトークンでサインインする
      const authCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(authCredential);
      setUser(userCredential.user);
    } catch (e) {
      throw new Error("Firebase google login error: " + JSON.stringify(e));
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  // 初回レンダリング時にログイン状態監視のイベントハンドラーを登録
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => setUser(user));
    return subscriber;
  }, []);

  return {
    user,
    register,
    signinWithGoogle,
    signInWithEmailAndPassword,
    signOut,
  };
}
