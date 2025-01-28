import { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  bgColor?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<'button'>;

export const Button = ({
  children,
  bgColor,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button className={`${bgColor ? '' : ''} ${className}`} {...props}>
      {children}
    </button>
  );
};
