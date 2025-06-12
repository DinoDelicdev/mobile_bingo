import { Colors } from "@/constants/Colors";
import { Images } from "@/constants/Images";
import { ImageSource } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

interface SensationItemPropsType {
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

const SensationItem = ({
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
  return (
    <View style={styles.sensationItemContainer}>
      <View style={styles.leftSection}>
        <View style={styles.discountTextContainer}>
          <Text style={styles.discountText}>-{discount}%</Text>
        </View>
        <View style={styles.sensationItemTextContainer}>
          <Text
            style={styles.sensationItemText}
          >
            {itemTitle} ({itemVersions.join("/")}) {itemUnitAmmount}{itemUnit} {itemManufacturer}
          </Text>
        </View>
      </View>
      <Text>SensationItem</Text>
    </View>
  );
};

export default SensationItem;

const styles = StyleSheet.create({
  sensationItemContainer: {
    width: width * 0.83,
    height: height * 0.45,
    backgroundColor: Colors.bingo_main,
    padding: "5%",
    // alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    // For Android shadow
    elevation: 5, // <-- Here's the shadow for Android
    // For iOS shadow
    shadowColor: "#000", // <-- Here's the shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // <-- Shadow direction
    shadowOpacity: 0.25, // <-- Shadow intensity
    shadowRadius: 3.84, // <-- Shadow blur
  },
  leftSection: {
    width: "40%",
    height: "100%",
    // backgroundColor: "red",
  },
  discountTextContainer: {
    width: "100%",
    height: "15%",
    backgroundColor: Colors.bingo_yellow,
    alignContent: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
  },
  discountText: {
    fontSize: 35,
    width: "100%",
    height: "100%",
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "Montserrat_800ExtraBold",
    //   paddingBottom: 5,
  },
  sensationItemTextContainer: {
    width: "100%",
    height: "50%",
    // backgroundColor: Colors.bingo_yellow,
    alignContent: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
  },
  sensationItemText: {
    fontSize: 16,
    width: "100%",
    height: "100%",
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
    color: "white",
  },
});
