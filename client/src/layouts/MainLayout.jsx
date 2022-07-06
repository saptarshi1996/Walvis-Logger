import React, { useState } from 'react';
import { Layout } from 'antd';

import "../pages/Main.css";

import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';

import { useGetContainerListQuery } from '../query/container';

const { Content } = Layout;

export default function MainLayout ({ children }) {

  const [selectedContainer, setSelectedContainer] = useState('');
  const containerListQuery = useGetContainerListQuery();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SideMenu
        containerList={containerListQuery?.data}
        isContainerListLoading={containerListQuery?.isLoading}
        setSelectedContainer={setSelectedContainer}
      />
      <Layout className="site-layout">
        <TopMenu />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <h1>{ selectedContainer }</h1>
          { children }
        </Content>
      </Layout>
    </Layout>
  );
};
