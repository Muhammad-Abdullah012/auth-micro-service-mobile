import { useEffect, useCallback, useState, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { Stack, AppStack, AuthStack } from "./AppStacks";
import { RefreshTokenRequest } from "./utils/requests";
import { BEARER_TOKEN, REFRESH_TOKEN } from "./constants/asyncStorageKeys";
import { AuthReducer } from "./reducers/authReducer";
import { AuthContext } from "./context/authContext";
import { SignInAction, SignOutAction } from "./actions/auth";

export default function App() {
  const [authState, dispatchAuthState] = useReducer(AuthReducer, {
    isLoading: true,
    isSignout: true,
  });

  const isUserLoggedIn = useCallback(() => {
    (async () => {
      try {
        const res = await RefreshTokenRequest();

        await Promise.all([
          AsyncStorage.setItem(
            REFRESH_TOKEN,
            res.data.data.refresh.token ?? ""
          ),
          AsyncStorage.setItem(BEARER_TOKEN, res.data.data.bearer.token ?? ""),
        ]);
        dispatchAuthState(SignInAction());
      } catch (err) {
        dispatchAuthState(SignOutAction());
        await Promise.all([
          AsyncStorage.removeItem(REFRESH_TOKEN),
          AsyncStorage.removeItem(BEARER_TOKEN),
        ]);
      }
    })();
  }, []);

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <NavigationContainer>
      <AuthContext.Provider
        value={{ state: authState, dispatch: dispatchAuthState }}
      >
        <Stack.Navigator>
          {!authState.isSignout ? AppStack() : AuthStack()}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
