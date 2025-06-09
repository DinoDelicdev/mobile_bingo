import ActionButton from "@/components/buttons/ActionButton";
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
import { useFocusEffect } from '@react-navigation/native';
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
const { height } = Dimensions.get("window");

const LoginPage = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(false); 
  const [isPasswordError, setIsPasswordError] = useState(false); 
  const [isUserNameError, setIsUserNameError] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

 
  useFocusEffect(
    useCallback(() => {
      setUserEmail("");
      setUserPassword("");
      setIsEmailError(false);
      setIsPasswordError(false);
      return () => {
        
      };
    }, [])
  );

  const handleRegister = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      console.log("Attempting to log in with:", userEmail, userPassword);
      router.push("/(tabs)");
    } else {
      console.log("Login failed due to validation errors.");
    }
  };

   const handleSetUserName = (text: string) => {
    setUserName(text);
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

  const validateUserName = () => {
    const isValid = userName.length >= 1
    setIsUserNameError(!isValid)
    return isValid
  }

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

  const isLoginButtonDisabled =
    !userEmail || !userPassword || isEmailError || isPasswordError;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <OvalHeaders
        isKeyboardDisplayed={keyboardShown}
        headerText="Kreiraj Nalog"
        adjustRight={20}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          {
            paddingTop: keyboardShown ? 20 : height / 3.6, 
          },
        ]}
        keyboardShouldPersistTaps="handled" 
        showsVerticalScrollIndicator={false} 
      >
        {!keyboardShown && (
          <View style={styles.textContainer}>
            <Text
              style={[styles.titleText, { fontFamily: "Montserrat_700Bold" }]}
            >
              Registracija
            </Text>
            <Text
              style={[
                styles.subtitleText,
                { fontFamily: "Montserrat_400Regular" },
              ]}
            >
              Postanite dio naše zajednice ! Kreiranje naloga omogućava vam brz
              pristup sadržajima, interakciju s drugim korisnicima i mnogo više.
            </Text>
          </View>
        )}

        <View
          style={[
            styles.inputsContainer,
          ]}
        >
          <TextInputWithIcon
            placeholderText="Ime i Prezime"
            iconSource={<Ionicons name="person-circle-outline" size={30} />}
            handler={handleSetUserName}
            inputType="emailAddress"
            value={userName}
            isError={isUserNameError}
            onEndEditing={validateUserName}
          />
          <TextInputWithIcon
            placeholderText="Broj Telefona"
            iconSource={<Ionicons name="call" size={24} />}
            handler={handleSetUserPassword}
            inputType="telephoneNumber"
            value={userPassword}
            isError={isPasswordError}
            onEndEditing={validatePassword}
          />

          <TextInputWithIcon
            placeholderText="Vas Email"
            iconSource={<Ionicons name="mail" size={24} />}
            handler={handleSetUserEmail}
            inputType="telephoneNumber"
            value={userPassword}
            isError={isPasswordError}
            onEndEditing={validateEmail}
          />
          
        </View>
        <View style={styles.buttonsContainer}>
          <ActionButton
            buttonText={"Registrujte se"}
            action={handleRoutingToRegister}
            disabled={isLoginButtonDisabled} 
          />
        </View>
        
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  textContainer: {
    width: "85%",
    alignItems: 'center', 
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center', 
  },
  subtitleText: {
    fontSize: 16,
    textAlign: 'center',
  },
  inputsContainer: {
    width: "85%",
    gap: 10,
   
  },
  buttonsContainer: {
    width: "85%",
    gap: 10,
   
  },
  scrollViewContent: {
    flexGrow: 1, 
    alignItems: "center",
    gap: 20,
    paddingBottom: 20, 
  },
});