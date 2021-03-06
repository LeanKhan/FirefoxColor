import React from "react";

import "./index.scss";

const BrowserChrome = ({
  colors,
  headerBackgroundImage,
  customImages,
  children,
  selectSettings,
  selectedColor = false
}) => {
  return (
    <div
      className="browser-chrome"
      style={{
        backgroundImage: headerBackgroundImage,
        backgroundColor: colors.accentcolor,
        transition: selectSettings.transition,
        outline:
          selectedColor === "accentcolor"
            ? selectSettings.active
            : selectSettings.inactive
      }}
    >
      {customImages.map((image, index) => {
        return (
          <div
            className="browser-chrome__custom-image"
            key={index}
            style={{
              backgroundImage: `url(${image.image})`,
              position: "absolute",
              height: "100%",
              width: "100%",
              zIndex: 4 - index
            }}
          />
        );
      })}
      {children}
    </div>
  );
};

export default BrowserChrome;
