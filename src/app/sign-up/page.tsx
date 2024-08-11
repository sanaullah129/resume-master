"use client";
import { Button, Form, FormProps, Input } from "antd";
import React from "react";
import { SignUp as FormSubmit } from "../utils/Interfaces";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SubmitProps extends FormSubmit {
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();

  const onFinish: FormProps<SubmitProps>["onFinish"] = (values) => {
    const { emailId, username, password, confirmPassword } = values;

    toast.loading("Processing");

    if (password !== confirmPassword) {
      toast.dismiss();
      return toast.error("Passwords don't match");
    }

    console.log(values);
    toast.dismiss();
    toast.success("Completed");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border border-black shadow-lg h-max w-[400px] rounded-lg bg-white p-4">
        <h2 className="text-center text-2xl font-bold p-4">Sign Up</h2>
        <Form onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Email Id"
            name="emailId"
            rules={[{ required: true, message: "Please enter your email id" }]}
          >
            <Input placeholder="Enter your email id" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password" },
            ]}
          >
            <Input.Password placeholder="Re-enter your password" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-2">
          <p>
            Already have an account?{" "}
            <Button type="default" onClick={() => router.push("/login")}>
              Log In
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
