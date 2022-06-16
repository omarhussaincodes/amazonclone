import React from 'react'
import Header from '../components/Header';
import Order from '../components/order';
import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react"
import db from '../firebase';
import moment from 'moment';

function Orders(props) {
    const { data: session } = useSession();
    const orders = JSON.parse(props.orders);
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-2xl font-medium border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>

                {
                    session ?
                        (
                            <h2 className='font-medium'>{orders.length} Orders</h2>
                        ) :
                        (
                            <h2 className='font-semibold'>Please sign in to see your orders.</h2>
                        )
                }
                <div className='flex flex-col mt-4 space-y-4'>
                    {
                        orders?.map((order) => (
                            <Order key={order.id} order={order} />
                        ))
                    }
                </div>

            </main>
        </div>
    )
}

export default Orders;

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    // Get the users logged in credentials on server
    const session = await getSession(context);

    if (!session) return { props: {} };

    // firebase db v8
    const stripeOrders = await db.collection('users')
        .doc(session.user.email)
        .collection('orders')
        .orderBy("timestamp", "desc")
        .get();
    console.log('------------------');
    console.log(stripeOrders.forEach(d => d.data()));
    // const stripeOrders = await getDocs(collectionGroup(db, 'users'), where(doc(db, session.user.email), '==', session.user.email), collection('orders'), orderBy("timestamp", "desc"));
    // stripeOrders.forEach(doc => console.log(doc.data()));

    // stripe orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(
                    order.id,
                    { limit: 100 }
                )
            ).data
        }))
    );
    console.log("-----------------------------------")
    console.log(orders);


    return {
        props: {
            orders: JSON.stringify(orders),
            session
        }
    }
}