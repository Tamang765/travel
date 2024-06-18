import { useTheme } from "../../providers/ThemeProvider";

export const Shadow = ({ children }) => {
  const { colors, theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.text,
        borderWidth: theme === "dark" ? "2px" : 0,
      }}
      className="bg-white rounded-lg p-5 shadow-md"
    >
      {children}
    </div>
  );
};
