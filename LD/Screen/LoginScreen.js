import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PhoneNumberContext } from "./PhoneNumberContext";

export default function LoginScreen({ navigation }) {
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const { setPhoneNumber } = useContext(PhoneNumberContext);

  const handleInput = (value) => {
    const formattedValue = value.replace(/[^0-9]/g, "");
    if (formattedValue.length <= 10) {
      setPhoneNumberInput(formatPhoneNumber(formattedValue));
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumberPattern = /^(\d{3})(\d{3})(\d{4})$/;
    const matches = value.match(phoneNumberPattern);
    return matches ? `${matches[1]}-${matches[2]}-${matches[3]}` : value;
  };

  const handleContinue = async () => {
    if (!validatePhoneNumber(phoneNumberInput)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ. Vui lòng nhập lại.", [
        { text: "OK" },
      ]);
    } else {
      try {
        await AsyncStorage.setItem("phoneNumber", phoneNumberInput); // Lưu vào AsyncStorage
        setPhoneNumber(phoneNumberInput); // Lưu vào context
        navigation.navigate("Home");
      } catch (e) {
        console.error("Lỗi lưu số điện thoại vào AsyncStorage", e);
      }
    }
  };

  const validatePhoneNumber = (number) => {
    const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
    return phoneNumberPattern.test(number);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing
          Pro
        </Text>
        <Text style={styles.phoneNumberLabel}>Số điện thoại</Text>

        <TextInput
          style={styles.phoneNumberInput}
          placeholder="Nhập số điện thoại"
          value={phoneNumberInput}
          onChangeText={handleInput}
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Tiếp Tục</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    color: "#333",
    marginBottom: 20,
    textAlign: "left",
    fontWeight: "700",
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  phoneNumberLabel: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  phoneNumberInput: {
    fontSize: 24,
    fontWeight: "bold",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  continueButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
