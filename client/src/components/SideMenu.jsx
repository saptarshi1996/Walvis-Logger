import React from 'react';
import { Layout, Menu, Typography, Spin } from 'antd';

const { Title } = Typography;
const { Sider } = Layout;

export default function SideMenu ({
  containerList,
  isContainerListLoading,
  setSelectedContainer,
}) {

  const ShowSpin = () => {
    return (
      <>
        <Spin style={{ "marginLeft": "25%" }} size="large" />
      </>
    );
  };

  return (
    <>
      <Sider>
        <Title style={
          {
            marginLeft: "10%",
            marginTop: "25%",
            color: "#fff",
          }
        } level={4}>
          Containers
        </Title>
        {isContainerListLoading ? <><ShowSpin /></> : <Menu
          theme="dark"
          mode="inline"
          items={containerList}
          onClick={(e) => setSelectedContainer(e.key)}
        />}
      </Sider>
    </>
  );
};
