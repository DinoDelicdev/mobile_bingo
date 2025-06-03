// app/welcome.tsx
import { Colors } from "@/constants/Colors";
import { Images } from "@/constants/Images";
import {
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_800ExtraBold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

function WelcomeScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  const handleGetStarted = () => {
    router.replace("/(tabs)");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <View style={styles.logoContainer}>
        <Image
          source={Images.logoMain}
          style={styles.logoImage}
          contentFit="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { fontFamily: "Montserrat_800ExtraBold" }]}>
          Dobrodošli u Bingo
        </Text>
        <Text
          style={[styles.subtitle, { fontFamily: "Montserrat_400Regular" }]}
        >
          Najbolje mjesto za kupovinu. Pridružite nam se danas.
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.buttonsShared, styles.loginButton]}>
          <Text
            style={[
              styles.buttonTextShared,
              { fontFamily: "Montserrat_500Medium" },
            ]}
          >
            Prijavi se
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonsShared, styles.registerButton]}>
          <Text
            style={[
              styles.buttonTextShared,
              { fontFamily: "Montserrat_500Medium" },
            ]}
          >
            Prijavi se
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonsShared}>
          <Text
            style={[
              styles.buttonTextShared,
              { fontFamily: "Montserrat_500Medium" },
            ]}
          >
            Prijavi se
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bingo_main,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  logoImage: {
    width: "40%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    height: "20%",
    width: "75%",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#eee",
  },
  buttonsContainer: {
    height: "25%",
    gap: 10,
    justifyContent: "space-between",
    width: "85%",
  },

  buttonsShared: {
    height: "30%",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "white",
  },
  registerButton: {
    backgroundColor: Colors.bingo_dark,
  },
  buttonTextShared: {
    fontSize: 15,
  },
});
