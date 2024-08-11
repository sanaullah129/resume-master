"use client";
import { Button, Form, FormProps, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Login as LoginInterface } from "../utils/Interfaces";


const Login: React.FC = () => {
  const router = useRouter();

  const onFinish: FormProps<LoginInterface>["onFinish"] = (values) => {
    const { username, password } = values;
    console.log(values);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border border-black shadow-lg h-max w-[400px] rounded-lg bg-white p-4">
        <h2 className="text-center text-2xl font-bold p-4">Log in</h2>
        <Form onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your Username or EmailId" }]}
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
          <p>
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
