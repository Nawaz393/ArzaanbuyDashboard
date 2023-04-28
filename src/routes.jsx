import {
  HomeIcon,
  UserPlusIcon,
  UserIcon,
  LockClosedIcon,
  ArrowPathIcon,
  ClockIcon,
  CheckCircleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Tables,
  DeactivatedUsers,
  PendingAds,
  NewUser,
  PendingSponserAds,
  ApprovedSponseredLogos,
  ApprovedAds,
} from "@/pages/dashboard";
import PostAd from "./pages/dashboard/PostAd";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },

      {
        icon: <ArrowPathIcon {...icon} />,
        name: "Pending Ads",
        path: "/pendingads",
        element: <PendingAds />,
      },
      {
        icon: <ClockIcon {...icon} />,
        name: "Pending Sponser Logos",
        path: "/sponserpendinglogos",
        element: <PendingSponserAds />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "All Users",
        path: "/users",
        element: <Tables />,
      },
      {
        icon: <LockClosedIcon {...icon} />,
        name: "locked users",
        path: "/lockedusers",
        element: <DeactivatedUsers />,
      },
      {
        icon: <CheckBadgeIcon {...icon} />,
        name: "Approved Ads",
        path: "/approvedads",
        element: <ApprovedAds />,
      },
      {
        icon: <CheckCircleIcon {...icon} />,
        name: "Sponsered logos",
        path: "/approvedlogos",
        element: <ApprovedSponseredLogos />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Add New User",
        path: "/newuser",
        element: <NewUser />,
      },
      {
        icon: <ArrowPathIcon {...icon} />,
        name: "Post Ad",
        path: "/postad",
        element: <PostAd />,
      },
    ],
  },
];

export default routes;
