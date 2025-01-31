import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const moveCursor = (event) => {
    setCursorX(event.clientX);
    setCursorY(event.clientY);
  };

  const handleMouseOver = (event) => {
    const target = event.target;
    if (target.matches("a, button")) {
      setIsHovering(true);
    }
  };

  const handleMouseOut = (event) => {
    const target = event.target;
    if (target.matches("a, button")) {
      setIsHovering(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", moveCursor);
    const elements = document.querySelectorAll("a, button");
    elements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      elements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  return (
    <div>
      {/* Curseur SVG personnalisé */}
      <svg
        style={{
          left: `${cursorX}px`,
          top: `${cursorY}px`,
        }}
        className={`custom-cursor ${isHovering ? "cursor-hover" : ""}`}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="12,2 22,12 12,22 2,12"
          stroke="black"
          fill="none"
          strokeWidth="10"
        />
      </svg>

      {/* Exemple d'éléments interactifs */}
      <a href="#">Lien</a>
      <button>Button</button>
    </div>
  );
};

export default CustomCursor;
