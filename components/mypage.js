import { StyleSheet, View, Text } from "react-native";

const Mypage = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>Mypage</Text>
    </View>
  );
};

export default Mypage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
