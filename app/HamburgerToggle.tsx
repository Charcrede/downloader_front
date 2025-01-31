import React, { useState } from "react";

const HamburgerToggle: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      {/* Checkbox cachée */}
      <input
        type="checkbox"
        id="checkbox"
        style={{ display: "none" }}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      {/* Label contenant les barres */}
      <label
        htmlFor="checkbox"
        style={{
          position: "relative",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          transitionDuration: "0.5s",
          transform: isChecked ? "rotate(180deg)" : "none",
        }}
      >
        <div
          style={{
            width: isChecked ? "100%" : "70%",
            height: "2px",
            backgroundColor: "black",
            borderRadius: "4px",
            position: isChecked ? "absolute" : "static",
            transform: isChecked ? "rotate(45deg)" : "none",
            transitionDuration: "0.5s",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "black",
            borderRadius: "4px",
            transform: isChecked ? "scaleX(0)" : "none",
            transitionDuration: "0.5s",
          }}
        ></div>
        <div
          style={{
            width: isChecked ? "100%" : "70%",
            height: "2px",
            backgroundColor: "black",
            borderRadius: "4px",
            position: isChecked ? "absolute" : "static",
            transform: isChecked ? "rotate(-45deg)" : "none",
            transitionDuration: "0.5s",
          }}
        ></div>
      </label>
    </div>
  );
};

export default HamburgerToggle;
