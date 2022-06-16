import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../components/Header';

function Success() {
    const router = useRouter();

    return (
        <div className='bg-gray-100 h-screen'>
            <Header />

            <main className='max-w-screen-lg mx-auto'>
                <div className='flex  flex-col p-10 bg-white'>
                    <div className='flex items-center space-x-2 mb-2'>
                        <CheckCircleIcon className='h-8 text-green-500' />
                        <h1 className='text-xl font-semibold mx-1'>Thank You, your order has been confirmed!</h1>
                    </div>
                    <p className='text-md mx-1 font-semibold'>
                        Thank you for shoppping with us. We will send confirmation once order has been received.
                        If you would like to check status of your order, please press the link below.
                    </p>
                    <button
                        onClick={() => router.push('/orders')}
                        className='items-start w-full my-2 bg-yellow-400 text-center font-semibold px-2 py-2 bg-gradient-to-t from-yellow-200 to-yellow-400 rounded-sm border border-yellow-300
             focus:outline-none focus:ring-2 focus:bg-yellow-500 active:from-yellow-500 active:border-none'
                    >
                        Go to my orders
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Success;