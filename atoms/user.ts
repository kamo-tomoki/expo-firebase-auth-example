import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { atom } from "jotai";

export const userAtom = atom<FirebaseAuthTypes.User | null>(null);
