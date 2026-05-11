import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

const MainLayout = () => {
  const location = useLocation();

  return (
    <Layout className="min-h-screen">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/",
              label: (
                <Link to="/">
                  Dashboard
                </Link>
              ),
            },
            {
              key: "/tasks",
              label: (
                <Link to="/tasks">
                  Tasks
                </Link>
              ),
            },
          ]}
        />
      </Header>

      <Content className="p-6 bg-gray-100">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;