import { Icons } from "@/constants/Icons";
import { Montserrat_700Bold, useFonts } from "@expo-google-fonts/montserrat";
import { Image } from "expo-image";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface OvalHeadersProps {
  headerText?: string;
  adjustRight?: number;
  isKeyboardDisplayed?: boolean;
}

const OvalHeaders: React.FC<OvalHeadersProps> = ({
  headerText = "Testni text",
  adjustRight = 0,
  isKeyboardDisplayed = false,
}) => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        { paddingRight: adjustRight ? 40 + adjustRight : 40 },
      ]}
    >
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={Icons.chevronBack}
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{headerText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width + width * 0.3,
    height: height / 3.3,
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width * 3,
    // transform: [{ rotate: "-10.73deg" }],
    flexShrink: 0,
    position: "absolute",
    top: -height / 20,
    left: -width * 0.1,
    backgroundColor: "#399A19",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9.4,
    elevation: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "40%",
  },
  iconContainer: {
    marginTop: "10%",
    width: 15,
    height: 22,
    // backgroundColor: "red",
    // transform: [{ rotate: "10.73deg" }],
  },
  textContainer: {
    marginTop: "10%",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
  },
});

export default OvalHeaders;
