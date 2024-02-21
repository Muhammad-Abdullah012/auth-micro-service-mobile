import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginScreen } from "./screens/auth/login/login";
import { SignupScreen } from "./screens/auth/signup/signup";
import {
  ChatScreenOptions,
  LoginScreenOptions,
  ProfileScreenOptions,
  SignUpScreenOptions,
} from "./screens/screenOptions/AllScreenOptions";
import { ChatScreen } from "./screens/chatScreen";
import { ProfileScreen } from "./screens/profileScreen";
import { BEARER_TOKEN, REFRESH_TOKEN } from "./constants/asyncStorageKeys";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { SignOutAction } from "./actions/auth";

export const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const AppStack = () => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={"HomeStack"}
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Group>
  );
};

export const AuthStack = () => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={LoginScreenOptions.name}
        component={LoginScreen}
        options={{
          title: LoginScreenOptions.title,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={SignUpScreenOptions.name}
        component={SignupScreen}
        options={{
          title: SignUpScreenOptions.title,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Group>
  );
};

const CustomDrawerContent = (props) => {
  const { dispatch } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={async () => {
          await Promise.all([
            (AsyncStorage.removeItem(REFRESH_TOKEN),
            AsyncStorage.removeItem(BEARER_TOKEN)),
          ]);
          dispatch(SignOutAction());
        }}
      />
    </DrawerContentScrollView>
  );
};

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={ChatScreenOptions.name}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name={ChatScreenOptions.name}
        component={ChatScreen}
        options={{
          title: ChatScreenOptions.title,
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name={ProfileScreenOptions.name}
        component={ProfileScreen}
        options={{
          title: ProfileScreenOptions.title,
          headerTitleAlign: "center",
        }}
      />
    </Drawer.Navigator>
  );
};
