import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Calendar = () => {
  const height = useSharedValue(layOut);

  const config = {
    duration: 500, // 속도
  };
  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, config),
    };
  });

  const today = {
    year: new Date().getFullYear(), // 올해
    month: new Date().getMonth(), // 이번달
    date: new Date().getDate(), // 오늘 날짜
    day: new Date().getDay(), // 오늘 요일
  };

  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [thisYear, setThisYear] = useState(today.year); // 이번년도
  const [thisMonth, setThisMonth] = useState(today.month); // 이번달
  const thisMonthTotal = new Date(thisYear, thisMonth, 0).getDate(); //선택한 이번년도,이번달의 마지막 날짜
  const [oneWeek, setOneWeek] = useState(false);
  const [layOut, setLayOut] = useState(0);

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setLayOut(height);
  };

  const nextMonth = () => {
    if (thisMonth === 12) {
      setThisMonth(1);
      setThisYear(thisYear + 1);
    } else {
      setThisMonth(thisMonth + 1);
    }
  };

  const prevMonth = () => {
    if (thisMonth === 1) {
      setThisMonth(12);
      setThisYear(thisYear - 1);
    } else {
      setThisMonth(thisMonth - 1);
    }
  };

  const returnDay = () => {
    //알짜 반화
    let dayArr = [];

    for (const nowDay of week) {
      const day = new Date(thisYear, thisMonth - 1, 1).getDay();
      if (week[day] === nowDay) {
        for (let i = 0; i < thisMonthTotal; i++) {
          dayArr.push(
            <View
              onLayout={onLayout}
              style={{ ...styles.datebox, flexDirection: "row" }}
              key={i}
            >
              <Text style={{ fontSize: 20 }}>{i + 1}</Text>
            </View>
          );
        }
      }
    }
    return dayArr;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="ios-chevron-back"
          size={30}
          color="black"
          onPress={prevMonth}
        />
        <Text style={{ fontSize: 20 }}>{thisYear + `년`}</Text>
        <Text style={{ fontSize: 20 }}>{thisMonth + `월`}</Text>
        <Ionicons
          name="ios-chevron-forward"
          size={30}
          color="black"
          onPress={nextMonth}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        {week.map((el, idx) => {
          return (
            <View style={styles.day} key={idx}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>{el}</Text>
            </View>
          );
        })}
      </View>

      <Animated.View style={[styles.date, style]}>{returnDay()}</Animated.View>
      <Button
        title={oneWeek ? "월 캘린더 보기" : "주 캘린더 보기"}
        onPress={() => {
          setOneWeek(!oneWeek);
          oneWeek ? (height.value = layOut * 5) : (height.value = layOut);
        }}
      />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  day: {
    width: Math.floor(SCREEN_WIDTH / 7),
    alignItems: "center",
    paddingVertical: 5,
  },
  date: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
  },
  datebox: {
    width: Math.floor(SCREEN_WIDTH / 7),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
