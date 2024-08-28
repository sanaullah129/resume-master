"use client";
import { Button, Form, FormProps, Input } from "antd";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Login as LoginInterface } from "../utils/Interfaces";

const Login: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      localStorage.clear();
    } else {
      router.push("/");
    }
  }, []);

  const onFinish: FormProps<LoginInterface>["onFinish"] = async (values) => {
    const { username, password } = values;
    toast.loading("Processing...");
    const logIn = await fetch((process.env.NEXT_PUBLIC_API_LINK as string) + "user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      }
    );
    const response = await logIn.json();
    if (response.token) {
      toast.success("Logged in Successfully");
      localStorage.setItem("auth-token", ("Bearer " + response.token) as string);
      router.push("/");
    } else {
      toast.error("Internal Server Error");
    }
    toast.dismiss();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border border-black shadow-lg h-max w-[400px] rounded-lg bg-white p-4">
        <h2 className="text-center text-2xl font-bold p-4">Log in</h2>
        <Form onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your Username or EmailId",
              },
            ]}
          >
            <Input placeholder="Enter your Username or Email Id" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-2">
          <p className="text-black">
            Don't have an account?{" "}
            <Button type="default" onClick={() => router.push("/sign-up")}>
              Sign up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
