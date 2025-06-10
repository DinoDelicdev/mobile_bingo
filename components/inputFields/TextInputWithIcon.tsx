import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface TextInputWithIconPropType {
  placeholderText: string;
  iconSource: React.ReactNode;
  handler: (text: string) => void;
  inputType: "emailAddress" | "password" | "telephoneNumber" | "name";
  isError?: boolean;
  value: string;
  onEndEditing?: () => void;
  setFocused?: (focused: boolean) => void;
}

const errorMessages = {
  emailAddress: "Uneseni email nije u pravom formatu",
  password: "Šifra mora biti duga najmanje 6 karaktera",
  telephoneNumber: "Unesite ispravan broj telefona",
  name: "Unesite ispravno ime",
};

const TextInputWithIcon: React.FC<TextInputWithIconPropType> = ({
  placeholderText,
  iconSource,
  handler,
  inputType,
  isError = false,
  value,
  onEndEditing,
  setFocused = () => {},
}) => {
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            borderWidth: isError ? 2 : 0,
            borderColor: isError ? "red" : "transparent",
          },
        ]}
      >
        <View style={styles.icon}>{iconSource}</View>
        <TextInput
          style={[styles.input, { fontFamily: "Montserrat_500Medium" }]}
          placeholder={placeholderText}
          keyboardAppearance="light"
          scrollEnabled={true}
          textContentType="password"
          onChangeText={handler}
          value={value}
          secureTextEntry={inputType === "password"}
          onEndEditing={onEndEditing}
          keyboardType={
            inputType === "telephoneNumber" ? "phone-pad" : "default"
          }
          onFocus={() => {
            if (inputType === "password") {
              console.log("Focused on password input");
              setFocused(true);
            } else {
              setFocused(false);
            }
          }}
        />
      </View>
      {isError ? (
        <Text style={{ fontSize: 10, color: "red" }}>
          {errorMessages[inputType]}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "lightgray",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
});

export default TextInputWithIcon;
