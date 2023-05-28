export interface ButtonProps {
  onClick?: () => void | Promise<boolean> | Promise<void>;
  type: 'button' | 'reset' | 'submit';
  text: string;
  iconProps?: {
    src: string;
    alt: string;
    size: number;
  };
}
