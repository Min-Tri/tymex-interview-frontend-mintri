import classNames from 'classnames';
import Image from 'next/image';
import React, { CSSProperties, HTMLAttributes } from 'react';

interface CharacterProps {
  name: string;
  src: string;
  alt: string;
  className?: string;
}

const Character: React.FC<CharacterProps> = ({ name, src, alt, className }) => {
  return (
    <div className={classNames("flex flex-col items-center",className)}>
      <div className="w-48 h-40 relative text-center">
        <Image
          src="/images/Group.png"
          alt="Character background"
          height={75}
          width={192}
          objectFit="contain"
          className="absolute -bottom-3 left-0 right-0 z-0"
        />
        <Image
          src={src}
          alt={alt}
          width={160}
          height={160}
          className="object-cover w-[160px] h-full relative mx-auto"
        />
      </div>
      <h3 className="mt-3 text-lg font-semibold text-gray-800">
        {name.toUpperCase()}
      </h3>
    </div>
  );
};

export default Character;