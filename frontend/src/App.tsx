import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Register } from "./pages/Register";
import { SignIn } from "./pages/SignIn";
import { AddHotel } from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import { MyHotels } from "./pages/MyHotels";
import { EditHotel } from "./pages/EditHotel";
import { Search } from "./pages/Search";

export const App = () => {
  const { isLoggedin } = useAppContext();
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
      <Route
        path="/search"
        element={
          <Layout>
            <Search />
          </Layout>
        }
      />
      {isLoggedin && (
        <>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />
        </>
      )}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
