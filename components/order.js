import React from 'react'
import moment from 'moment';

function Order({ order }) {

    return (
        <>
            <div className='flex bg-gray-100 p-3'>
                <div className='flex flex-grow space-x-2 items-center md:space-x-8 lg:space-x-10'>
                    <div className='flex flex-col'>
                        <h2 className='text-xs font-medium'>ORDER PLACED</h2>
                        <h3>{moment.unix(order.timestamp).format("DD MMM YYYY")}</h3>
                    </div>
                    <div>
                        <h2 className='text-xs font-medium'>TOTAL</h2>
                        <h3>${order.amount} - Delivery - ${order.amountShipping}</h3>
                    </div>
                </div>
                <div className='flex flex-col relative -top-3 items-end'>
                    <h4 className='text-clip line-clamp-1 text-xs'>ORDER #{order.id}</h4>
                    <h1 className='font-medium text-lg text-blue-500'>{order.items.length} Items</h1>
                </div>
            </div>
            <div className='p-5 sm:p-10'>
                <div className='bg-white space-x-5 overflow-x-auto'>
                    {
                        order.images.map((img, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={i} alt='' src={img} className="h-20 object-contain sm:h-32" />
                        ))
                    }
                </div>
            </div>
        </>

    )
}

export default Order