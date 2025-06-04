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
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
const { height } = Dimensions.get("window");

const RegisterPage = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ alignItems: "center" }}>
      <OvalHeaders headerText="Kreiraj nalog" />
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
      <View style={styles.inputsContainer}>
        <TextInputWithIcon
          placeholderText="Vaša email adresa"
          iconSource={Icons.mail}
        />
        <TextInputWithIcon
          placeholderText="Vaša lozinka"
          iconSource={Icons.mail}
        />
      </View>
    </View>
  );
};

export default RegisterPage;

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
