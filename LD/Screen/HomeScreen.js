import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PhoneNumberContext } from "./PhoneNumberContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const { phoneNumber, setPhoneNumber } = useContext(PhoneNumberContext);

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const storedPhoneNumber = await AsyncStorage.getItem("phoneNumber");
        if (storedPhoneNumber) {
          setPhoneNumber(storedPhoneNumber); // Cập nhật số điện thoại từ AsyncStorage
        }
      } catch (e) {
        console.error("Lỗi lấy số điện thoại từ AsyncStorage", e);
      }
    };

    fetchPhoneNumber();
  }, []);

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
