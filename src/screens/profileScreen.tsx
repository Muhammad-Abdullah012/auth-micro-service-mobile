import { useEffect, useRef, useState, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Keyboard,
  Pressable,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserProfileSvg } from "../assets/svgComponents/userProfile";
import { TextComponent as Text } from "../components/text";
import { Color } from "../utils/colors";
import { heightPercentageToDp, widthPercentageToDp } from "../utils/responsive";
import { BASE_URL } from "../../env";
import { ProfileScreenInputComponent } from "../components/profileScreen/profileScreenInput";
import {
  GetMyProfileRequest,
  UpdateProfileRequest,
  UploadFiles,
} from "../utils/requests";
import { ProfileScreenOptions } from "./screenOptions/AllScreenOptions";
import { selectImage } from "../utils/pickDocument";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [show, setShow] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const fetchProfile = async () => {
    const res = await GetMyProfileRequest();
    setUser(res.data.data);
    navigation.setOptions({
      title: res.data?.data?.firstName ?? ProfileScreenOptions.title,
    });
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfile().finally(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const {
    createdAt,
    updatedAt,
    id,
    deleted,
    passwordHash,
    passwordResetToken,
    passwordResetExpires,
    twoFactorSecret,
    profileImage,
    lastLogin,
    refreshToken,
    verificationToken,
    role,
    status,
    additionalMetadata,
    dateOfBirth,
    ...filteredUser
  } = user ?? {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.scrollViewStyle, styles.scrollViewContainerStyle]}>
        <Pressable
          style={styles.imageContainer}
          onPress={async () => {
            const result = await selectImage();
            if (result.assets == null) return;
            const { mimeType, uri, name } = result.assets[0];
            const uploadResult = await UploadFiles({
              profileImage: { type: mimeType, uri, name },
            });

            await UpdateProfileRequest({
              body: {
                profileImage: uploadResult.data.data[0].profileImage,
              },
            });
          }}
        >
          {user?.profileImage ? (
            <Image
              source={{
                uri: `${BASE_URL}/files/images/${user?.profileImage}`,
              }}
              style={styles.imageStyle}
              resizeMode={"cover"}
              alt="profile"
            />
          ) : (
            <UserProfileSvg color={Color.black} />
          )}
        </Pressable>

        <KeyboardAwareScrollView
          innerRef={(ref) => {
            scrollRef.current = ref;
          }}
          contentContainerStyle={styles.fieldsContainerStyle}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {Object.keys(filteredUser ?? {})
            .filter((k) => typeof user[k] === "string")
            .map((k, i) => {
              return (
                <ProfileScreenInputComponent
                  initialValue={(user[k] as string) ?? ""}
                  scrollToInput={(e) => {
                    e.target.measure((x, y, width, height) => {
                      scrollRef.current?.scrollTo({
                        x,
                        y,
                        animated: true,
                      });
                    });
                  }}
                  propertyName={k}
                  onUpdate={(v) => {
                    UpdateProfileRequest({ body: { [k]: v } });
                  }}
                  key={i}
                />
              );
            })}
          <Pressable
            onPress={() => setShow(true)}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Text>{dateOfBirth}</Text>
          </Pressable>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(dateOfBirth)}
              mode={"date"}
              onChange={(event, selectedDate) => {
                setShow(false);
                UpdateProfileRequest({ body: { dateOfBirth: selectedDate } });
              }}
              maximumDate={new Date()}
            />
          )}
          <View style={{ height: keyboardHeight }}></View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollViewContainerStyle: {
    flex: 1,
    gap: heightPercentageToDp("5%"),
    paddingTop: 10,
    alignItems: "center",
  },
  scrollViewStyle: {
    width: "85%",
  },
  fieldsContainerStyle: {
    width: "100%",
    gap: heightPercentageToDp("3%"),
    paddingBottom: heightPercentageToDp("3%"),
  },
  imageContainer: {
    width: widthPercentageToDp("25%"),
    height: widthPercentageToDp("25%"),
    borderRadius: widthPercentageToDp("50%"),
    borderWidth: 5,
    borderColor: Color.black,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
});
