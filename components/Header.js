import React from 'react';
import Image from 'next/image'
import { SearchIcon, MenuIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import Banner from './Banner';
import ProductFeed from './ProductFeed';

function Header({ products }) {
    return (
        <>
            <header>
                <div className='flex flex-grow bg-amazon_blue py-2 items-center'>

                    <div className='mt-2 ml-1 flex items-center flex-grow sm:flex-grow-0 hover:rounded-sm'>
                        <Image
                            className='cursor-pointer'
                            alt=''
                            src='https://links.papareact.com/f90'
                            objectFit='contain'
                            width={150}
                            height={40}
                            objectPosition='left'
                        />
                    </div>

                    <div className='hidden sm:flex h-10  items-center cursor-pointer flex-grow rounded-md 
                bg-yellow-400 focus:outline-none focus-within:border-yellow-500 focus-within:border-2'>
                        <input className='px-4 h-full w-6 p-2 flex-grow outline-none rounded-l-md' type='text' />
                        <SearchIcon className='h-8 p-2' />
                    </div>

                    <div className='text-white text-xs flex items-center space-x-5 mx-3 whitespace-nowrap'>
                        <div className='link'>
                            <h2 className=''>Hello! Omar Beckham</h2>
                            <p className='font-bold'>Accounts and Lists</p>
                        </div>


                        <div className='link'>
                            <h2 className=''>Returns</h2>
                            <p className='font-bold'>& Orders</p>
                        </div>

                        <div className='relative flex items-center link'>
                            <span className='absolute h-4 w-4 top-0 left-8 bg-yellow-400 text-center rounded-full text-amazon_blue font-bold'>2</span>
                            <ShoppingCartIcon className='h-10' />
                            <h3 className='hidden md:inline-flex font-bold mt-1'>Cart</h3>
                        </div>
                    </div>

                </div>

                <div className='flex flex-grow items-center cursor-pointer text-sm bg-amazon_blue-light
             text-white space-x-5 px-1 py-1 whitespace-nowrap'>

                    <div className='flex items-center space-x-1'>
                        <MenuIcon className='h-5' />
                        <p className='link'>All</p>
                    </div>
                    <p className='link'>Prime Video</p>
                    <p className='link'>Amazon Buttons</p>
                    <p className='link'>Amazon Business</p>
                    <p className='link'>Today&apos;s Deals</p>
                    <p className='hidden lg:inline-flex link'>Electronics</p>
                    <p className='hidden lg:inline-flex link'>Food and Grocery</p>
                    <p className='hidden lg:inline-flex link'>Price</p>
                    <p className='hidden lg:inline-flex link'>Buy again</p>
                    <p className='hidden lg:inline-flex link'>Shopper Toolkit</p>
                </div>
            </header >

            <main className='max-w-screen-2xl mx-auto'>

                <Banner />

                <ProductFeed
                    products={products}
                />

            </main>
        </>
    )
}


export default Header;