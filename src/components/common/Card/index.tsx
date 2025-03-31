import React from 'react';
import Image from 'next/image';
import { Card, Badge, Tooltip } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { IItem } from '@/lib/types';

interface ItemCardProps {
  item: IItem;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, isFavorite = false, onToggleFavorite }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        className="h-full overflow-hidden bg-background-card border-0 shadow-lg"
        cover={
          <div className={`relative pt-[100%] text-white`}>
            <Image
              src={item.image || 'https://placehold.co/235x235'}
              blurDataURL={'https://placehold.co/235x235'}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="absolute top-0 left-0"
            />
            <Badge
              className="!absolute top-2 left-2"
              count={item.rarity}
              style={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#fff',
                borderRadius: '4px',
              }}
            />
            <button
              onClick={() => onToggleFavorite?.(item.id)}
              className="absolute top-2 right-2 text-white text-xl bg-opacity-50"
            >
              {isFavorite ? <HeartFilled className="text-white" /> : <HeartOutlined />}
            </button>
          </div>
        }
        style={{ padding: '16px', backgroundColor: '#1a1a2e', color: 'white' }}
        styles={{ body: { padding: '0', backgroundColor: '#1a1a2e', color: 'white' } }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-medium m-0 truncate">{item.name}</h3>
          <span className="text-primary-light font-bold">{item.price} ETH</span>
        </div>
        <div className="flex items-center">
          <Tooltip title={item.creator.name}>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                <Image
                  src={item.creator.avatar || 'https://placehold.co/24x24'}
                  blurDataURL={'https://placehold.co/24x24'}
                  alt={item.creator.name}
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-gray-400 text-xs truncate">{item.creator.name}</span>
            </div>
          </Tooltip>
        </div>
      </Card>
    </motion.div>
  );
};

export default ItemCard;