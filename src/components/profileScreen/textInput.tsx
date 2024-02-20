import { useState } from "react";
import { TextInput, Pressable, Text, View } from "react-native";

export const TextInputComponent = ({
  initialValue,
}: {
  initialValue: string;
}) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(initialValue);
  return (
    <View>
      <TextInput
        editable={editable}
        value={value}
        onChangeText={(t) => setValue(t)}
      />
      <Pressable onPress={() => setEditable(true)}>
        <Text>{"Edit"}</Text>
      </Pressable>
      {editable ? (
        <View>
          <Pressable onPress={() => setEditable(false)}>
            <Text>{"Cancel"}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setEditable(false);
            }}
          >
            <Text>{"Save"}</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
