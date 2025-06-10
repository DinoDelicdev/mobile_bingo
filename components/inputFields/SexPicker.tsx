import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";

interface SexPickerPropsType {
  selectedSex: string | null;
  setSelectedSex(value: string | null): void;
}
const SexPicker: React.FC<SexPickerPropsType> = ({
  selectedSex,
  setSelectedSex,
}) => {


  return (
    <View
      style={{
        marginVertical: 10,
        width: "48%",
        backgroundColor: "lightgray",
        borderRadius: 10,
      }}
    >
      <Picker
        selectedValue={selectedSex}
        onValueChange={(itemValue) => setSelectedSex(itemValue)}
      >
        {/* Placeholder Item */}
        <Picker.Item
          label="Spol"
          value={null}
          enabled={false}
          style={{ color: "gray" }}
        />
        <Picker.Item label="♂️ Muški" value="male" />
        <Picker.Item label="♀️ Ženski" value="female" />
      </Picker>
    </View>
  );
};

export default SexPicker;

const styles = StyleSheet.create({});
