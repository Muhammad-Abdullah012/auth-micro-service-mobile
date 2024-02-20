import React, { useState } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../../utils/colors";
import {
  heightPercentageToDp,
  widthPercentageToDp,
} from "../../../utils/responsive";
import { LoginScreenOptions } from "../../screenOptions/AllScreenOptions";

export const SignupScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
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
                placeholder="Enter your first name"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your last name"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Email</Text>
              <TextInput style={styles.input} placeholder="Enter your email" />
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
                <Text>Select Date</Text>
              </Pressable>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
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
                placeholder="Enter your phone number"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={true}
                passwordRules={
                  "minlength: 9; required: lower; required: upper; required: digit;"
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                secureTextEntry={true}
              />
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.signupButton,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              onPress={() => console.log("Sign up pressed")}
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
