import React, { useState } from "react";

import {
  UserOutlined,
  DashboardOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import "./theme.css"

import type { MenuProps } from "antd";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Breadcrumb, Layout, Menu, theme } from "antd";

import logo from "./logo.png";




const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,

  key: React.Key,

  icon?: React.ReactNode,

  children?: MenuItem[]
): MenuItem {
  return {
    key,

    icon,

    children,

    label,
  } as MenuItem;
}

const items: MenuItem[] = [getItem("นำเข้าสัตว์", "1", <PlusOutlined />)];

const SidebarAnimal: React.FC = () => {
  const page = localStorage.getItem("page");

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  return (
        <Sider
          style={{ backgroundColor: "#424530", height : "90vh" }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              display: "flex",

              justifyContent: "center",

              marginTop: 20,

              marginBottom: 20,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "40%", borderRadius: "50%" }}
            />
          </div>

          <Menu
            theme="dark"
            defaultSelectedKeys={[page ? page : "AnimalInfo"]}
            mode="inline"
          >
            <Menu.Item
              key="AnimalInfo"
              onClick={() => setCurrentPage("AnimalInfo")}
            >
              <Link to="/DashboardAnimal">
                <PlusOutlined />

                <span>ลงทะเบียนนำเข้าสัตว์</span>
              </Link>
            </Menu.Item>
          </Menu>
          <Menu
            theme="dark"
            defaultSelectedKeys={[page ? page : "AbnormalReport"]}
            mode="inline"
          >
            <Menu.Item
              key="AnimalInfo"
              onClick={() => setCurrentPage("AbnormalReport")}
            >
              <Link to="/DashboardAbnormal">
                <PlusOutlined />

                <span>แจ้งสัตว์ที่ดูผิดปกติ</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
  );
};

export default SidebarAnimal;
