import { ClockLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  smallHeight?: boolean;
  card?: boolean;
  large?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ smallHeight, card, large }) => {
  return (
    <div
      className={`${smallHeight ? 'h-[250px]' : ''}${card ? 'h-[42vh]' : ''}${large ? 'h-[70vh]' : ''}
      w-full
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <ClockLoader size={130} color="#e46f6c" />
    </div>
  );
};

export default LoadingSpinner;
