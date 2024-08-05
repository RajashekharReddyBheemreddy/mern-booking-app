import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { SignOutButton } from "./SignOutButton";
export const Header = () => {
  const { isLoggedin } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-flight">
          <Link to={"/"}>HolidayBooking.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedin === true ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to={"/my-bookingss"}
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to={"/my-hotels"}
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
