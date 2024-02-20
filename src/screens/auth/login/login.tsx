import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color } from "../../../utils/colors";
import {
  heightPercentageToDp,
  widthPercentageToDp,
} from "../../../utils/responsive";
import { SignUpScreenOptions } from "../../screenOptions/AllScreenOptions";
import { LoginRequest } from "../../../utils/requests";
import {
  BEARER_TOKEN,
  REFRESH_TOKEN,
} from "../../../constants/asyncStorageKeys";
import { AuthContext } from "../../../context/authContext";
import { SignInAction } from "../../../actions/auth";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AuthContext);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = async () => {
    let isValid = true;
    switch (true) {
      case !validator.isEmail(emailOrUsername) && emailOrUsername.length < 3:
        setEmailErr("Username must be atleast 3 characters long!");
        isValid = false;
      case password.length < 9:
        setPasswordErr("Password must be atleast 9 characters long!");
        isValid = false;
        break;
      default:
        setEmailErr("");
        setPasswordErr("");
        isValid = true;
    }
    if (!isValid) return;
    try {
      setIsLoading(true);
      const res = await LoginRequest({
        password,
        ...(validator.isEmail(emailOrUsername)
          ? { email: emailOrUsername }
          : { username: emailOrUsername }),
      });
      await Promise.all([
        AsyncStorage.setItem(REFRESH_TOKEN, res.data.data.refresh.token ?? ""),
        AsyncStorage.setItem(BEARER_TOKEN, res.data.data.bearer.token ?? ""),
      ]);
      dispatch(SignInAction());
    } catch (err) {
      if (err.response) {
        setErr(err.response.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
    console.log("Logging in with:", emailOrUsername, password);
  };

  const isButtonDisabled = emailOrUsername === "" || password === "";

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Email or Username</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your email or username"
              value={emailOrUsername}
              onChangeText={(text) => setEmailOrUsername(text)}
            />
            {emailErr && <Text style={styles.errorText}>{emailErr}</Text>}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Password</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {passwordErr && <Text style={styles.errorText}>{passwordErr}</Text>}
          </View>
        </View>
        <View>
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              { opacity: pressed ? 0.5 : 1 },
            ]}
            onPress={handleLogin}
            disabled={isButtonDisabled}
          >
            {isLoading ? (
              <ActivityIndicator color={Color.white} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </Pressable>
          {err && <Text style={styles.errorText}>{err}</Text>}
        </View>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text
            style={styles.signupLink}
            onPress={() =>
              navigation.navigate(SignUpScreenOptions.name as unknown as never)
            }
          >
            Register
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.lightGray,
  },
  card: {
    width: "90%",
    display: "flex",
    gap: heightPercentageToDp("3%"),
    padding: 20,
    backgroundColor: Color.white,
    borderRadius: 10,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    // marginBottom: 10,
    display: "flex",
    gap: heightPercentageToDp("2%"),
  },
  input: {
    borderWidth: 1,
    borderColor: Color.inputFieldBorderColor,
    borderRadius: 5,
    padding: 10,
    fontSize: widthPercentageToDp("4%"),
  },
  loginButton: {
    backgroundColor: Color.royalBlue,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: widthPercentageToDp("5%"),
  },
  signupText: {
    fontSize: widthPercentageToDp("4%"),
    textAlign: "center",
  },
  labelText: {
    fontSize: widthPercentageToDp("5%"),
  },
  signupLink: {
    color: Color.royalBlue,
    fontSize: widthPercentageToDp("4%"),
    fontWeight: "bold",
  },
  errorText: {
    color: Color.error,
    textAlign: "center",
  },
});
