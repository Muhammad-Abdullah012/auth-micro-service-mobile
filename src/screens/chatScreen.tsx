import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { ROLE } from "../interface";
import { Color } from "../utils/colors";

export const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.chatContainer}>
          <MessagesList />
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Type your message..." />
        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const MessagesList = () => {
  const state: any = {}; //useContext(chatContext);

  return (
    <View style={styles.messagesContainer}>
      {state?.messages ? (
        state?.messages?.map((m, idx) => (
          <MessageComponent
            isAvatarBefore={m.role === ROLE.RESPONSE}
            message={m.message ?? ""}
            key={idx}
          />
        ))
      ) : (
        <>
          <MessageComponent isAvatarBefore={false} message={"Hello"} />
          <MessageComponent
            isAvatarBefore={true}
            message={"Hello, how can I assist you!"}
          />
        </>
      )}
    </View>
  );
};

const MessageComponent = ({ isAvatarBefore, message }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        !isAvatarBefore ? styles.alignEnd : null,
      ]}
    >
      {isAvatarBefore && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🤖</Text>
        </View>
      )}

      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{message}</Text>
      </View>

      {!isAvatarBefore && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>😎</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Color.gray,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: Color.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  sendButton: {
    backgroundColor: Color.royalBlue,
    borderRadius: 5,
    padding: 8,
    alignItems: "center",
  },
  sendButtonText: {
    color: Color.white,
    fontWeight: "bold",
  },
  messagesContainer: {
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  alignEnd: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  avatarText: {
    fontSize: 20,
  },
  messageBubble: {
    backgroundColor: Color.extraLightGray,
    padding: 12,
    borderRadius: 8,
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 16,
  },
});
