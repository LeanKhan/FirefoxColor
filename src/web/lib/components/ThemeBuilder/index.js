import React from "react";
import { DEBUG } from "../../../../lib/utils";

import ThemeLogger from "../ThemeLogger";
import PresetThemeSelector from "../PresetThemeSelector";
import SavedThemeSelector from "../SavedThemeSelector";
import ThemeBackgroundPicker from "../ThemeBackgroundPicker";
import ThemeColorsEditor from "../ThemeColorsEditor";
import ThemeCustomBackgroundPicker from "../ThemeCustomBackgroundPicker";
import StaticThemePicker from "../StaticThemePicker";

import "./index.scss";

export const ThemeBuilderTwo = props => {
  const {
    theme,
    savedThemes,
    hasSavedThemes,
    themeBuilderPanel,
    setBackground,
    selectedColor,
    setColor,
    setSelectedColor,
    setThemeBuilderPanel,
    setTheme,
    savedThemesPage,
    setSavedThemesPage,
    storage,
    themeCustomImages,
  } = props;

  const tabList = [
    { name: "Classic Themes",
      id: "classic-themes"
    },
    {
      name: "Example Themes",
      id: "preset-themes"
    },
    {
      name: "Custom colors",
      id: "colors"
    },
    {
      name: "Custom backgrounds",
      id: "backgrounds"
    }
  ];

  if (hasSavedThemes) {
    tabList.push({
      name: `Saved themes (${Object.keys(savedThemes).length})`,
      id: "saved-themes"
    });
  }

  if (DEBUG) {
    tabList.push({
      name: "Raw Theme Data",
      id: "debugger"
    });
  }

  const hasCustom = theme.images.custom_backgrounds || [];

  const renderThemingSection = selected => {
    switch (selected) {
      case "classic-themes":
        return <StaticThemePicker {...props} />;
      case "preset-themes":
        return <PresetThemeSelector {...props} />;
      case "colors":
        return (
          <ThemeColorsEditor
            {...{
              theme,
              selectedColor,
              setColor,
              setSelectedColor
            }}
          />
        );
      case "backgrounds":
        return (
          <React.Fragment>
            {!hasCustom.length && (
              <ThemeBackgroundPicker {...{ theme, setBackground }} />
            )}
            <ThemeCustomBackgroundPicker {...props} />
          </React.Fragment>
        );
      case "saved-themes":
        return (
          <SavedThemeSelector
            {...{
              setTheme,
              savedThemes,
              savedThemesPage,
              setSavedThemesPage,
              themeCustomImages,
              storage
            }}
          />
        );
      case "debugger":
        return <ThemeLogger {...{ theme }} />;
      default:
        return null;
    }
  };

  return (
    <div className="theme-builder">
      <div className="theme-builder__tabs-wrapper">
        <ul className="theme-builder__tabs">
          {tabList.map((item, index) => {
            const isSelected =
              themeBuilderPanel === index ? "theme-builder__selected" : "";
            return (
              <li
                key={index}
                className={isSelected}
                onClick={() => setThemeBuilderPanel(index)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="theme-builder__content">
        {renderThemingSection(tabList[themeBuilderPanel].id)}
      </div>
    </div>
  );
};

export default ThemeBuilderTwo;
