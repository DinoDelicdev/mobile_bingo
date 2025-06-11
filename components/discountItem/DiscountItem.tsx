import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

const DiscountItem = () => {
  return (
    <View
      style={{
        width: width * 0.43,
        height: height * 0.3,
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>DiscountItem</Text>
    </View>
  );
};

export default DiscountItem;

const styles = StyleSheet.create({});
