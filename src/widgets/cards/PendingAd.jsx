import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
export function PendingAd({ ad, setLoad }) {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleNextImage = () => {
    if (currentImageIndex === ad.images.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(ad.images.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleApprove = async (id) => {
    try {
      var load = toast.loading("approving...");

      const response = await axios.put(`/admin/approve/`, {
        id,
      });

      const data = await response.data;
      if (response.status === 200) {
        toast.success(data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("something went wrong");
      }
    } finally {
      toast.dismiss(load);
      setLoad();
    }
  };

  const handleReject = async (id) => {
    try {
      var load = toast.loading("rejecting...");

      const response = await axios.delete(`/admin/reject/`, { data: { id } });

      const data = await response.data;
      if (response.status === 200) {
        toast.success(data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("something went wrong");
      }
    } finally {
      toast.dismiss(load);
      setLoad(!load);
    }
  };
  return (
    <div className="my-4 overflow-hidden rounded-lg bg-white shadow-md">
      <ToastContainer />
      <div className="relative">
        <button
          className="absolute top-1/2 left-0 -translate-y-1/2 transform rounded-full bg-black bg-opacity-25 px-2 py-1 text-white shadow-md transition duration-200 ease-in-out hover:bg-opacity-50"
          onClick={handlePrevImage}
        >
          <FaChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute top-1/2 right-0 -translate-y-1/2 transform rounded-full bg-black bg-opacity-25 px-2 py-1 text-white shadow-md transition duration-200 ease-in-out hover:bg-opacity-50"
          onClick={handleNextImage}
        >
          <FaChevronRight className="h-6 w-6" />
        </button>
        <img
          className="h-64 w-full object-cover"
          src={ad.images[currentImageIndex]}
          alt={ad.title}
        />
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-xl font-bold text-white">{ad.title}</h2>
        <div className="flex">
          <button
            className="mr-2 text-green-700 hover:text-green-500"
            onClick={() => handleApprove(ad._id)}
            title="approve ad"
          >
            <FaCheck className="h-8 w-10" />
          </button>
          <button
            className="mr-2 font-extrabold  text-red-700 hover:text-red-500"
            onClick={() => handleReject(ad._id)}
          >
            <AiOutlineClose className="h-8 w-10" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-600">{ad.title}</p>
        {expanded && (
          <div className="mt-4">
            <p className="text-gray-600">
              <strong>WhatsApp:</strong> {ad.whatsapp}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {ad.email}
            </p>
            <p className="text-gray-600">
              <strong>detail:</strong> {ad.detail}
            </p>
            <p className="text-gray-600">
              <strong>description:</strong> {ad.description}
            </p>
            <p className="text-gray-600">
              <strong>Website:</strong>{" "}
              <a
                href={
                  ad.website.match("http") ? ad.website : "http://" + ad.website
                }
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                {ad.website}
              </a>
            </p>
          </div>
        )}
        <button
          className="mt-4 w-full rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 sm:w-auto"
          onClick={handleExpand}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      </div>
    </div>
  );
}

export default PendingAd;
