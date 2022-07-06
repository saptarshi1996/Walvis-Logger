import { Menu, Layout } from 'antd';

const { Header } = Layout;

export default function TopMenu({
  topMenuItems,
}) {
  return (
    <>
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/logs']}
          items={topMenuItems}
        />
      </Header>
    </>
  );
};
