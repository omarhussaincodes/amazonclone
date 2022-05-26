import React from 'react'
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';

function Product({ id, title, price, description, category, img, rating }) {
    return (
        <div className='relative flex flex-col items-left bg-white m-3 z-30 p-4 shadow-sm'>
            <p className='text-xs text-gray-400 italic self-end'>
                {category}
            </p>
            <Image alt='' src={img} width={200} height={400} objectFit='contain' objectPosition='left' />
            <h4 className='text-md font-semibold my-2 line-clamp-2'>{title}</h4>
            <div className='flex'>
                {
                    Array(Math.floor(rating?.rate)).fill().map((_, i) => (
                        <StarIcon key={i} className='h-6 text-yellow-500' />
                    ))
                }
            </div>
            <p className='text-clip my-1 line-clamp-2'>{description}</p>
            <h3 className='text-md font-semibold'>{'$' + price}</h3>
            <button className='my-2 bg-yellow-400 text-center font-semibold px-2 py-2 bg-gradient-to-t from-yellow-200 to-yellow-400 rounded-sm border border-yellow-300
             focus:outline-none focus:ring-2 focus:bg-yellow-500 active:from-yellow-500 active:border-none'>Add to Cart</button>
        </div>
    )
}

export default Product