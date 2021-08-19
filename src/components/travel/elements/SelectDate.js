import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { hhmm, yyyymmdd } from "../../utils/DateString";

function SelectDate({ date, setDate, errMsg, setErrMsg, start, end }) {
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [showTimePicker, setShowTimePicker] = useState(false);

   const onChange = useCallback(
      (event, selectedDate) => {
         if (errMsg) {
            setErrMsg((prev) => ({ ...prev, time: "" }));
         }
         setShowDatePicker(false);
         setShowTimePicker(false);
         if (!selectedDate) {
            return;
         }
         setDate(selectedDate);
      },
      [errMsg]
   );

   const label = useCallback(
      (content) => <Text style={styles.label}>{content}</Text>,
      []
   );

   return (
      <View style={styles.line}>
         {label("일시")}
         <View style={styles.dateContainer}>
            <View style={styles.dateWithButton}>
               <Text style={styles.dateText}>{yyyymmdd(date)}</Text>
               <Button
                  title="수정"
                  type="clear"
                  onPress={() => setShowDatePicker(true)}
               />
            </View>
            <View style={styles.dateWithButton}>
               <Text style={styles.dateText}>{hhmm(date)}</Text>
               <Button
                  title="수정"
                  type="clear"
                  onPress={() => setShowTimePicker(true)}
               />
            </View>
            {errMsg ? <Text style={styles.errMsg}>{errMsg}</Text> : <></>}
         </View>
         {showDatePicker && (
            <DateTimePicker
               value={date}
               mode="date"
               is24Hour={true}
               onChange={onChange}
               maximumDate={end}
               minimumDate={start}
            />
         )}

         {showTimePicker && (
            <DateTimePicker
               value={date}
               mode="time"
               is24Hour={true}
               onChange={onChange}
            />
         )}
      </View>
   );
}

const styles = StyleSheet.create({
   line: {
      marginBottom: 50,
   },
   label: {
      fontSize: 18,
      paddingBottom: 10,
   },
   dateContainer: {
      marginLeft: "15%",
      width: "70%",
   },
   dateText: {
      fontSize: 20,
   },
   dateWithButton: {
      flexDirection: "row",
      justifyContent: "space-between",
   },
   errMsg: {
      fontSize: 15,
      color: "red",
   },
});

export default React.memo(SelectDate);
