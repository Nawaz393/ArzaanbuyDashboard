import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import { Loader } from "@/widgets/cards";
import axios from "axios";
export const DeactivatedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const response = await axios.get("/admin/users/deactivated");
        const data = await response.data;
        setUsers(data);
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

  const handelActivate = async (id) => {
    try {
      setLoading(true);
      const response = await axios.put(`/admin/users/deactivated`, {
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
            All Users
          </Typography>
        </CardHeader>

        {loading ? (
          <Loader isloading={loading} />
        ) : (
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["User", "Info", "Edit"].map((el) => (
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
                {users?.map(
                  ({ image, name, email, address, _id, phone }, key) => {
                    const className = `py-3 px-5 ${
                      key === authorsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={image} alt={name} size="sm" />
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
                            {address}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {phone}
                          </Typography>
                        </td>

                        <td
                          className={`${className} flex w-32 items-center justify-between  text-sm`}
                        >
                          <LockOpenIcon
                            height={"30"}
                            className="cursor-pointer hover:text-gray-900 "
                            title="activate/unlock the user"
                            onClick={() => handelActivate(_id)}
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
};

export default DeactivatedUsers;
