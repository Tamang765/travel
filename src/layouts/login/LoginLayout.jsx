import PropTypes from "prop-types";
// @mui
import { Stack } from "@mui/material";
// components

//
import Image from "../../components/image/Image";
import Logo from "../../components/logo/Logo";
import {
  StyledContent,
  StyledRoot,
  StyledSection,
  StyledSectionBg,
} from "./styles";

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children }) {
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: "absolute",
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      <StyledSection>
        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src="/citygarm.png"
          sx={
            {
              // width: "100%",
              // bottom: 0,
            }
          }
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
