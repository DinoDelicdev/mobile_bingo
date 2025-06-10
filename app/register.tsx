import ActionButton from "@/components/buttons/ActionButton";
import CalendarPicker from "@/components/inputFields/CalendarPicker";
import SexPicker from "@/components/inputFields/SexPicker";
import TextInputWithIcon from "@/components/inputFields/TextInputWithIcon";
import OvalHeaders from "@/components/ovalHeaders/OvalHeaders";
import { Colors } from "@/constants/Colors";
import { BACKEND_ADDRESS } from "@/secrets/secrets";
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
import {
  Dimensions,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const LoginPage = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [displayDatePicker, setDisplayDatePicker] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmedPasswordError, setIsConfirmedPasswordError] =
    useState(false);
  const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);
  const [isUserNameError, setIsUserNameError] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

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

  const validateConfirmedPassword = () => {
    const isValid = userPassword === confirmedPassword;
    setIsConfirmedPasswordError(!isValid);
    return isValid;
  };

  const validateUserName = () => {
    const isValid = userName.length >= 1;
    setIsUserNameError(!isValid);
    return isValid;
  };

  const validatePhoneNumber = () => {
    const phoneRegex = /^\+?\d{10,15}$/;
    const isValid = phoneRegex.test(userPhoneNumber);
    setIsPhoneNumberError(!isValid);
    return isValid;
  };

  const handleRegister = async () => {
    const isNameValid = validateUserName();
    const isPhoneValid = validatePhoneNumber();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmedPassword();

    if (
      isNameValid &&
      isPhoneValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      console.log(
        "Attempting to register with:",
        userName,
        userEmail,
        userPhoneNumber,
        userPassword,
        confirmedPassword,
        selectedSex,
        birthDate
      );

      const registrationFetchResponse = await fetch(
        `${BACKEND_ADDRESS}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userName,
            email: userEmail,
            phoneNumber: userPhoneNumber,
            password: userPassword,
            birthDate: birthDate ? birthDate.toISOString().split("T")[0] : null,
            sex: selectedSex,
          }),
        }
      );

      if (!registrationFetchResponse.ok) {
        console.error("Registration failed:", registrationFetchResponse.status);
        return;
      }
      router.push("/(tabs)");
    } else {
      console.log("Registration failed due to validation errors.");
    }
  };

  const handleSetUserName = (text: string) => {
    setUserName(text);
    if (isUserNameError) setIsUserNameError(false);
  };
  const handleSetUserEmail = (text: string) => {
    setUserEmail(text);
    if (isEmailError) setIsEmailError(false);
  };
  const handleSetUserPhoneNumber = (text: string) => {
    setUserPhoneNumber(text);
    if (isPhoneNumberError) setIsPhoneNumberError(false);
  };
  const handleSetUserPassword = (text: string) => {
    setUserPassword(text);
    if (isPasswordError) setIsPasswordError(false);
  };

  const handleSetConfirmedPassword = (text: string) => {
    setConfirmedPassword(text);
    if (isConfirmedPasswordError) setIsConfirmedPasswordError(false);
  };

  const handleSettingBirthDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate ?? birthDate;
    setDisplayDatePicker(Platform.OS === "ios");
    setBirthDate(currentDate);
  };

  const handleSettingSex = (value: string | null) => {
    setSelectedSex(value);
  };

  const handleSettingFocusedInput = (focused: boolean) => {
    setFocusedInput(focused);
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

  const isRegisterButtonDisabled =
    !userName ||
    !userPhoneNumber ||
    !userEmail ||
    !userPassword ||
    !confirmedPassword;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <OvalHeaders
        isKeyboardDisplayed={keyboardShown}
        headerText="Kreiraj Nalog"
        adjustRight={20}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          {
            paddingTop: keyboardShown ? "25%" : height / 3.9,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {!keyboardShown ? (
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
              Postanite dio naše zajednice! Kreiranje naloga omogućava vam brz
              pristup sadržajima, interakciju s drugim korisnicima i mnogo više.
            </Text>
          </View>
        ) : null}

        <View style={[styles.inputsContainer]}>
          {!focusedInput ? (
            <TextInputWithIcon
              placeholderText="Ime i Prezime"
              iconSource={<Ionicons name="person-circle-outline" size={30} />}
              handler={handleSetUserName}
              inputType="name"
              value={userName}
              isError={isUserNameError}
              onEndEditing={validateUserName}
              setFocused={handleSettingFocusedInput}
            />
          ) : null}

          <TextInputWithIcon
            placeholderText="Broj telefona (+387 6X XXX XXX)"
            iconSource={<Ionicons name="call" size={24} />}
            handler={handleSetUserPhoneNumber}
            inputType="telephoneNumber"
            value={userPhoneNumber}
            isError={isPhoneNumberError}
            onEndEditing={validatePhoneNumber}
            setFocused={handleSettingFocusedInput}
          />

          <TextInputWithIcon
            placeholderText="Vaš Email"
            iconSource={<Ionicons name="mail" size={24} />}
            handler={handleSetUserEmail}
            inputType="emailAddress"
            value={userEmail}
            isError={isEmailError}
            onEndEditing={validateEmail}
            setFocused={handleSettingFocusedInput}
          />

          <TextInputWithIcon
            placeholderText="Vaša lozinka"
            iconSource={<Ionicons name="lock-closed" size={20} />}
            handler={handleSetUserPassword}
            inputType="password"
            value={userPassword}
            isError={isPasswordError}
            onEndEditing={validatePassword}
            setFocused={handleSettingFocusedInput}
          />

          <TextInputWithIcon
            placeholderText="Potvrdite vašu lozinku"
            iconSource={<Ionicons name="lock-closed" size={20} />}
            handler={handleSetConfirmedPassword}
            inputType="password"
            value={confirmedPassword}
            isError={isConfirmedPasswordError}
            onEndEditing={validateConfirmedPassword}
            setFocused={handleSettingFocusedInput}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.secondTitleText,
              { fontFamily: "Montserrat_700Bold" },
            ]}
          >
            Ostale Informacije
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <SexPicker
            selectedSex={selectedSex}
            setSelectedSex={handleSettingSex}
          />
          <CalendarPicker
            date={birthDate}
            handleSettingDate={handleSettingBirthDate}
            displayDatePicker={displayDatePicker}
            setShowDatePicker={setDisplayDatePicker}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <ActionButton
            buttonText={"Registrujte se"}
            action={handleRegister}
            disabled={isRegisterButtonDisabled}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  textContainer: { width: "85%" },
  titleText: { fontSize: 22, paddingBottom: 30 },
  secondTitleText: {
    fontSize: 18,
    paddingBottom: 20,
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: Colors.bingo_gray,
  },
  subtitleText: { fontSize: 16 },
  inputsContainer: { width: "85%", gap: 15 },
  buttonsContainer: { width: "85%", gap: 10 },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    alignItems: "center",
    paddingBottom: 20,
  },
});
