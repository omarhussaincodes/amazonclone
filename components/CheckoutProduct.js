import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

function CheckoutProduct({ id, title, price, img, category, rating, description }) {
    const dispatch = useDispatch();

    const addItemToCart = () => {
        const product = {
            id, title, price, img, category, rating, description
        };
        dispatch(addToCart(product));
    };
    const removeItemFromCart = () => {
        dispatch(removeFromCart({id}));
    };

    return (
        <div className='grid grid-cols-5 m-3'>
            <div className='col-span-1'>
                <Image alt={id} src={img} width={150} height={250} objectFit='contain' />
            </div>
            <div className='col-span-3 mx-4'>
                <h1 className='text-semibold text-lg'>
                    {title}
                </h1>
                <div className='flex'>
                    {
                        Array(Math.floor(rating?.rate)).fill().map((_, i) => (
                            <StarIcon key={i} className='h-6 text-yellow-500' />
                        ))
                    }
                </div>
                <p className='text-xs  mt-2 mb-2 text-clip line-clamp-3'>{description}</p>
                <h3 className='text-md font-semibold'>{'$' + price}</h3>
            </div>
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <div className=''>
                    <button type='submit' onClick={addItemToCart}
                        className='items-start w-full my-2 bg-yellow-400 text-center font-semibold px-2 py-2 bg-gradient-to-t from-yellow-200 to-yellow-400 rounded-sm border border-yellow-300
             focus:outline-none focus:ring-2 focus:bg-yellow-500 active:from-yellow-500 active:border-none'>Add to Cart</button>
                </div>
                <div className=''>
                    <button type='submit' onClick={removeItemFromCart}
                        className='items-start w-full my-2 bg-yellow-400 text-center font-semibold px-2 py-2 bg-gradient-to-t from-yellow-200 to-yellow-400 rounded-sm border border-yellow-300
             focus:outline-none focus:ring-2 focus:bg-yellow-500 active:from-yellow-500 active:border-none'>Remove from Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutProduct;