import { useState, useEffect } from "react";
import {
  TextInput,
  Pressable,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { TextComponent as Text } from "../../components/text";
import { Color } from "../../utils/colors";
import {
  heightPercentageToDp,
  widthPercentageToDp,
} from "../../utils/responsive";

export const ProfileScreenInputComponent = ({
  initialValue,
  canEdit = true,
  scrollToInput,
  onUpdate,
}: {
  initialValue: string;
  canEdit?: boolean;
  scrollToInput: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onUpdate: (v: string) => void;
}) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <View
      style={[
        styles.container,
        editable && {
          height: heightPercentageToDp("15%"),
          justifyContent: "space-between",
        },
      ]}
    >
      <View
        style={[styles.inputFieldContainerStyle, editable && { height: "55%" }]}
      >
        <TextInput
          style={[styles.inputFieldStyle, styles.textFontSize]}
          editable={editable}
          value={value}
          onChangeText={(t) => setValue(t)}
          onFocus={scrollToInput}
        />
        <Pressable
          style={styles.editButtonStyle}
          onPress={() => setEditable(true)}
          disabled={!canEdit}
        >
          <Text style={styles.editButtonTextStyle}>{"Edit"}</Text>
        </Pressable>
      </View>
      {editable ? (
        <View style={styles.buttonsContainerStyle}>
          <Pressable
            style={[styles.editButtonStyle, styles.cancelButtonStyle]}
            onPress={() => setEditable(false)}
          >
            <Text style={styles.cancelAndSaveTextStyle}>{"Cancel"}</Text>
          </Pressable>
          <Pressable
            style={[styles.editButtonStyle, styles.saveButtonStyle]}
            onPress={() => {
              setEditable(false);
              onUpdate(value);
            }}
          >
            <Text style={styles.cancelAndSaveTextStyle}>{"Save"}</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: heightPercentageToDp("7%"),
  },
  inputFieldContainerStyle: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputFieldStyle: {
    width: "75%",
    height: "100%",
    borderWidth: 1,
    borderColor: Color.gray,
    padding: 10,
    borderRadius: 10,
    color: Color.black,
  },
  editButtonStyle: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.royalBlue,
    borderRadius: 5,
  },
  buttonsContainerStyle: {
    height: "35%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveButtonStyle: {
    backgroundColor: Color.lightGray,
    borderWidth: 2,
    borderColor: Color.royalBlue,
  },
  cancelButtonStyle: {
    backgroundColor: Color.lightGray,
    borderWidth: 2,
    borderColor: Color.error,
  },
  textFontSize: {
    fontSize: widthPercentageToDp("6%"),
  },
  editButtonTextStyle: {
    fontSize: widthPercentageToDp("5%"),
  },
  cancelAndSaveTextStyle: {
    fontWeight: "600",
  },
});
