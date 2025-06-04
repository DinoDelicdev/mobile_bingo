import { Colors } from "@/constants/Colors";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ActionButtonProp {
  buttonText: string;
  action: () => void;
}

const ActionButton: React.FC<ActionButtonProp> = ({ buttonText, action }) => {
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <Text style={[styles.text, { fontFamily: "Montserrat_500Medium" }]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: Colors.bingo_main,
    justifyContent: "center",
  },
  text: {
    color: Colors.bingo_white,
  },
});
