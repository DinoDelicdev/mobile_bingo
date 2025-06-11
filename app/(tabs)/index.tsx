import Carousel from "@/components/carousel/Carousel";
import DiscountItem from "@/components/discountItem/DiscountItem";
import MainPageHeaders from "@/components/ovalHeaders/MainPageHeaders";
import { Images } from "@/constants/Images";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { Image } from "expo-image";
// --- CHANGE: Import Dimensions ---
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

// --- CHANGE: Get screen height ---
const { height: screenHeight } = Dimensions.get("window");

export default function HomeScreen() {
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Added zIndex to ensure header stays on top */}
      <View style={{ zIndex: 1 }}>
        <MainPageHeaders />
      </View>

      {/* This container holds both the image and the overlapping carousel */}
      <View style={styles.imageContainer}>
        <Image
          source={Images.heroImage}
          style={styles.heroImage}
          contentFit="contain"
        />
        <View style={styles.imageTextContainer}>
          <Text style={styles.titleText}>Dobro došli</Text>
          <Text style={styles.subtitleText}>
            Tvoja pametna kupovina počinje ovdje - akcije, uštede i
            personalizovane ponude.
          </Text>
        </View>

        {/* The Carousel is positioned absolutely relative to the imageContainer */}
        <View style={styles.carouselWrapper}>
          <Carousel itemsPerInterval={2}>
            <DiscountItem key="carousel-item-1" />
            <DiscountItem key="carousel-item-2" />
            <DiscountItem key="carousel-item-3" />
            <DiscountItem key="carousel-item-4" />
          </Carousel>
        </View>
      </View>

      {/* These items are now part of the main scroll flow */}
      <View style={styles.bottomContent}>
        <DiscountItem key="bottom-item-1" />
        <DiscountItem key="bottom-item-2" />
        <DiscountItem key="bottom-item-3" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    height: screenHeight * 0.66,
    width: "100%",
    marginTop: - (screenHeight * 0.1),
    position: "relative",
  },
  carouselWrapper: {
    position: "absolute",
    bottom: - (screenHeight * 0.1),
    height: screenHeight * 0.3,
    width: "100%",
  },
  bottomContent: {
    marginTop: screenHeight * 0.08,
    paddingHorizontal: 10,
    gap: 10,
  },
  // --- CHANGES END HERE ---
  heroImage: { width: "100%", height: "100%" },
  imageTextContainer: {
    width: "50%",
    position: "absolute",
    top: "30%",
    left: 20,
    paddingRight: 20,
  },
  titleText: {
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 24,
  },
  subtitleText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
    marginTop: 10,
  },
});
