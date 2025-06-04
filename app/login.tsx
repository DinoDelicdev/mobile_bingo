import ActionButton from "@/components/buttons/ActionButton";
import Copyright from "@/components/copyright/Copyright";
import TextInputWithIcon from "@/components/inputFields/TextInputWithIcon";
import OvalHeaders from "@/components/ovalHeaders/OvalHeaders";
import { Icons } from "@/constants/Icons";
import {
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
const { height } = Dimensions.get("window");

const LoginPage = () => {
    const [keyboardShown, setKeyboardShown] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  const handleLogin = () => {
    router.push("/(tabs)");
  };

  const handleRoutingToRegister = () => {
    router.push("/register");
  };
  
  useEffect(() => {
    const subscribeShown = Keyboard.addListener("keyboardDidShow", (event) => {
      console.log(event);
      setKeyboardShown(true);
      setKeyboardHeight(event.endCoordinates.height)
    });

    const subscribeHide = Keyboard.addListener("keyboardDidHide", (event) => {
      console.log(event);
      setKeyboardShown(false);
      setKeyboardHeight(0)
    });

    return () => {
      console.log("ZDRAO");
      subscribeShown.remove();
      subscribeHide.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
      <OvalHeaders headerText="Prijava" />
      <View style={styles.textContainer}>
        <Text style={[styles.titleText, { fontFamily: "Montserrat_700Bold" }]}>
          Dobro došli nazad !
        </Text>
        <Text
          style={[styles.subtitleText, { fontFamily: "Montserrat_400Regular" }]}
        >
          Molimo prijavite se kako biste nastavili.
        </Text>
      </View>

      <View style={[styles.inputsContainer, {paddingBottom: keyboardShown ? 40 : 0 }]}>
        <TextInputWithIcon
          placeholderText="Vaša email adresa"
          iconSource={Icons.mail}
        />
        <TextInputWithIcon
          placeholderText="Vaša lozinka"
          iconSource={Icons.mail}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ActionButton buttonText={"Prijavite se"} action={handleLogin} />
        <ActionButton
          buttonText={"Registrujte se"}
          action={handleRoutingToRegister}
        />
      </View>
      <Copyright />
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  textContainer: {
    marginTop: height / 2.5,
    height: "12%",
    width: "85%",
    borderBottomWidth: 1.5,
    borderBottomColor: "lightgray",
    // backgroundColor: "blue",
  },
  titleText: {
    fontSize: 22,
  },
  subtitleText: {
    fontSize: 16,
  },
  inputsContainer: {
    width: "85%",
    gap: 10,
    height: "20%",
    justifyContent: "center",
    // backgroundColor: "blue"
  },
  buttonsContainer: {
    width: "85%",
    gap: 10,
    height: "20%",
    // justifyContent: "center",
    // backgroundColor: "blue",
  },
});
