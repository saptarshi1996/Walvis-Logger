import { Layout, Menu, Divider, Typography } from 'antd';

const {
  Title,
} = Typography;

const {
  Sider,
} = Layout;

export default function SideMenu({
  containers,
}) {
  return (
    <>
      <Sider>
        <Title style={
          {
            marginLeft: "10%",
            marginTop: "5%",
            color: "#fff",
          }
        } level={4}>
          Containers
        </Title>
        <Divider />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={containers}
          onClick={(e) => { console.log(e); }}
        />
      </Sider>
    </>
  );
};
