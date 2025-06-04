import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

interface TextInputWithIconPropType {
  placeholderText: string;
  iconSource: ImageSourcePropType;
}

const TextInputWithIcon: React.FC<TextInputWithIconPropType> = ({
  placeholderText,
  iconSource,
}) => {
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  return (
    <View style={styles.container}>
      <Image source={iconSource} style={styles.icon} />
      <TextInput
        style={[styles.input, {fontFamily: "Montserrat_500Medium"}]}
        placeholder={placeholderText}
        keyboardAppearance="light"
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: Colors.bingo_black,
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
