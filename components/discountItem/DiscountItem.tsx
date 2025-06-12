import { Colors } from "@/constants/Colors";
import { Images } from "@/constants/Images";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, ImageSource } from "expo-image";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface DiscountItemPropsType {
  discount?: number;
  imageSource?: string | ImageSource;
  itemTitle?: string;
  itemManufacturer?: string;
  itemUnit?: string;
  itemVersions?: string[];
  itemUnitAmmount?: number;
  itemDiscountPrice?: number;
  itemOriginalPrice?: number;
}

const DiscountItem: React.FC<DiscountItemPropsType> = ({
  discount = 10,
  imageSource = Images.testImage,
  itemTitle = "Čipi Čips",
  itemManufacturer = "Chio",
  itemUnit = "g",
  itemVersions = ["Slani", "Paprika"],
  itemUnitAmmount = 55,
  itemDiscountPrice = 3,
  itemOriginalPrice = 4.99,
}) => {
  const [liked, setLiked] = useState<boolean>(false);

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <View style={styles.discountItemContainer}>
      <View style={styles.topSection}>
        <View style={styles.dicountTextContainer}>
          <Text style={styles.discountText}>{`-${discount}%`}</Text>
        </View>
        <View style={styles.heartIconContainer}>
          <TouchableWithoutFeedback onPress={toggleLike}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={30}
              color={Colors.bingo_main}
              // style={{col}}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.middleSection}>
        <Image
          source={imageSource}
          style={{ width: "90%", height: "90%" }}
          contentFit="contain"
        ></Image>
      </View>
      <View style={styles.itemDescriptionContainer}>
        <Text style={styles.itemTitleText}>{itemTitle + " "}</Text>{" "}
        <Text
          style={[styles.itemTitleText, { fontFamily: "Montserrat_700Bold" }]}
        >
          {itemManufacturer}
        </Text>{" "}
        <Text style={styles.itemTitleText}>
          {`(${itemVersions.join(" - ")}) ${itemUnitAmmount}${itemUnit}`}
        </Text>
      </View>
      <View style={styles.pricesContainer}>
        <Text
          style={{
            fontSize: 35,
            fontFamily: "Montserrat_700Bold",
            color: Colors.bingo_main,
            textDecorationLine: "underline",
          }}
        >
          {itemDiscountPrice.toFixed(2)}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Montserrat_700Bold",
            color: Colors.bingo_main,
            textDecorationLine: "underline",
            alignSelf: "center"
          }}
        >
          KM
        </Text>
        <Text
          style={{
            fontSize: 12,
            alignSelf: "flex-start",
            fontFamily: "Montserrat_500Medium",
            marginLeft: 10,
            textDecorationLine: "line-through",
          }}
        >
          {itemOriginalPrice}
        </Text>
      </View>
    </View>
  );
};

export default DiscountItem;

const styles = StyleSheet.create({
  // --- SHADOW added here ---
  discountItemContainer: {
    width: width * 0.43,
    height: height * 0.35,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 20,
    // For Android shadow
    elevation: 5, // <-- Here's the shadow for Android
    // For iOS shadow
    shadowColor: "#000", // <-- Here's the shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // <-- Shadow direction
    shadowOpacity: 0.25, // <-- Shadow intensity
    shadowRadius: 3.84, // <-- Shadow blur
  },
  topSection: {
    width: "100%",
    height: "15%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
  },
  dicountTextContainer: {
    width: "50%",
    height: "100%",
    backgroundColor: Colors.bingo_main,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
  },
  discountText: {
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 28,
    color: "white",
  },
  heartIconContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
    borderTopRightRadius: 20,
  },
  middleSection: {
    width: "100%",
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
  },

  // --- DIVIDER added here ---
  itemDescriptionContainer: {
    width: "90%",
    height: "18%",
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomWidth: 1, // <-- Creates the line
    borderBottomColor: "#E0E0E0", // <-- The color of the line
    paddingBottom: 20, // <-- Adds space between the text and the line
  },
  itemTitleText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  pricesContainer: {
    width: "90%",
    height: "20%",
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 5, // <-- Adds a little space above the prices, below the divider
  },
});
