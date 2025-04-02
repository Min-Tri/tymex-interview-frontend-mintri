import React from 'react';
import * as motion from "framer-motion/client"
import Image from 'next/image';
import { Button } from 'antd';
import Character from './components/character';

interface HeroBannerProps {
  link?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  link = '#',
}) => {
  return (
    <div className="relative h-80 sm:h-96 md:h-[600px] w-full overflow-hidden" style={{ backgroundImage: 'url(/images/hero-bg.png) !important', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="relative z-10 h-full max-w-7xl mx-auto flex items-center">
        <div className="w-full relative flex flex-col items-center md:items-start justify-center md:justify-between h-full">
          <div className='hidden md:block' />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='max-w-2xl mx-5 md:ml-20'
          >
            <a className="relative" href={link}>
              <Image src="shop-now.svg" height={300} width={1000} objectFit='contain' alt='shop now' />
            </a>
          </motion.div>
          <div className='w-full hidden min-h-[250px] max-h-fit relative md:flex items-center gap-4 lg:gap-8 pl-8 lg:pl-12' style={{ backgroundImage: 'url(/images/Vector.png) !important', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <Character name="ASSASSIN" src='/images/Assassin.png' alt='ASSASSIN' />
            <Character name="NEON GUY" src='/images/Neon Guy.png' alt='NEON GUY' />
            <Character name="MAFIA ENGLAND" src='/images/Mafia England.png' alt='MAFIA ENGLAND' className={'hidden lg:block'} />
            <Character name="Bassketball Girl" src='/images/Bassketball Girl.png' alt='Bassketball Girl' className={'hidden xl:block'} />
          </div>
          <div className='w-[500px] hidden md:block max-h-[600px] absolute -right-4 bottom-0 -translate-y-[450px]'>
            <Image
              src="/images/The DJ.png"
              alt="Marketplace Background"
              fill
              className="object-top !h-[500px] !w-[600px] -scale-x-100"
            />
            <Image
              src="/images/lineDJ.png"
              alt="line"
              height={100}
              width={265}
              objectFit="contain"
              className="object-center absolute top-[335px] left-[57%] -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;