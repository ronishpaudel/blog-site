import React, { useEffect, useRef, useState } from "react";
import { DropDown } from "../../public";

function Dropdown({
  onChange,
  options,
  label,
  style,
}: {
  onChange: (val: number) => void;
  options: Array<{ displayName: string; id: number }>;
  label: string;
  style: React.CSSProperties;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener("mouseup", (e) => {
      console.log({
        e: e.target,
        vallll: e.target.classList.value.includes("dd-list-item"),
      });

      if (!e.target.classList.value.includes("dd-list-item")) {
        setIsOpen(false);
      }
    });
    return () => {
      document.removeEventListener("mouseup", () => {});
    };
  }, []);

  return (
    <div>
      <div
        style={{
          width: "210px",
          height: "55px",
          padding: "15px 12px",
        }}
        className="dd-header"
        onClick={toggleDropdown}
      >
        <div
          className="dd-header-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {selectedOption || label}
          <DropDown style={{ width: "30px", marginLeft: "36px" }} />
        </div>
      </div>
      {isOpen && (
        <div
          style={{
            width: "210px",
            marginTop: "10px",
            position: "absolute",
            background: "white",
            zIndex: 999,
            borderRadius: "4px",
            padding: "12px 15px",
            boxShadow: " inset 0 0 0 1px #92929D ",
          }}
          className="dd-list"
        >
          <div style={{ height: "30px" }} className="dd-list-label">
            {label}
          </div>
          {options.map((item) => (
            <div
              style={{ height: "30px" }}
              className="dd-list-item asd"
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                onChange(item.id);
                setIsOpen(false);
                setSelectedOption(item.displayName);
              }}
            >
              {item.displayName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
