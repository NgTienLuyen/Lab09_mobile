import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PhoneNumberContext } from "./PhoneNumberContext"; // Import Context

export default function HomeScreen() {
  const { phoneNumber } = useContext(PhoneNumberContext); // Lấy số điện thoại từ context

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn đến với màn hình chính!</Text>
      <Text style={styles.phoneNumber}>
        Số điện thoại của bạn: {phoneNumber}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  phoneNumber: {
    marginTop: 20,
    fontSize: 20,
    color: "#007BFF",
  },
});
