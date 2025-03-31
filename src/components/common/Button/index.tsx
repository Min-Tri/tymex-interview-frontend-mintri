import React from 'react';
import '@ant-design/v5-patch-for-react-19';
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';

//custom button antd
interface CustomButtonProps extends AntdButtonProps {
    className?: string;
}

const Button: React.FC<CustomButtonProps> = ({ className, children, ...props }) => {
    return (
        <AntdButton className={'!bg-gradient-to-r !rounded-sm !from-[#DA458F] !to-[#DA34DD] !text-white '+ className} {...props}>
            {children}
        </AntdButton>
    );
};

export default Button;