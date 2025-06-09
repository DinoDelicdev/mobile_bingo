import ActionButton from "@/components/buttons/ActionButton";
import Copyright from "@/components/copyright/Copyright";
import TextInputWithIcon from "@/components/inputFields/TextInputWithIcon";
import OvalHeaders from "@/components/ovalHeaders/OvalHeaders";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
const { height } = Dimensions.get("window");

const LoginPage = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(false); // State for email error
  const [isPasswordError, setIsPasswordError] = useState(false); // State for password error

  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  const handleLogin = () => {
    // TO DO: Backend logic
    router.push("/(tabs)");
  };

  const handleSetUserEmail = (text: string) => {
    setUserEmail(text);

    if (isEmailError) {
      setIsEmailError(false);
    }
  };

  const handleSetUserPassword = (text: string) => {
    setUserPassword(text);
    if (isPasswordError) {
      setIsPasswordError(false);
    }
  };

  const handleRoutingToRegister = () => {
    router.push("/register");
  };

  const validateEmail = () => {
    if (!userEmail) {
      setIsEmailError(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(userEmail);
    setIsEmailError(!isValid);
    return isValid;
  };

  const validatePassword = () => {
    const isValid = userPassword.length >= 6;
    setIsPasswordError(!isValid);
    return isValid;
  };

  useEffect(() => {
    const subscribeShown = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShown(true);
    });

    const subscribeHide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShown(false);
    });

    return () => {
      subscribeShown.remove();
      subscribeHide.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
      {!keyboardShown && <OvalHeaders headerText="Prijava" />}
      {!keyboardShown && (
        <View style={styles.textContainer}>
          <Text
            style={[styles.titleText, { fontFamily: "Montserrat_700Bold" }]}
          >
            Dobro došli nazad !
          </Text>
          <Text
            style={[
              styles.subtitleText,
              { fontFamily: "Montserrat_400Regular" },
            ]}
          >
            Molimo prijavite se kako biste nastavili.
          </Text>
        </View>
      )}

      <View
        style={[
          styles.inputsContainer,
          {
            paddingBottom: keyboardShown ? 40 : 0,
            marginTop: keyboardShown ? "30%" : 0,
          },
        ]}
      >
        <TextInputWithIcon
          placeholderText="Vaša email adresa"
          iconSource={<Ionicons name="mail" size={20} />}
          handler={handleSetUserEmail}
          inputType="emailAddress"
          value={userEmail} 
          isError={isEmailError} 
          onEndEditing={validateEmail} 
        />
        <TextInputWithIcon
          placeholderText="Vaša lozinka"
          iconSource={<Ionicons name="lock-closed" size={20} />}
          handler={handleSetUserPassword}
          inputType="password"
          value={userPassword} 
          isError={isPasswordError} 
          onEndEditing={validatePassword} 
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
    marginTop: height / 3.6,
    height: "12%",
    width: "85%",
    // borderBottomWidth: 1.5,
    // borderBottomColor: "lightgray",
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
    height: "24%",
    justifyContent: "center",
  },
  buttonsContainer: {
    width: "85%",
    gap: 10,
    height: "20%",
  },
});
