import { Text, StyleSheet, TextStyle } from "react-native";
import { Color } from "../utils/colors";
import { widthPercentageToDp } from "../utils/responsive";

export const TextComponent = ({
  children,
  style: componentStyles,
}: {
  children: string;
  style?: TextStyle | Array<TextStyle>;
}) => {
  return <Text style={[style.textStyle, componentStyles]}>{children}</Text>;
};

const style = StyleSheet.create({
  textStyle: {
    color: Color.black,
    fontSize: widthPercentageToDp("4%"),
  },
});
