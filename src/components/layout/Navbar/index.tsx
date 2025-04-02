'use client'
import Button from '@/components/common/Button';
import { Select } from 'antd';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Image from 'next/image';

const { Header } = Layout;

function Navbar() {
  const menuItems = [
    { key: 'home', label: 'HOME' },
    { key: 'about', label: 'ABOUT US' },
    { key: 'teams', label: 'OUR TEAMS' },
    { key: 'marketplace', label: 'MARKETPLACE' },
    { key: 'roadmap', label: 'ROADMAP' },
    { key: 'whitepaper', label: 'WHITEPAPER' },
  ];

  return (
    <Header className="!bg-transparent p-0 !text-white">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center w-full">
          <div className='hidden lg:block lg:w-[200px]'/>
          <Menu
            mode="horizontal"
            theme="dark"
            items={menuItems}
            defaultSelectedKeys={['marketplace']}
            className="!bg-transparent border-0 !w-full [&_.ant-menu-item]:!text-white [&_.ant-menu-item-selected]:!bg-gradient-to-r [&_.ant-menu-item-selected]:!from-[#DA458F] [&_.ant-menu-item-selected]:!to-[#DA34DD] [&_.ant-menu-item-selected]:!text-transparent [&_.ant-menu-item-selected]:bg-clip-text [&_.ant-menu-item-selected]:underline "
          />
        </div>
        <div className="flex items-center gap-3">

        <Button
          type="primary"
          style={{ boxShadow: 'none !important' }}
        >
          Connect Wallet
        </Button>
        <Select prefix={
          <Image alt='lang' src='globe.svg' width={16} height={16} />
        } className='!w-[70px] !text-white' defaultValue="en">
          <Select.Option value="en">EN</Select.Option>
          <Select.Option value="vn">VN</Select.Option>
        </Select>
        </div>
      </div>
    </Header >
  );
}

export default Navbar;