import React, { createContext, useState } from "react";

export const PhoneNumberContext = createContext();

export const PhoneNumberProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <PhoneNumberContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </PhoneNumberContext.Provider>
  );
};
