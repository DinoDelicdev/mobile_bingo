import Carousel from "@/components/carousel/Carousel";
import DiscountItem from "@/components/discountItem/DiscountItem";
import FreshItem from "@/components/freshItem/FreshItem";
import MainHeroImage from "@/components/mainHeroImage/MainHeroImage";
import MainPageHeaders from "@/components/ovalHeaders/MainPageHeaders";
import SensationItem from "@/components/sensationItem/SensationItem";
import { Images } from "@/constants/Images";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { Asset } from "expo-asset";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

// Helper function to preload images (no changes here)
function cacheImages(images: (string | number)[]) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const discountItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function HomeScreen() {
  const [isAppReady, setAppReady] = useState(false);
  const [displayedItems, setDisplayedItems] = useState<number[]>([]);

  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  useEffect(() => {
    async function prepare() {
      await cacheImages([Images.heroImage]);
    }
    prepare();
  }, []);

  useEffect(() => {
    setDisplayedItems(discountItems.slice(0, 4));
  }, []);

  // --- NEW: This function is called when the layout is calculated ---
  // We only set the app as "ready" when both fonts are loaded AND
  // the layout calculation is complete.
  const onLayout = () => {
    if (fontsLoaded) {
      setAppReady(true);
    }
  };

  // First, we must wait for fonts to load. Without them, the layout
  // calculation will be incorrect. Show a loader while this happens.
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <ScrollView
        style={{ opacity: isAppReady ? 1 : 0 }} // Content is invisible until ready
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onLayout={onLayout} // Triggers readiness when layout is calculated
      >
        <View style={{ zIndex: 1 }}>
          <MainPageHeaders />
        </View>

        {/* <View style={styles.imageContainer}>
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
          <View style={styles.carouselWrapper}>
            <Carousel itemsPerInterval={2}>
              <DiscountItem key="carousel-item-1" />
              <DiscountItem key="carousel-item-2" />
              <DiscountItem key="carousel-item-3" />
            </Carousel>
          </View>
        </View> */}

        <MainHeroImage />

        <View style={styles.middleGraySectionContainer}>
          <View style={{ width: "90%", padding: 10 }}>
            <Text style={styles.mainSectionTitleText}>SENZACIJA</Text>
            <Text style={styles.mainSectionSubtitleText}>
              Samo za tebe - najatraktivnije ponude iz naše kataloške akcije.
            </Text>
          </View>
          <View style={styles.sensationCarouselWrapper}>
            <Carousel itemsPerInterval={1}>
              <SensationItem key="carousel-item-10" />
              <SensationItem key="carousel-item-20" />
              <SensationItem key="carousel-item-30" />
            </Carousel>
          </View>

          <View style={styles.discountItemsList}>
            {displayedItems.map((item) => (
              <DiscountItem key={`discount-item-${item}`} />
            ))}
          </View>
          {discountItems.length !== displayedItems.length ? (
            <TouchableOpacity
              style={{
                width: "100%",
                height: 50,
                backgroundColor: "black",
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={() => {
                // Load more items when the button is pressed
                setDisplayedItems((prev) => [
                  ...prev,
                  ...discountItems.slice(prev.length, prev.length + 4),
                ]);
              }}
            >
              <Text style={{ color: "white" }}>Učitaj još Artikala</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.freshCornerSectionContainer}>
          <View
            style={{
              // width: "90%",
              padding: 10,
              paddingBottom: 25,
              borderBottomWidth: 1,
            }}
          >
            <Text style={styles.mainSectionTitleText}>
              Predstavljamo Bingo odjele
            </Text>
            <Text style={styles.mainSectionSubtitleText}>
              i super ponudu na odjelima svježeg
            </Text>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <FreshItem />
          </View>
          <View
            style={{
              // width: "90%",
              padding: 10,
              paddingBottom: 25,
            }}
          >
            <Text style={styles.mainSectionSubtitleText}>
              Ne propustite priliku za uštedu i razveselite sebe i svoje
              najdraže kvalitetnim proizvodima po super niskim cijenama.{" "}
            </Text>
          </View>
          <TouchableOpacity></TouchableOpacity>

        </View>
      </ScrollView>

      {/* --- NEW: Show a loader on top until the layout is ready and faded in --- */}
      {!isAppReady && (
        <View style={[StyleSheet.absoluteFill, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // --- NEW: Root container to hold both the content and the overlay loader ---
  rootContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  imageContainer: {
    height: screenHeight * 0.66,
    width: "100%",
    marginTop: -(screenHeight * 0.1),
    position: "relative",
    marginBottom: screenHeight * 0.1,
  },
  carouselWrapper: {
    position: "absolute",
    bottom: -(screenHeight * 0.2),
    height: screenHeight * 0.4,
    width: "100%",
  },

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
  middleGraySectionContainer: {
    marginTop: screenHeight * 0.16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minHeight: screenHeight * 0.3,
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    gap: 10,
    width: "95%",
    borderRadius: 20,
    marginBottom: 20,
  },

  mainSectionTitleText: {
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 30,
    // color: Colors.bingo_main,
  },

  mainSectionSubtitleText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 15,
    marginTop: 10,
  },

  sensationCarouselWrapper: {
    width: "100%",
    height: screenHeight * 0.65,
  },

  discountItemsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 10,
    width: "100%",
    paddingHorizontal: 5,
  },
  freshCornerSectionContainer: {
    width: "95%",
    minHeight: screenHeight * 0.3,
    // backgroundColor: "pink",
    alignItems: "center",
    marginBottom: screenHeight * 0.3,
  },
});
