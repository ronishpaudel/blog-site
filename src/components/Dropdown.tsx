import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { useState } from "react";
import { useSnapshot } from "valtio";

function DropDown({
  onChange,
  options,
  label,
}: {
  onChange: (val: { id?: string; displayName: string }) => void;
  options: Array<{ displayName: string; id: number }>;
  label?: string;
  style?: React.CSSProperties;
}) {
  const themeSnap = useSnapshot(themeStore);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item: { id: string; displayName: string }) => {
    onChange(item);
    setIsOpen(false);
    setSelectedOption(item.displayName);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
        className="h-8 w-20 rounded-sm"
      >
        <div
          className="dd-header-title flex justify-center "
          style={{
            color: THEME_PALETTE[themeSnap.theme].textColor,
            fontSize: "16px",
          }}
          onClick={toggleDropdown}
        >
          {selectedOption}
        </div>
        {selectedOption ? null : (
          <div style={{ height: "30px" }} className="dd-list-label">
            {label}
          </div>
        )}
      </DropdownMenuTrigger>
      {options.map((item) => (
        <DropdownMenuContent
          style={{
            height: "30px",
            color: THEME_PALETTE[themeSnap.theme].textColor,
            backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
          }}
          className="dd-list-item asd mt-2 hover:to-blue-400 flex flex-col items-center"
          key={item.id}
          onClick={(e) => {
            e.stopPropagation();
            handleOptionClick({
              id: String(item.id),
              displayName: item.displayName,
            });
          }}
        >
          {item.displayName}
        </DropdownMenuContent>
      ))}
    </DropdownMenu>
  );
}

export { DropDown };
