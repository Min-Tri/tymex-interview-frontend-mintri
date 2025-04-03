'use client'
import Button from '@/components/common/Button';
import { Drawer, DrawerProps, Select } from 'antd';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Image from 'next/image';
import { useState } from 'react';

const { Header } = Layout;

interface NavbarProps {
  lang?: string;
}

function Navbar({ lang }: NavbarProps) {
  const menuItems = [
    { key: 'home', label: 'HOME' },
    { key: 'about', label: 'ABOUT US' },
    { key: 'teams', label: 'OUR TEAMS' },
    { key: 'marketplace', label: 'MARKETPLACE' },
    { key: 'roadmap', label: 'ROADMAP' },
    { key: 'whitepaper', label: 'WHITEPAPER' },
  ];

  const [open, setOpen] = useState(false);

  const showDrawer = (val: boolean) => {
    setOpen(val);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Header className="!bg-transparent !p-0 !text-white flex w-full items-center">
      <div className="container mx-auto px-2 lg:px-4 flex items-center justify-between">
        <div className="hidden lg:flex items-center w-full">
          <div className='hidden lg:block lg:w-[200px]' />
          <Menu
            mode="horizontal"
            theme="dark"
            items={menuItems}
            defaultSelectedKeys={['marketplace']}
            className="!bg-transparent border-0 !w-full [&_.ant-menu-item]:!text-white [&_.ant-menu-item-selected]:!bg-gradient-to-r [&_.ant-menu-item-selected]:!from-[#DA458F] [&_.ant-menu-item-selected]:!to-[#DA34DD] [&_.ant-menu-item-selected]:!text-transparent [&_.ant-menu-item-selected]:bg-clip-text [&_.ant-menu-item-selected]:!underline [&_.ant-menu-item-active]:!bg-transparent [&_.ant-menu-item-active]:!bg-clip-text [&_.ant-menu-item]:hover:underline [&_.ant-menu-item-selected]:hover:!bg-clip-text [&_.ant-menu-item-active]:hover:!bg-clip-text [&_.ant-menu-item-selected]:hover:underline [&_.ant-menu-item-active]:hover:underline"
          />
        </div>
        <Button
          type="primary"
          style={{ boxShadow: 'none !important' }}
          className='lg:!hidden'
          onClick={() => showDrawer(!open)}
        >
          ✨
        </Button>
        <div className="flex items-center gap-3 w-fit">
          <Button
            type="primary"
            style={{ boxShadow: 'none !important' }}
          >
            Connect Wallet
          </Button>
          <Select prefix={
            <Image className='mr-2' alt='lang' src='globe.svg' width={16} height={16} />
          } className='!w-[90px] !text-white' defaultValue={lang || 'en'} >
            <Select.Option value="en">EN</Select.Option>
            <Select.Option value="vn">VN</Select.Option>
          </Select>
        </div>
      </div>
      <Drawer
        closable
        placement={'left'}
        destroyOnClose
        onClose={onClose}
        open={open}
        key={'left'}
        className='block lg:!hidden'
        classNames={{ header: '[&>div>button>span>svg]:!text-white [&>div>button>span>svg]:!fill-white' }}
      >
        <Menu
          mode="vertical"
          theme="dark"
          items={menuItems}
          defaultSelectedKeys={['marketplace']}
          className="!bg-transparent border-0 !w-full [&_.ant-menu-item]:!text-white [&_.ant-menu-item-selected]:!bg-gradient-to-r [&_.ant-menu-item-selected]:!from-[#DA458F] [&_.ant-menu-item-selected]:!to-[#DA34DD] [&_.ant-menu-item-selected]:!text-transparent [&_.ant-menu-item-selected]:bg-clip-text [&_.ant-menu-item-selected]:underline "
        />
      </Drawer>
    </Header >
  );
}

export default Navbar;