import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const SponserCard = ({ image, link, location, id, setLoad }) => {
  const handelApprove = async (id) => {
    try {
      var tload = toast.loading("approving...");
      const response = await axios.put(`/admin/sponseredapproved`, {
        params: { id: id },
      });

      const data = await response.data;
      if (response.status === 200) {
        setLoad();
        toast.success(data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("something went wrong");
      }
    } finally {
      toast.dismiss(tload);
    }
  };
  const handelReject = async (id) => {
    try {
      var tload = toast.loading("rejecting...");
      const response = await axios.delete(`/admin/sponseredreject`, {
        params: {
          id: id,
        },
      });

      const data = await response.data;
      if (response.status === 200) {
        setLoad();
        toast.success(data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("something went wrong");
      }
    } finally {
      toast.dismiss(tload);
    }
  };
  return (
    <div className=" overflow-hidden rounded-lg bg-white shadow-lg">
      <img className="w-full" src={image} alt="Card" />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">
          Location: {location === 1 ? "top" : "bottom"}
        </div>
        <p className="text-base text-gray-700">
          <a href={link.match("http")>0 ? link : `http://${link}`} 
          
          
          className="text-blue-500 hover:underline">
            {link}
          </a>
        </p>
      </div>
      <div className="px-6 py-4">
        <button
          className="rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
          onClick={() => handelApprove(id)}
        >
          Approve
        </button>
        <button
          className="ml-4 rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
          onClick={() => handelReject(id)}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default SponserCard;
