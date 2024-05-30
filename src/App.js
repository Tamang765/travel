import { MuiThemeProvider } from "@material-ui/core";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarProvider } from "notistack";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./auth/JwtContext";
import { ThemeProvider } from "./providers/ThemeProvider";
import { persistor } from "./redux/store";
import Router from "./routes";
import "./styles/main.scss";
import { THEME } from "./theme/theme";

function App() {
  return (
    <MuiThemeProvider theme={THEME}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider>
            <HelmetProvider>
              <PersistGate loading={null} persistor={persistor}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <SnackbarProvider
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    autoHideDuration={3000}
                  >
                    <Router />
                  </SnackbarProvider>
                </LocalizationProvider>
              </PersistGate>
            </HelmetProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
