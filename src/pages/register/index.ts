import { AuthPage } from "@refinedev/antd";
import { authCredentials } from "../../providers";

export const Register = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { authCredentials },
      }}
    />
  );
};
