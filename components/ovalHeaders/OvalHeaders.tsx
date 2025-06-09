import { Icons } from "@/constants/Icons";
import { Montserrat_700Bold, useFonts } from "@expo-google-fonts/montserrat";
import { Image } from "expo-image";
import { router } from "expo-router";
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
        {
          paddingRight: adjustRight ? 40 + adjustRight : 40,
          paddingLeft: adjustRight ? 40 : 0,
          width: isKeyboardDisplayed ? width : 1.3 * width,
          height: isKeyboardDisplayed ? "15%" : height / 3.3,
          borderBottomLeftRadius: isKeyboardDisplayed ? 70 : width,
          borderBottomRightRadius: isKeyboardDisplayed ? 40 : width * 3,
          top: isKeyboardDisplayed ? 0 : -height / 20,
          left: isKeyboardDisplayed ? 0 : -width * 0.1,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          router.push("/");
        }}
      >
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
    // transform: [{ rotate: "-10.73deg" }],
    flexShrink: 0,
    position: "absolute",
    zIndex: 20,
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
