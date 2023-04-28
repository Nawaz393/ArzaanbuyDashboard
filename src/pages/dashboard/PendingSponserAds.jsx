import React from "react";
import { Loader, SponserCard } from "@/widgets/cards";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
export const PendingSponserAds = () => {
  const [sponserAds, setSponserAds] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get("/admin/sponseredpending");
        const rdata = await response.data;
        console.log(rdata);
        setSponserAds(rdata);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [load]);

  const setload = () => {
    setLoad(!load);
  };
  return (
    <div className=" min-h-screen">
      <ToastContainer />

      {loading ? (
        <Loader />
      ) : (
        <div className="mb-12 grid grid-cols-1  gap-y-10 gap-x-6 xl:grid-cols-2 ">
          {sponserAds?.map((sponserAd) => {
            return (
              <SponserCard
                image={sponserAd.image}
                link={sponserAd.link}
                key={sponserAd._id}
                location={sponserAd.location}
                id={sponserAd._id}
                setLoad={setload}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PendingSponserAds;
