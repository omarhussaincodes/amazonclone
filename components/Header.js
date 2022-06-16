import React from 'react';
import Image from 'next/image'
import { SearchIcon, MenuIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectedItems } from '../slices/cartSlice';

function Header() {

    const { data: session } = useSession();
    const router = useRouter();
    const items = useSelector(selectedItems);

    const handleChekout = (e) => {
        e.preventDefault();
        router.push("/checkout", undefined, { shallow: true })
    }

    return (
        <>
            <header>
                <div className='flex flex-grow bg-amazon_blue py-2 items-center'>

                    <div className='mt-2 ml-1 flex items-center flex-grow sm:flex-grow-0 hover:rounded-sm'>
                        <Image onClick={() => router.push('/')}
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
                        <div className='link' onClick={!session ? signIn : signOut}>
                            <p className='hover:underline'>
                                {
                                    session ?
                                        `Hello! ${session.user.name}` :
                                        'SignIn!'
                                }
                            </p>
                            <p className='font-bold'>Accounts and Lists</p>
                        </div>

                        <div className='link' onClick={() => session && router.push('/orders')}>
                            <h2 className=''>Returns</h2>
                            <p className='font-bold'>& Orders</p>
                        </div>

                        <div onClick={handleChekout}
                            className='relative flex items-center link'>
                            <span className='absolute h-4 w-4 top-0 left-8 bg-yellow-400 text-center rounded-full
                             text-amazon_blue font-bold'>{items?.length || 0}</span>
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
        </>
    )
}


export default Header;