import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { AuthContext } from "../../context/authcontext";
import { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    var tload = toast.loading("logging in...");
    e.preventDefault();
    setIsLoading(true);

    console.log(email, password);
    try {
      const response = await axios.post("/admin/login", {
        email,
        password,
      });
      const data = await response.data;
      console.log(data);

      if (response.status === 200) {
        console.log(data);
        toast.success("logined successfully ");

        login(data);

        console.log(" session", JSON.parse(localStorage.getItem("user")));
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("something went wrong");
      }
    } finally {
      toast.dismiss(tload);
      setIsLoading(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              size="lg"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              type="password"
              label="Password"
              size="lg"
              required
              minLength={8}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              disabled={isloading}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
