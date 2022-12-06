import { StyleSheet, View, Text } from "react-native";

const Library = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>Library</Text>
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
