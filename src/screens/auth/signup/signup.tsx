import React, { useReducer, useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../../utils/colors";
import {
  heightPercentageToDp,
  widthPercentageToDp,
} from "../../../utils/responsive";
import { LoginScreenOptions } from "../../screenOptions/AllScreenOptions";
import { signUpReducer } from "../../../reducers/signUpReducer";
import { initialState } from "../../../interface/signUpState";
import {
  setConfirmPasswordAction,
  setDateOfBirthAction,
  setEmailAction,
  setFirstNameAction,
  setLastNameAction,
  setPasswordAction,
  setPhoneNumberAction,
  setUsernameAction,
} from "../../../actions/signUp";
import { CheckUsernameRequest, SignUpRequest } from "../../../utils/requests";
import { SignInAction } from "../../../actions/auth";
import {
  REFRESH_TOKEN,
  BEARER_TOKEN,
} from "../../../constants/asyncStorageKeys";
import { AuthContext } from "../../../context/authContext";

export const SignupScreen = () => {
  const navigation = useNavigation();
  const { dispatch: authDispatch } = useContext(AuthContext);
  const [state, dispatch] = useReducer(signUpReducer, initialState);
  const [show, setShow] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const { dateOfBirth: dob, ...restState } = state;

  const isButtonDisabled = Object.values(restState).includes("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setIsDateSelected(true);
    dispatch(setDateOfBirthAction(currentDate));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.card}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: heightPercentageToDp("2%") }}
        >
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>First Name</Text>
              <TextInput
                style={styles.input}
                value={state.firstName}
                onChangeText={(t) => {
                  dispatch(setFirstNameAction(t));
                }}
                placeholder="Enter your first name"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={state.lastName}
                placeholder="Enter your last name"
                onChangeText={(t) => {
                  dispatch(setLastNameAction(t));
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Username</Text>
              <TextInput
                style={styles.input}
                value={state.username}
                placeholder="Enter your username"
                onChangeText={(t) => {
                  dispatch(setUsernameAction(t));
                }}
                onEndEditing={async (e) => {
                  await CheckUsernameRequest({ username: state.username });
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Email</Text>
              <TextInput
                style={styles.input}
                value={state.email}
                inputMode={"email"}
                onChangeText={(t) => {
                  dispatch(setEmailAction(t));
                }}
                placeholder="Enter your email"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Date of Birth</Text>
              <Pressable
                style={({ pressed }) => [
                  styles.input,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
                onPress={() => setShow(true)}
              >
                <Text>
                  {isDateSelected
                    ? state.dateOfBirth.toDateString()
                    : "Select Date"}
                </Text>
              </Pressable>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={state.dateOfBirth}
                  mode={"date"}
                  is24Hour={true}
                  onChange={onChange}
                  maximumDate={new Date()}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={state.phoneNumber}
                inputMode={"tel"}
                onChangeText={(t) => {
                  dispatch(setPhoneNumberAction(t));
                }}
                placeholder="Enter your phone number"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={state.password}
                onChangeText={(t) => {
                  dispatch(setPasswordAction(t));
                }}
                passwordRules={
                  "minlength: 9; required: lower; required: upper; required: digit;"
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                value={state.confirmPassword}
                onChangeText={(t) => {
                  dispatch(setConfirmPasswordAction(t));
                }}
                placeholder="Confirm your password"
                secureTextEntry={true}
              />
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.signupButton,
                { opacity: pressed || isButtonDisabled ? 0.5 : 1 },
              ]}
              disabled={isButtonDisabled}
              onPress={async () => {
                if (state.password !== state.confirmPassword) {
                  Toast.show("Password and Confirm Password must be same!");
                  return;
                }
                const res = await SignUpRequest(state);
                await Promise.all([
                  AsyncStorage.setItem(
                    REFRESH_TOKEN,
                    res.data.data.refresh.token ?? ""
                  ),
                  AsyncStorage.setItem(
                    BEARER_TOKEN,
                    res.data.data.bearer.token ?? ""
                  ),
                ]);
                authDispatch(SignInAction());
              }}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </View>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text
              style={styles.loginLink}
              onPress={() =>
                navigation.navigate(LoginScreenOptions.name as unknown as never)
              }
            >
              Login
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: Color.lightGray,
  },
  card: {
    width: "80%",
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
  form: {
    gap: heightPercentageToDp("2%"),
  },
  inputContainer: {
    gap: heightPercentageToDp("1%"),
  },
  input: {
    borderWidth: 1,
    borderColor: Color.inputFieldBorderColor,
    borderRadius: 5,
    padding: 10,
    fontSize: widthPercentageToDp("4%"),
  },
  signupButton: {
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
  labelText: {
    fontSize: widthPercentageToDp("5%"),
  },
  loginText: {
    textAlign: "center",
    fontSize: widthPercentageToDp("4%"),
  },
  loginLink: {
    color: Color.royalBlue,
    fontWeight: "bold",
    fontSize: widthPercentageToDp("4%"),
  },
});
