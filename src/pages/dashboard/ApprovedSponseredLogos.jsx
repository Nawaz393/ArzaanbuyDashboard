import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "@/widgets/cards";
import axios from "axios";
export function ApprovedSponseredLogos() {
  const [logos, SetLogos] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get("/admin/sponseredapproved");
        const data = await response.data;
        SetLogos(data);
        console.log(data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <ToastContainer />
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Sponsered Logos
          </Typography>
        </CardHeader>
        {loading ? (
          <Loader isloading={loading} />
        ) : (
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Logo", "Link", "Location"].map((el) => (
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
                {logos?.map(({ image, link, location }, key) => {
                  const className = `py-3 px-5 ${
                    key === logos.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                  return (
                    <tr key={key}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={image} alt={link} size="sm" />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          <a
                            href={
                              link.match("http")>0 ? link : `http://${link}`
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            {link}
                          </a>
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {location === 1 ? "top" : "bottom"}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        )}
      </Card>
    </div>
  );
}

export default ApprovedSponseredLogos;
