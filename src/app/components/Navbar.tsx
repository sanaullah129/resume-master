"use client";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useRouter();

  const handleDashboardMenu = () => navigate.push("/dashboard");
  const handleLogoutMenu = () => navigate.push("/logout");

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={handleDashboardMenu}>Dashboard</div>,
    },
    {
      key: "2",
      label: <div onClick={handleLogoutMenu}>Logout</div>,
      danger: true,
    },
  ];

  return (
    <>
      <div className="sticky top-0 w-full bg-blue-400 z-30 shadow-sm">
        <Space className="flex justify-between p-2 mx-2">
          <div>
            <h1>Resumate</h1>
          </div>
          <div className="cursor-pointer">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Avatar size={45} icon={<FaUserAlt />} />
            </Dropdown>
          </div>
        </Space>
      </div>
    </>
  );
};

export default Navbar;
