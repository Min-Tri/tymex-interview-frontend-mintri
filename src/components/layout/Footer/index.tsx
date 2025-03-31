'use client'
import React from 'react';
import { Layout, Row, Col, Input, } from 'antd';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import Button from '@/components/common/Button';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter className="!bg-black pt-16 pb-8 px-6 !text-white">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="mb-6">NAVIGATION</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/" className="!text-white hover:text-primary">Home</Link>
                <Link href="/whitepaper" className="!text-white hover:text-primary">Whitepaper</Link>
                <Link href="/about" className="!text-white hover:text-primary">About us</Link>
                <Link href="/faqs" className="!text-white hover:text-primary">FAQs</Link>
                <Link href="/marketplace" className="!text-white hover:text-primary">Marketplace</Link>
                <Link href="/news" className="!text-white hover:text-primary">News</Link>
                <Link href="/team" className="!text-white hover:text-primary">Our teams</Link>
                <Link href="/community" className="!text-white hover:text-primary">Community</Link>
                <Link href="/roadmap" className="!text-white hover:text-primary">Roadmap</Link>
              </div>
            </motion.div>
          </Col>

          <Col xs={24} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h4 className="mb-6">CONTACT US</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <PhoneOutlined className="mr-3 text-primary" />
                  <p>01234568910</p>
                </div>
                <Link href={'mailto:tymex-talent@tyme.com'} className="flex items-center !text-white">
                  <MailOutlined className="mr-3 text-primary" />
                  <p>tymex-talent@tyme.com</p>
                </Link>
              </div>
            </motion.div>
          </Col>

          <Col xs={24} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h4 className="mb-6">SUBSCRIBE TO RECEIVE OUR LATEST UPDATE</h4>
              <div className="flex">
                <Input
                  placeholder="Your email address"
                  className="bg-background-card border-gray-700 flex-grow"
                />
                <Button type="primary" className="ml-2 border-none">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </Col>
        </Row>

        <div className="mt-16 pt-6 border-t border-gray-800 text-center  text-sm lg:justify-between lg:flex">
          <p>©2023 Tyme - Edit. All Rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/security" className=" !text-white  hover:!text-gray-400">Security</Link>
            <Link href="/legal" className=" !text-white  hover:!text-gray-400">Legal</Link>
            <Link href="/privacy" className=" !text-white  hover:!text-gray-400">Privacy</Link>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;