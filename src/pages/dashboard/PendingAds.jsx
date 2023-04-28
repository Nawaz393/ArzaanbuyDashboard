import React, { useState, useEffect } from "react";
import { PendingAd, Loader } from "@/widgets/cards";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export const PendingAds = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isloading, setisLoading] = useState(false);
  const [pendingads, setPendingAds] = useState([]);
  const ad = {
    name: "samsung",
    price: 1000,
    description: "samsung phone",
    images: [
      "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDc4Mzh8MXwxfGFsbHwxfHx8fHx8Mnx8MTY3NTg1NjIzOQ&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/profile-1609545740442-928866556c38image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
    ],
    contact: "984567890",
    email: "abc@gmail.com",
    website: "m-nawaz.com",
    whatsapp: "984567890",
  };

  useEffect(() => {
    (async () => {
      try {
        setisLoading(true);
        const response = await axios.get("/admin/pending");
        const rdata = await response.data;

        console.log(rdata);

        setPendingAds(rdata);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setisLoading(false);
      }
    })();
  }, [load]);

  const setload = () => {
    setLoad(!load);
  };
  return (
    <div className="mt-12 min-h-screen">
      <ToastContainer />
      {isloading ? (
        <Loader isloading={isloading} />
      ) : (
        <div className="mb-12 grid gap-y-10 gap-x-6 xl:grid-cols-2 ">
          {pendingads?.map((item) => (
            <PendingAd key={item._id} ad={item} setLoad={setload} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingAds;
