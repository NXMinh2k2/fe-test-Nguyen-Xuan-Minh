import React, { useState } from 'react';
import { Button, Layout, Menu, ConfigProvider, theme } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false); 

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout className="min-h-screen">
        <Header style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 20px',
          background: isDark ? '#141414' : '#fff' 
        }}>
            <div style={{ flex: 1, minWidth: 0 }}>
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={[
                { key: '/', label: <Link to="/">Dashboard</Link> },
                { key: '/tasks', label: <Link to="/tasks">Tasks</Link> },
              ]}
              style={{ borderBottom: 'none', background: 'transparent' }}
            />
          </div>

        <div style={{ marginLeft: '16px', display: 'flex', alignItems: 'center' }}>
          <Button
            type="primary" 
            shape="circle"
            icon={isDark ? <SunOutlined /> : <MoonOutlined />}
            onClick={() => setIsDark(!isDark)}
          />
        </div>
      </Header>

        <Content className="p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;