'use client';

import '@ant-design/v5-patch-for-react-19';
import Skeleton from '@/components/common/Skeleton';
import { useItems } from '@/hooks/useItems';
import { Col, Flex, Row, Tag } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import Filters from './components/filters';
import ItemGrid from './components/item-grid';
import { itemCategories, TItemCategory } from '@/lib/types';
import Image from 'next/image';
import Empty from '@/components/common/Empty';


const ItemList: React.FC = () => {
  const {
    items,
    isLoading,
    isError,
    hasMore,
    loadMore,
    filters,
    setFilters,
    resetFilters,
    isFetching,
  } = useItems({
    search: '',
    category: null,
    rarity: null,
    priceRange: [0, 400],
    type: null,
    sortByTime: 'latest',
  });
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    setFilters({ ...filters, category: nextSelectedTags[0] as TItemCategory })
  };

  return (
    <div className="w-full" style={{ backgroundImage: 'url(/images/marketplace-bg.png) !important', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Row gutter={[24, 24]} className='w-full max-w-7xl !mx-auto px-4 py-12'>
        <Col xs={24} lg={6}>
          <div className="sticky top-24">
            <Filters
              filters={filters}
              onFilterChange={setFilters}
              onFilterReset={() => {
                resetFilters()
                setSelectedTags([])
              }}
            />
          </div>
        </Col>

        <Col xs={24} lg={18}>
          {/* <div className="flex justify-between items-center mb-6">
            <h3 className="text-white m-0">
              Featured Items
            </h3>
            <div className="text-gray-400">
              {!isLoading && `${items.length} item${items.length !== 1 ? 's' : ''}`}
            </div>
          </div> */}
          <Flex gap={4} wrap align="center">
            <Tag.CheckableTag
              key="all"
              checked={selectedTags.length === 0}
              onChange={(checked) => {
                const nextSelectedTags = checked ? [] : selectedTags;
                setSelectedTags(nextSelectedTags);
                setFilters({ ...filters, category: 'all' as TItemCategory })
              }}
            >
              All
            </Tag.CheckableTag>
            {Object.values(itemCategories).map<React.ReactNode>((tag) => (
              <Tag.CheckableTag
                key={tag}
                checked={selectedTags.includes(tag)}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag}
              </Tag.CheckableTag>
            ))}
          </Flex>

          {/* <Divider className="border-gray-800 mb-8" /> */}
          <div className='mb-8' />

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Skeleton count={12} />
              </motion.div>
            ) :
              items.length === 0 ? (
                <Empty />
              )
                : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ItemGrid
                      items={items}
                      isLoading={isLoading}
                      isError={isError}
                      hasMore={hasMore}
                      onLoadMore={loadMore}
                      isFetchingMore={isFetching && items.length > 0}
                    />
                  </motion.div>
                )}
          </AnimatePresence>
        </Col>
      </Row>
      <div className='w-full min-h-[200px] lg:min-h-[400px] max-h-fit relative'>
        <Image
          src="decor.svg"
          alt="Marketplace Background"
          fill
          className="object-top !h-[200px] lg:!h-[400px] w-full"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default ItemList;