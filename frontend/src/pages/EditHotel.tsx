import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { ManageHotelForm } from "../forms/ManageHotelForms/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

export const EditHotel = () => {
  const { hotelId } = useParams();
  const {showToast} = useAppContext();
  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelId(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
        showToast({message:'Hotel Saved!', type:'SUCCESS'})
    },
    onError: () => {
        showToast({message:'Error saving Hotel', type:'ERROR'})
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <ManageHotelForm hotel={hotel} isLoading={isLoading} onSave={handleSave} />
  );
};
