import React, { useEffect } from "react";

const DisableRightClick: React.FC = () => {
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return null;
};

export default DisableRightClick;
