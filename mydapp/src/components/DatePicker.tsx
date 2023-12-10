import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

const MyDatePicker = ({ value, onChange }) => {
  return (
    <InputGroup>
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <InputRightElement pointerEvents="none">
        <CalendarIcon color="gray.300" />
      </InputRightElement>
    </InputGroup>
  );
};

export default MyDatePicker;
