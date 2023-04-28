import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/outline";

import { Loader } from "@/widgets/cards";
import axios from "axios";

export function ApprovedAds() {
  const [Ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const response = await axios.get("/admin/approvedads");
        const data = await response.data;
        setAds(data);
        console.log(data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [load]);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/admin/deleteApproved`, {
        params: {
          id: id,
        },
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
      setLoad(!load);
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <ToastContainer />
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Approved Ads
          </Typography>
        </CardHeader>

        {loading ? (
          <Loader isloading={loading} />
        ) : (
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["User", "title/phone", "boost", "Delete"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Ads?.map(
                  (
                    { images, name, tagline, email, _id, phone, boost },
                    key
                  ) => {
                    const className = `py-3 px-5 ${
                      key === Ads.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={_id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={images[0]} alt={name} size="sm" />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {tagline}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {phone}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {boost.boosted ? "Boosted" : "Not Boosted"}
                          </Typography>
                        </td>

                        <td
                          className={`${className} flex w-32 items-center justify-between  text-sm`}
                        >
                          <TrashIcon
                            height={"30"}
                            color="red"
                            className="cursor-pointer hover:text-red-700"
                            title="delete the ad"
                            onClick={() => handleDelete(_id)}
                            role="button"
                          />
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        )}
      </Card>
    </div>
  );
}

export default ApprovedAds;
