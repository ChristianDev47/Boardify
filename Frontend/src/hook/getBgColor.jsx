import { useExtractColor } from "react-extract-colors";

export const getColorBg = () => {
  const GetBgColor = (backgroundData) => {
    const { dominantColor } = useExtractColor(backgroundData);
    return dominantColor;
  };

  return GetBgColor;
};
