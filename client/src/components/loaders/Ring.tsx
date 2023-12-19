import { ring } from 'ldrs';

ring.register();

interface RingProps {
  size: number;
  color?: string
};

const Ring: React.FC<RingProps> = ({ size, color }) => {
  return (
    <l-ring
      size={size}
      stroke='5'
      bg-opacity='0'
      speed='2'
      color={color ? color : 'white'}
    ></l-ring>
  );
};

export default Ring;
