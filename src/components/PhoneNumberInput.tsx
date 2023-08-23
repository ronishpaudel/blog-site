import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";

function PhoneNumberInput() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState();
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={handleChange}
    />
  );
}
export { PhoneNumberInput };
