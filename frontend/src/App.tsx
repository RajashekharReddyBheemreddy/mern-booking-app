import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Register } from "./pages/Register";
import { SignIn } from "./pages/SignIn";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout>HomePage</Layout>} />
      <Route path="/" element={<Layout>search</Layout>} />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Layout>
            <SignIn />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
