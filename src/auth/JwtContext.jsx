import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
// utils
import localStorageAvailable from "../utils/localStorageAvailable";
//
import axiosInstance from "../utils/axios";
import { setSession } from "./utils";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const token = storageAvailable ? localStorage.getItem("accessToken") : "";

      if (token) {
        setSession(token);
        const response = await axiosInstance.get("users/auth-user/get");
        const user = response.data.data;

        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const response = await axiosInstance.post("login", {
      email,
      password,
    });

    const { access_token, user } = response.data.data;

    if (response.status === 200) {
      setSession(access_token);
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } else {
      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const response = await axiosInstance.post("/api/account/register", {
      email,
      password,
      firstName,
      lastName,
    });
    const { access_token, user } = response.data.data;

    setSession(access_token);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user || {
        roles: [
          {
            name: "Administrator",
          },
        ],
      },
      method: "jwt",
      login,
      register,
      logout,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
