import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import axios from "axios";

export function NewUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      try {
        var tot = toast.loading("adding new Admin user...");
        const response = await axios.post("/admin/newuser", formData);
        if (response.status === 200) {
          toast.success(response.data);
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          toast.error(error.response.data);
        } else {
          toast.error("something went wrong");
        }
      } finally {
        toast.dismiss(tot);
      }

      console.log(formData);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-4 max-w-md rounded-lg bg-white p-4 shadow-md"
    >
      <ToastContainer />
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Add Admin User
      </h2>
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block font-bold text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`border ${
            errors.name ? "border-red-500" : "border-gray-400"
          } w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name}</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block font-bold text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`border ${
            errors.email ? "border-red-500" : "border-gray-400"
          } w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email}</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="mb-2 block font-bold text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`border ${
            errors.password ? "border-red-500" : "border-gray-400"
          } w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors.password && (
          <span className="text-sm text-red-500">{errors.password}</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="mb-2 block font-bold text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="off"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-400"
          } w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors.confirmPassword && (
          <span className="text-sm text-red-500">{errors.confirmPassword}</span>
        )}
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600"
        >
          Add User
        </button>
      </div>
    </form>
  );
}

export default NewUser;
