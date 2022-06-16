import React from 'react'
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

function Product({ id, title, price, description, category, image, rating }) {

    const dispatch = useDispatch();

    const addItemToCart = () => {
        const product = {
            id, title, price, description, category, image, rating
        };
        console.log(product);
        dispatch(addToCart(product));
    }

    return (
        <div className='flex flex-col items-center bg-white m-3 z-30 p-3 shadow-sm rounded-lg  hover:scale-105 transition transform duration-150 ease-in-out'>
            <p className='items-left text-xs text-gray-400 italic self-end'>
                {category}
            </p>
            <div className='cursor-pointer'>
                <Image className='p-4 m-4'
                    alt={id}
                    src={image}
                    width={200}
                    height={400}
                    objectFit='contain'
                    objectPosition='center'
                />
            </div>
            <div className='items-start'>
                <h4 className='text-md font-semibold my-2 line-clamp-1 items-start'>{title}</h4>
                <div className='flex items-start'>
                    {
                        Array(Math.floor(rating?.rate)).fill().map((_, i) => (
                            <StarIcon key={i} className='h-6 text-yellow-500' />
                        ))
                    }
                </div>
                <p className='text-clip my-1 line-clamp-2 items-start'>{description}</p>
                <h3 className='text-md font-semibold'>{'$' + price}</h3>
            </div>
            <button onClick={addItemToCart} type='submit'
                className='items-start my-2 bg-yellow-400 text-center font-semibold px-2 py-2 bg-gradient-to-t from-yellow-200 to-yellow-400 rounded-sm border border-yellow-300
             focus:outline-none focus:ring-2 focus:bg-yellow-500 active:from-yellow-500 active:border-none'>Add to Cart</button>
        </div>
    )
}

export default Product