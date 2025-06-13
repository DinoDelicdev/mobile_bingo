import { Colors } from "@/constants/Colors";
import { Images } from "@/constants/Images";
import { Image, ImageSource } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { height } = Dimensions.get("window");

interface FreshItemPropstype {
  discount?: number;
  imageSource?: string | ImageSource;
  itemTitle?: string;
  itemManufacturer?: string;
  itemUnit?: string;
  itemVersions?: string[];
  itemUnitAmmount?: number;
  itemDiscountPrice?: number;
  itemOriginalPrice?: number;
  actionStartDate?: Date;
  actionEndDate?: Date;
}

const FreshItem: React.FC<FreshItemPropstype> = ({
  discount = 29,
  imageSource = Images.testFruitImage,
  itemTitle = "Avokado",
  itemManufacturer = "Chio",
  itemUnit = "kom",
  itemVersions = ["Slani", "Paprika"],
  itemUnitAmmount = 55,
  itemDiscountPrice = 3,
  itemOriginalPrice = 4.99,
  actionStartDate = new Date("2025-06-16"),
  actionEndDate = new Date("2025-06-26"),
}) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.topSection}>
        <Text style={styles.itemTitle}>
          {itemTitle}, {itemUnit}
        </Text>
        <Text style={styles.discountText}>-{discount}%</Text>
      </View>
      <View style={styles.secondSection}>
        <Text style={styles.discountPriceText}>
          {itemDiscountPrice.toFixed(2)}
        </Text>
        <Text style={styles.currencyText}>KM</Text>
      </View>
      <View style={styles.secondSection}>
        <Text style={styles.originalPriceText}>
          {itemOriginalPrice.toFixed(2)}
        </Text>
        <Text style={styles.currencyText}>{"       "}</Text>
      </View>
      <View style={styles.imageSection}>
        <Image
          source={imageSource}
          style={{ width: "100%", height: 0.4 * height }}
          contentFit="contain"
        ></Image>
      </View>
    </View>
  );
};

export default FreshItem;

const styles = StyleSheet.create({
  rootContainer: { width: "90%", alignItems: "center" },
  topSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  itemTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
  },
  discountText: {
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 30,
    backgroundColor: Colors.bingo_main,
    color: Colors.bingo_white,
    paddingHorizontal: 14,
  },
  secondSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  discountPriceText: {
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 35,
  },
  currencyText: {
    fontFamily: "Montserrat_800ExtraBold",
  },
  originalPriceText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    textDecorationLine: "line-through",
  },
  imageSection: {
    width: "100%",
    marginTop: -60,
  },
});
