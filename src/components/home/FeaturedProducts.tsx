import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import FeatureProductCard from './FeatureProductCard';
import { Gift } from '../../types/Types';


const FeaturedProducts: React.FC = () => {
    const axiosPublic = useAxiosPublic()
    const user = true;

    const { data: getAllGift = [], refetch } = useQuery<Gift[]>({
        queryKey: ["getAllGift"],
        enabled: user,
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/server/getAllGift`);
            return data?.data;
        },
    });

    console.log(getAllGift)
    return (
        <div className='section-to-section-margin  container mx-auto'>
            <div>
                <h3 className='text-primary text-center  font-light my-3 font-great-vibes text-3xl'>Top Collections</h3>
                <h1 className='font-medium text-3xl text-center uppercase text-[#333333]'>Featured Products</h1>

                {/* Gift card */}

                <div className='mt-12  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-6 p-2 '>
                    {
                        getAllGift?.map((gift, index) => {
                            return <FeatureProductCard key={index} gift={gift} />
                        })
                    }
                </div>

            </div>
        </div>
    );
};

export default FeaturedProducts;
