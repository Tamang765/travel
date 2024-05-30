import { useTheme } from "../../../providers/ThemeProvider";
import { Caption, TitleSm } from "../../../routers/index";

export const CardSm = ({ title, caption, total, subtitle, icon }) => {
  const { colors, theme } = useTheme();
  return (
    <div
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.text,
        borderWidth: theme === "dark" ? "2px" : 0,
      }}
      className="rounded-lg p-5 shadow-md"
    >
      <TitleSm>{title}</TitleSm>
      <Caption>{caption}</Caption>
      <h1
        style={{
          color: colors.text,
        }}
        className="text-2xl font-semibold my-2"
      >
        {total}
      </h1>
      <div className="flex items-center justify-between">
        <Caption>{subtitle}</Caption>
        <div className="w-12 h-12 text-secondary  flex items-center justify-center bg-indigo-50 rounded-full ">
          {icon}
        </div>
      </div>
    </div>
  );
};
