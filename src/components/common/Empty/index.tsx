import React from 'react';
import { Empty as AntEmpty } from 'antd';
import type { EmptyProps as AntEmptyProps } from 'antd';

interface EmptyProps extends Partial<AntEmptyProps> {
    message?: string;
}

const Empty: React.FC<EmptyProps> = ({ 
    message = 'No data available',
    image = AntEmpty.PRESENTED_IMAGE_SIMPLE,
    ...restProps
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <AntEmpty
                description={message}
                image={image}
                {...restProps}
            />
        </div>
    );
};

export default Empty;
