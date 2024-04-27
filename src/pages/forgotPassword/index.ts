import { AuthProvider } from "@refinedev/core";
import {
  AuthActionResponse,
  CheckResponse,
  OnErrorResponse,
} from "@refinedev/core/dist/contexts/auth/types";

export const ForgotPassword: AuthProvider = {
  // --
  forgotPassword: async ({ email }) => {
    // You can handle the reset password process according to your needs.
    // If the process is successful.
    return {
      success: true,
    };

    return {
      success: false,
      error: {
        name: "Register Error",
        message: "Invalid email",
      },
    };
  },
  login: function (params: any): Promise<AuthActionResponse> {
    throw new Error("Function not implemented.");
  },
  logout: function (params: any): Promise<AuthActionResponse> {
    throw new Error("Function not implemented.");
  },
  check: function (params?: any): Promise<CheckResponse> {
    throw new Error("Function not implemented.");
  },
  onError: function (error: any): Promise<OnErrorResponse> {
    throw new Error("Function not implemented.");
  },
};
