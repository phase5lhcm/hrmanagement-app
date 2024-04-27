import { AuthPage } from "@refinedev/antd";

export const LoginPage = () => {
  // Handle form submission
  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Add your authentication logic here, such as calling an API to verify credentials
  };

  return (
    <AuthPage
      type="login"
      onSubmit={handleSubmit} // Handle form submission
      initialValues={{ email: "", password: "" }} // Initial values for form fields
      title="Login" // Title for the login page
      submitText="Login" // Text for the submit button
    />
  );
};
