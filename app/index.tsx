import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    user,
    register,
    signInWithEmailAndPassword,
    signinWithGoogle,
    signOut,
  } = useFirebaseAuth();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    textInput: {
      padding: 15,
      borderRadius: 15,
      borderWidth: 1,
      width: 300,
      marginBottom: 30,
    },
  });

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>{user.email}</Text>
          <Button title="Sign Out" onPress={signOut} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Register" onPress={() => register(email, password)} />
          <Button
            title="Sign In"
            onPress={() => signInWithEmailAndPassword(email, password)}
          />
          <Button title="Sign In with Google" onPress={signinWithGoogle} />
        </>
      )}
    </View>
  );
}
