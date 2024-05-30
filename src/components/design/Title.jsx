import { useTheme } from "../../providers/ThemeProvider";

export const TitleS = ({ children }) => {
  const { colors } = useTheme();

  return (
    <h3
      style={{
        color: colors.text,
      }}
      className="capitalize font-medium"
    >
      {children}
    </h3>
  );
};
export const TitleSm = ({ children }) => {
  const { colors } = useTheme();

  return (
    <h2
      style={{
        color: colors.text,
      }}
      className="uppercase font-semibold"
    >
      {children}
    </h2>
  );
};
export const TitleMd = ({ children }) => {
  const { colors } = useTheme();

  return (
    <h1
      style={{
        color: colors.text,
      }}
      className="text-2xl font-semibold"
    >
      {children}
    </h1>
  );
};
export const Description = ({ children }) => {
  const { colors } = useTheme();

  return (
    <span
      style={{
        color: colors.text,
      }}
      className="text-[14px] capitalize"
    >
      {children}
    </span>
  );
};
export const Caption = ({ children }) => {
  const { colors } = useTheme();

  return (
    <span
      style={{
        color: colors.text,
      }}
      className="text-sm capitalize"
    >
      {children}
    </span>
  );
};
