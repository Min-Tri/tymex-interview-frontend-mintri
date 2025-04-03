import React, { useState } from 'react';
import Image from 'next/image';
import { Card, Badge, Tooltip } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { IItem, TRarity } from '@/lib/types';

interface ItemCardProps {
  item: IItem;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, isFavorite = false, onToggleFavorite }) => {
  const tierBg: Record<TRarity, string[]> = {
    Common: ['#49DD81', '#22B4C6'],
    Epic: ['#DD5AFE', '#6366F1'],
    Legendary: ['#FE955A', '#F1DA63'],
    Rare: ['#43A6F6', '#5868F3'],
    Mythic: ['#FE5A5A', '#F163D2'],
  }
  const [isLike, setIsLike] = useState(false)
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
          <div className={`relative pt-[100%] text-white !rounded-sm`} style={{
            backgroundImage: `linear-gradient(140deg, ${tierBg[item.rarity]?.[0]} 0%, ${tierBg[item.rarity]?.[1]} 100%)`
          }}>
            <Image
              src={item.image || 'https://placehold.co/235x235'}
              blurDataURL={'https://placehold.co/235x235'}
              alt={item.name}
              height={120}
              width={120}
              objectFit="contain"
              className="absolute bottom-0 left-1/2 w-3/4 h-3/4 -translate-x-1/2"
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
              onClick={() => {
                onToggleFavorite?.(item.id)
                setIsLike(!isLike)
              }}
              className="absolute top-2 right-2 text-white text-xl bg-opacity-50 cursor-point"
            >
              {(isFavorite || isLike) ? <HeartFilled className="text-white" /> : <HeartOutlined />}
            </button>
          </div>
        }
        style={{ padding: '16px', backgroundColor: '#1a1a2e', color: 'white' }}
        styles={{ body: { padding: '0', backgroundColor: '#1a1a2e', color: 'white' } }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-medium m-0 truncate">{item.name}</h3>
          <span className="text-primary-light font-bold shrink-0 flex items-center gap-1">
            <Image alt='eth'height={8} width={8} src='eth.svg' />
            {item.price} ETH</span>
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