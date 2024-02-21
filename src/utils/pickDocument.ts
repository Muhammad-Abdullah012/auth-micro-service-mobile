import { getDocumentAsync } from "expo-document-picker";

export const selectImage = async () => {
  return getDocumentAsync({ type: "image/*", copyToCacheDirectory: false });
};
