import { Colors } from "@/constants/Colors";
import { Images } from "@/constants/Images";
import { Montserrat_300Light, Montserrat_700Bold, useFonts } from "@expo-google-fonts/montserrat";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const MainPageHeaders = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_300Light
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.backgroundShape} />
      <View style={styles.contentContainer}>
        <View style={styles.firstSection}>
          <View style={styles.logoContainer}>
            <Image
              source={Images.logoMain}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </View>
          <View style={styles.linksContainer}>
            <TouchableOpacity>
              <Text style={[styles.linksText, {fontFamily: "Montserrat_300Light"}]}>Newsletter</Text>
            </TouchableOpacity>
            <Text style={[styles.linksText, {fontFamily: "Montserrat_300Light"}]}>|</Text>
            <TouchableOpacity>
              <Text style={[styles.linksText, {fontFamily: "Montserrat_300Light"}]}>Technoshop</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.secondSection}>
          {" "}
          <TouchableOpacity
            style={{
              width: "18%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.bingo_dark,
              borderRadius: "100%",
            }}
          >
            <Ionicons name="menu" size={40} color="white" />
          </TouchableOpacity>
          <View
            style={{
              width: "75%",
              height: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              //   backgroundColor: "purple",
            }}
          >
            <TextInput
              style={{
                width: "100%",
                height: "80%",
                backgroundColor: "white",
                borderRadius: 50,
                paddingHorizontal: 10,
              }}
              placeholder="Pretraga"
            />
          </View>
        </View>
      </View>

      {/* <Text style={styles.text}>Dobrodošli</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    height: width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -height * 0.18,
    zIndex: 10,
    // backgroundColor: "blue",
  },
  backgroundShape: {
    position: "absolute",
    width: width,
    height: width,
    backgroundColor: "#399A19",
    borderBottomLeftRadius: width / 2,
    borderBottomRightRadius: width / 2,
    transform: [{ scaleX: 2 }, { rotate: "15deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 9.4,
    elevation: 6,
  },
  contentContainer: {
    marginTop: height * 0.2,
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  firstSection: {
    width: width * 0.95,
    height: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoContainer: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  linksContainer: {
    width: "45%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    //   backgroundColor: "purple",
  },
  linksText: {
    color: "white",
    fontSize: 13
  },
  secondSection: {
    width: width * 0.95,
    height: "30%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
  },
});

export default MainPageHeaders;
