import { Colors } from "@/constants/Colors";
import { Montserrat_400Regular, useFonts } from "@expo-google-fonts/montserrat";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CopyrightProps {
  isWhite?: boolean;
}

const Copyright: React.FC<CopyrightProps> = ({ isWhite = false }) => {
  const { bottom } = useSafeAreaInsets();
  console.log(bottom)
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[ styles.copyrightContainer, {bottom: bottom + 10}]}>
      <Text
        style={[
          styles.copyrightText,
          {
            fontFamily: "Montserrat_400Regular",
            color: isWhite ? Colors.bingo_white : Colors.bingo_gray,
          },
        ]}
      >
        Bingo Group © 2025
      </Text>
    </View>
  );
};

export default Copyright;

const styles = StyleSheet.create({
  copyrightContainer: {
    position: "absolute",
  },
  copyrightText: {
    fontSize: 13,
  },
});
