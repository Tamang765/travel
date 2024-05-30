// import { makeStyles } from "@material-ui/core/styles";
// import React from "react";
// import logo from "../components/assest/images/LOGO.jpeg";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     backgroundColor: "#f5f5f5",
//     ...theme.typography.body2,
//     color: theme.palette.text.primary,
//   },
//   logo: {
//     width: "150px",
//     height: "150px",
//     marginBottom: "20px",
//     animation: "$pulse 1.5s ease-in-out infinite", // Apply pulse animation
//   },
//   "@keyframes pulse": {
//     "0%": {
//       transform: "scale(0.8)", // Initial scale
//     },
//     "50%": {
//       transform: "scale(1.2)", // Scale up
//     },
//     "100%": {
//       transform: "scale(0.8)", // Scale back down to initial size
//     },
//   },
// }));

// const LoadingScreen = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <img src={logo} alt="Logo" className={classes.logo} />
//     </div>
//   );
// };

// export default LoadingScreen;

import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    ...theme.typography.body2,
    color: theme.palette.text.primary,
  },
  logo: {
    width: "150px",
    height: "150px",
    marginBottom: "20px",
    animation: "$pulse 1.5s ease-in-out infinite", // Apply pulse animation
  },
  spinner: {
    width: "11.2px",
    height: "11.2px",
    borderRadius: "11.2px",
    background: "#fbb02e",
    boxShadow:
      "28px 0px 0 0 rgba(251,176,46,0.2), 22.7px 16.5px 0 0 rgba(251,176,46,0.4), 8.68px 26.6px 0 0 rgba(251,176,46,0.6), -8.68px 26.6px 0 0 rgba(251,176,46,0.8), -22.7px 16.5px 0 0 #fbb02e",
    animation: "$spinner-b87k6z 0.8s infinite linear",
  },
  "@keyframes spinner-b87k6z": {
    to: {
      transform: "rotate(360deg)",
    },
  },
  "@keyframes pulse": {
    "0%": {
      transform: "scale(0.8)", // Initial scale
    },
    "50%": {
      transform: "scale(1.2)", // Scale up
    },
    "100%": {
      transform: "scale(0.8)", // Scale back down to initial size
    },
  },
}));

const LoadingScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <img src={logo} alt="Logo" className={classes.logo} /> */}
      <div className={classes.spinner}></div>
    </div>
  );
};

export default LoadingScreen;
