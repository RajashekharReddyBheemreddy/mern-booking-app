import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { BookingForm } from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookingDetailSummary } from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

export const Booking = () => {
  const { stripePromise } = useAppContext();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);
  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      {hotel && (
        <BookingDetailSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          hotel={hotel}
        />
      )}
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
        </Elements>
      )}
    </div>
  );
};
