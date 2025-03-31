import React from 'react';
import { Skeleton as AntdSkeleton, Card, Row, Col } from 'antd';

interface ItemSkeletonProps {
  count?: number;
}

const Skeleton: React.FC<ItemSkeletonProps> = ({ count = 8 }) => {
  return (
    <Row gutter={[16, 16]}>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card className="bg-background-card border-0">
              <AntdSkeleton.Image active className="w-full h-48" />
              <AntdSkeleton active paragraph={{ rows: 1 }} className="mt-4" />
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default Skeleton;