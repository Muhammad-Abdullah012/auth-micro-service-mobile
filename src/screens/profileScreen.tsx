import { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserProfileSvg } from "../assets/svgComponents/userProfile";
import { Color } from "../utils/colors";
import { widthPercentageToDp } from "../utils/responsive";
import { BASE_URL } from "../../env";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const user: any = {};
  useEffect(() => {
    navigation.setOptions({
      title: "hello",
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          {false ? (
            <Image
              source={{ uri: `${BASE_URL}/files/images/profile_image` }}
              alt="profile"
            />
          ) : (
            <UserProfileSvg color={Color.black} />
          )}
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    width: widthPercentageToDp("25%"),
    height: widthPercentageToDp("25%"),
    borderRadius: 100,
    borderWidth: 5,
    borderColor: Color.black,
  },
});
