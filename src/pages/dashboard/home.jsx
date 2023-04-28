import React, { useState, useEffect } from "react";
import { ClockIcon, CheckIcon } from "@heroicons/react/24/outline";
import { StatisticsCard, Loader } from "@/widgets/cards";

import axios from "axios";
import { CheckBadgeIcon, UserIcon } from "@heroicons/react/24/solid";
export function Home() {
  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setisLoading(true);
        const response = await axios.get("/admin/counts");
        const rdata = await response.data;
        console.log(rdata);
        setData(rdata);
        // console.log(modified);
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    })();
  }, []);
  const check = (item) => {
    if (item === "users") {
      return {
        icon: <UserIcon className="h-5 w-5 text-inherit" />,
        color: "blue",
      };
    } else if (item === "deactivatedusers") {
      return {
        icon: <UserIcon className="h-5 w-5 text-inherit" />,
        color: "red",
      };
    } else if (item === "approvedads") {
      return {
        icon: <CheckIcon className="h-5 w-5 text-inherit" />,
        color: "green",
      };
    } else if (item === "pendingads") {
      return {
        icon: <ClockIcon className="h-5 w-5 text-inherit" />,
        color: "yellow",
      };
    } else if (item === "sponserapprovedads") {
      return {
        icon: <CheckBadgeIcon className="h-5 w-5 text-inherit" />,
        color: "green",
      };
    } else if (item === "sponserpendingads") {
      return {
        icon: <ClockIcon className="h-5 w-5 text-inherit" />,
        color: "yellow",
      };
    }
  };
  return (
    <div className="mt-12 min-h-screen">
      {isloading ? (
        <Loader isloading={isloading} />
      ) : (
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {data?.map((item) => (
            <StatisticsCard
              key={item.name}
              title={item.name}
              icon={check(item.name).icon}
              value={item.count}
              color={check(item.name).color}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
