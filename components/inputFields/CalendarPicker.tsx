import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CalendarPickerPropsType {
  date: Date | null;
  handleSettingDate: (event: any, selectedDate?: Date) => void;
  displayDatePicker?: boolean;
  setShowDatePicker: (show: boolean) => void;
}

const CalendarPicker: React.FC<CalendarPickerPropsType> = ({
  date,
  handleSettingDate,
  displayDatePicker,
  setShowDatePicker,
}) => {
  const showDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={showDatePicker}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>
          {date
            ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            : "Dob"}
        </Text>{" "}
        <Ionicons name="calendar-outline" size={24} color="black" />
      </View>

      {displayDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? date : new Date()}
          mode="date"
          is24Hour={true}
          //   display={Platform.OS === 'ios' && Number(Platform.Version) >= 14 ? 'inline' : 'calendar'}
          display="spinner"
          onChange={handleSettingDate}
        />
      )}
    </TouchableOpacity>
  );
};

export default CalendarPicker;

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  selectedDateText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    // color: "#555",
  },
});
