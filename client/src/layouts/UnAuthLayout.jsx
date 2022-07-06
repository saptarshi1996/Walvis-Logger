import React from 'react';
import { Layout } from 'antd';

import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';

const { Content } = Layout;
const topMenuItems = [
  {
    key: '/',
    label: 'Logs',
  },
];

export default function UnAuthLayout ({ children }) {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SideMenu />
      <Layout className="site-layout">
        <TopMenu {...{ topMenuItems }} />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          { children }
        </Content>
      </Layout>
    </Layout>
  );
};
