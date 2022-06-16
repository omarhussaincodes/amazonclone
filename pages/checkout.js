import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Router, useRouter } from 'next/router';
import React from 'react'
import { useSelector } from 'react-redux';
import CheckoutProduct from '../components/CheckoutProduct';
import Header from '../components/Header';
import { selectedItems, selectTotal } from '../slices/cartSlice';

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
    const router = useRouter();
    const items = useSelector(selectedItems);
    const total = useSelector(selectTotal);
    const { data: session } = useSession();

    const createChekoutSession = async () => {
        const stripe = await stripePromise;
        // call the stripe backend to create checkout session
        const checkoutSessionResponse = await axios.post('/api/create-checkout-session', {
            items,
            email: session.user.email
        });

        // Redirect user/costumer to stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSessionResponse.data.id
        });

        if (result.error) alert(result.error.message);
        // else router.push(checkoutSessionResponse.data.url);

    };

    return (
        <div className='bg-gray-100'>
            <Header />

            <main className='lg:flex max-w-screen-2xl mx-auto'>
                {/* Left  side of checkout */}
                <div className='flex-grow m-5 shadow-sm'>

                    <Image alt='ikj' src='https://links.papareact.com/ikj' objectFit='contain'
                        width={1020} height={250}
                        objectPosition='center' />

                    <div className='flex flex-col bg-white mt-1'>
                        <h1 className='text-xl font-semibold px-1 border-b pb-2'>
                            {
                                items.length === 0 ?
                                    'Your Shopping Cart is empty' :
                                    'Shopping Cart'
                            }
                        </h1>
                        {
                            items?.map((item, i) => (
                                <CheckoutProduct
                                    key={i}
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    img={item.image}
                                    description={item.description}
                                    category={item.category}
                                    rating={item.rating}
                                />
                            ))
                        }
                    </div>
                </div>


                {/* Right side of checkout */}
                <div className='flex flex-col p-10 mt-3 bg-white shadow-sm'>
                    {
                        items.length > 0 &&
                        <p className='font-bold'>Subtotal ({items.length} items) : ${total}</p>
                    }
                    {
                        <button
                            role='link'
                            type='submit'
                            onClick={createChekoutSession}
                            className={`mt-2 mb-2 bg-yellow-400 text-center font-semibold px-2 py-2 bg-gradient-to-t from-yellow-200 to-yellow-400 rounded-sm border border-yellow-300
                        focus:outline-none focus:ring-2 focus:bg-yellow-500 active:from-yellow-500 active:border-none
                        ${!session && "from-gray-300 to-gray-500 text-gray-300 border-gray-200 cursor-not-allowed"}
                        `}>
                            {
                                !session ? 'SignIn to checkout' : 'Proceed to Checkout'
                            }
                        </button>
                    }
                </div>

            </main>
        </div>
    )
}

export default Checkout;