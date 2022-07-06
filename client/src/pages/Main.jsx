import { Layout } from 'antd';
import React from 'react';
import { useState } from 'react';

import "./Main.css";

import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';

const {
  Content
} = Layout;

const topMenuItems = [
  {
    key: '/',
    label: 'Logs',
  }
];

export default function Main() {

  const [containers, setContainers] = useState([]);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SideMenu {...{
        containers,
      }} />
      <Layout className="site-layout">
        <TopMenu {...{ topMenuItems }} />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          Logs
        </Content>
      </Layout>
    </Layout>
  );
};
