import React from 'react';
import * as motion from "framer-motion/client"
import Image from 'next/image';
import { Button } from 'antd';

interface HeroBannerProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title = "NEW ARRIVAL",
  description,
  actionLabel = "SHOP NOW",
  onActionClick,
}) => {
  return (
    <div className="relative h-96 md:h-[500px] w-full overflow-hidden" style={{ backgroundImage: 'url(/images/hero-bg.png) !important', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="absolute inset-0 z-0">
        {/* <Image
          src={imageUrl}
          alt="Banner background"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        /> */}
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="w-full relative flex flex-col items-start justify-between h-full">
          <div/>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='max-w-2xl'
          >
            <div className="relative">
              {/* <div className="absolute -left-10 -top-10">
                <motion.div
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-2xl transform rotate-12"
                >
                  NEW
                </motion.div>
              </div> */}

              {/* <h1 className="text-6xl font-bold text-white mb-4">{title}</h1> */}
              <Image src="shop-now.svg" height={300} width={1000} objectFit='contain' alt='shop now' />
            </div>

            {/* {description && (
              <p className="text-gray-300 text-xl mb-8">{description}</p>
            )}

            {actionLabel && (
              <Button
                type="primary"
                size="large"
                className="bg-primary border-none hover:bg-primary-dark text-lg h-12 px-8"
                onClick={onActionClick}
              >
                {actionLabel}
              </Button>
            )} */}
          </motion.div>
          <div className='w-full min-h-[200px] max-h-fit relative bottom-0'>
            <Image
              src="/images/Vector.png"
              alt="Marketplace Background"
              fill
              className="object-center h-[150px] w-full"
              objectFit="cover"
            />
          </div>
          <div className='w-full max-h-[400px] absolute right-2'>
            <Image
              src="/images/The DJ.png"
              alt="Marketplace Background"
              fill
              className="object-top !h-[400px] !w-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;