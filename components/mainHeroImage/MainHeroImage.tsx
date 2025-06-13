import { Images } from "@/constants/Images";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Carousel from "../carousel/Carousel";
import DiscountItem from "../discountItem/DiscountItem";

const { height: screenHeight } = Dimensions.get("window");


const MainHeroImage = () => {
  return (
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
      <View style={styles.carouselWrapper}>
        <Carousel itemsPerInterval={2}>
          <DiscountItem key="carousel-item-1" />
          <DiscountItem key="carousel-item-2" />
          <DiscountItem key="carousel-item-3" />
        </Carousel>
      </View>
    </View>
  );
};

export default MainHeroImage;

const styles = StyleSheet.create({imageContainer: {
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
  },});
