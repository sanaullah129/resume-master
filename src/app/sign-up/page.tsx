"use client";
import { Button, Form, FormProps, Input } from "antd";
import React, { useState } from "react";
import { SignUp as FormSubmit } from "../utils/Interfaces";
import toast from "react-hot-toast";

interface SubmitProps extends FormSubmit {
  confirmPassword: string;
}

const SignUp = () => {
  const onFinish: FormProps<SubmitProps>["onFinish"] = (values) => {
    if (
      !values.emailId ||
      !values.username ||
      !values.password ||
      !values.confirmPassword
    ) {
      return toast("Please fill all the details");
    }

    toast.loading("Processing");

    if (values.confirmPassword != values.password) {
      toast.dismiss();
      return toast.error("Passwords doesn't match");
    }
    console.log(values);
    toast.dismiss();
    return toast.success("Completed");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border border-black shadow-lg h-max w-[400px] rounded-lg bg-white p-4">
        <h2 className="text-center text-2xl font-bold p-4">Sign Up</h2>
        <Form onFinish={onFinish} autoComplete="off">
          <Form.Item label="Username" name="username">
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item label="Email Id" name="emailId">
            <Input placeholder="Enter your email id" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword">
            <Input.Password placeholder="Re-enter your password" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
