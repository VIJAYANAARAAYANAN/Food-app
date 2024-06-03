import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../../supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/(home)");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLogin();
  }, []);
  async function signUpWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (data) {
      const token = data?.session?.access_token;
      AsyncStorage.setItem("authToken", token);
      router.replace("/(home)");
    }
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
          Food App
        </Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "red",
            }}
          >
            Log in to your account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ color: "gray", marginVertical: 10, width: 300 }}
              placeholder="enter your Email"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock"
              size={24}
              color="black"
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{ color: "gray", marginVertical: 10, width: 300 }}
              placeholder="enter your password"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <Text style={{}}>Keep me Logged In</Text>
          <Text style={{ color: "#fd5c63" }}>Forgot Password</Text>
        </View>

        <Pressable
          onPress={signUpWithEmail}
          style={{
            width: 200,
            backgroundColor: "#fd5c63",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
            marginTop: 50,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "white",
            }}
          >
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/register")}
          style={{ marginTop: 15 }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              fontSize: 16,
              marginHorizontal: 5,
              paddingHorizontal: 5,
            }}
          >
            Don't have an Account?
            <Text style={{ color: "#0096FF", fontSize: 16, fontWeight: "600" }}>
              Sign Up
            </Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
