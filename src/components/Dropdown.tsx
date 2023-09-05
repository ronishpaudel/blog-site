import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dropdown = ({
  options,
  onChange,
}: {
  onChange: (val: string) => void;
  options: Array<{ displayName: string; id: number }>;
  label?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem value={JSON.stringify(item)} key={item.id}>
            {item.displayName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
