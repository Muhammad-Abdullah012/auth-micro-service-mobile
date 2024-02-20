import { PixelRatio, Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export const widthPercentageToDp = (percentage: string) => {
  const percentageRegex = /^\d{1,3}%$/;
  console.assert(percentageRegex.test(percentage), "Invalid percentage format");
  console.assert(
    Number(percentage.split("%")[0]) <= 100,
    "Percentage value not allowed more than 100"
  );
  return PixelRatio.roundToNearestPixel(
    (Number(percentage.split("%")[0]) * SCREEN_WIDTH) / 100
  );
};

export const heightPercentageToDp = (percentage: string) => {
  const percentageRegex = /^\d{1,3}%$/;
  console.assert(percentageRegex.test(percentage), "Invalid percentage format");
  console.assert(
    Number(percentage.split("%")[0]) <= 100,
    "Percentage value not allowed more than 100"
  );
  return PixelRatio.roundToNearestPixel(
    (Number(percentage.split("%")[0]) * SCREEN_HEIGHT) / 100
  );
};
