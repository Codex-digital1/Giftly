import React, { useState } from 'react';

const wrappingOptions = [
    { id: 'birthday', name: 'Birthday Theme', image: 'https://i.ibb.co.com/94pZgvk/images.jpg' },
    { id: 'wedding', name: 'Wedding Theme', image: 'https://i.ibb.co.com/XLGVQFf/images.jpg' },
    { id: 'anniversary', name: 'Anniversary Theme', image: 'https://i.ibb.co.com/JnMCQSh/download.jpg' },
    { id: 'valentines', name: 'Valentine’s Day Theme', image: 'https://i.ibb.co.com/Kh0T6BG/images.jpg' },
    { id: 'newyear', name: 'New Year Theme', image: 'https://i.ibb.co.com/w7y5BYy/images.jpg' },
    { id: 'babyshower', name: 'Baby Shower Theme', image: 'https://i.ibb.co.com/1dLdpqd/images.jpg' },
    { id: 'graduation', name: 'Graduation Theme', image: 'https://i.ibb.co.com/BfBTr8P/images.jpg' },
    { id: 'easter', name: 'Easter Theme', image: 'https://i.ibb.co.com/Js6p7Vm/images.jpg' },
    { id: 'halloween', name: 'Halloween Theme', image: 'https://i.ibb.co.com/CzL4CBf/download.jpg' },
    { id: 'thanksgiving', name: 'Thanksgiving Theme', image: 'https://i.ibb.co.com/Sm3RpSt/download.jpg' },
    { id: 'diwali', name: 'Diwali Theme', image: 'https://i.ibb.co.com/nLgmTL5/download.jpg' },
    { id: 'eid', name: 'Eid Theme', image: 'https://i.ibb.co.com/C19sNk4/images.jpg' },
    { id: 'minimalist', name: 'Minimalist Design', image: 'https://i.ibb.co.com/D5HyM3W/download.jpg' },
    { id: 'luxury', name: 'Luxury Gift Wrap', image: 'https://i.ibb.co.com/XJPvbq3/download.jpg' },
    { id: 'rustic', name: 'Rustic Style Wrap', image: 'https://i.ibb.co.com/znM9s9V/images.jpg' },
    { id: 'floral', name: 'Floral Theme', image: 'https://i.ibb.co.com/Br6zzcz/download.jpg' }
  ];
  

interface Props {
  onSelect: (option: string) => void;
}

const GiftWrapOptions: React.FC<Props> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 max-h-44 overflow-auto gap-4">
      {wrappingOptions.map((option) => (
        <div
          key={option.id}
          className={`border p-2 cursor-pointer ${
            selected === option.id ? 'border-blue-500' : 'border-gray-300'
          }`}
          onClick={() => handleSelect(option.id)}
        >
          <img src={option.image} alt={option.name} className="w-full h-32 object-cover" />
          <p className="text-center mt-2">{option.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GiftWrapOptions;
