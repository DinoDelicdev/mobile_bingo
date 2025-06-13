import { Colors } from "@/constants/Colors";
import { Images } from "@/constants/Images";
import { Image, ImageSource } from "expo-image";
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
  actionStartDate?: Date;
  actionEndDate?: Date;
}

const SensationItem: React.FC<SensationItemPropsType> = ({
  discount = 10,
  imageSource = Images.testImage,
  itemTitle = "Čipi Čips",
  itemManufacturer = "Chio",
  itemUnit = "g",
  itemVersions = ["Slani", "Paprika"],
  itemUnitAmmount = 55,
  itemDiscountPrice = 3,
  itemOriginalPrice = 4.99,
  actionStartDate = new Date("2025-06-16"),
  actionEndDate = new Date("2025-06-26"),
}) => {
  return (
    <View>
      <View style={styles.sensationItemContainer}>
        <View style={styles.leftSection}>
          <View style={styles.discountTextContainer}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
          <View style={styles.sensationItemTextContainer}>
            <Text style={styles.sensationItemText}>
              {itemTitle} ({itemVersions.join("/")}) {itemUnitAmmount}
              {itemUnit} {itemManufacturer}
            </Text>
          </View>
          <View style={styles.sensationPriceTextContainer}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Text style={styles.priceText}>
                {itemDiscountPrice.toFixed(2)}
              </Text>
              <Text style={styles.unitText}>KM</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.originalPriceText}>
                {itemOriginalPrice.toFixed(2)}KM
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rightSection}>
          <Image
            source={imageSource}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
          />
          <View
            style={{
              width: "60%",
              height: "35%",
              position: "absolute",
              bottom: 10,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={Images.sensationBadge}
              style={{
                width: "105%",
                height: "100%",
                backgroundColor: Colors.bingo_main,
                borderRadius: 100,
              }}
              // contentFit="contain"
            ></Image>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 40,
          paddingBottom: 10,
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
        }}
      >
        <Text>
          Akcija traje od {actionStartDate.getDate()}.
          {actionStartDate.getMonth() + 1} do {actionEndDate.getDate()}.
          {actionEndDate.getMonth() + 1}
        </Text>
      </View>
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
  sensationPriceTextContainer: {
    width: "100%",
    height: "35%",
    // backgroundColor: Colors.bingo_yellow,
    alignContent: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
  },

  priceText: {
    fontSize: 35,
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "Montserrat_800ExtraBold",
    color: Colors.bingo_yellow,
  },
  unitText: {
    fontSize: 16,
    fontFamily: "Montserrat_800ExtraBold",
    color: Colors.bingo_yellow,
    textAlignVertical: "center",
  },
  originalPriceText: {
    fontSize: 20,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: Colors.bingo_white,
    fontFamily: "Montserrat_700Regular",
  },
  rightSection: { width: "60%", height: "100%", position: "relative" },
});
