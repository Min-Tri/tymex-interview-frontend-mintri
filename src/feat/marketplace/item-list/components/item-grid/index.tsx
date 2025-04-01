import React from 'react';
import { Row, Col, Spin, Empty } from 'antd';
import { motion } from 'framer-motion';
import { IItem } from '@/lib/types';
import ItemCard from '@/components/common/Card';
import Button from '@/components/common/Button';

interface ItemGridProps {
  items: IItem[];
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  isFetchingMore: boolean;
}

const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  isLoading,
  isError,
  hasMore,
  onLoadMore,
  isFetchingMore,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <Empty
          description="Error loading items"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <p className="text-gray-400 mt-4">Please try again later</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Empty
          description="No items found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <p className="text-gray-400 mt-4">Try changing your filters</p>
      </div>
    );
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {items.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={`${item.id}-${index}`}>
            <ItemCard item={item} />
          </Col>
        ))}
      </Row>

      {hasMore && (
        <div className="text-center mt-8 mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={onLoadMore}
              loading={isFetchingMore}
              className="bg-primary text-white border-none hover:bg-primary-dark !px-28 !py-8.5"
              size="large"
            >
              View more
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ItemGrid;