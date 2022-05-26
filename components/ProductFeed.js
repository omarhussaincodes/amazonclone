import React from 'react';
import Product from './Product';
import Image from 'next/image';

function ProductFeed({ products }) {
    return (
        <div className='grid grid-flow-row-dense items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
        md:-mt-48 mx-auto bg-gray-100'>
            {
                products?.slice(0, 4).map((product) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        img={product.image}
                        price={product.price}
                        category={product.category}
                        rating={product.rating}
                    />
                ))
            }

            <div className='md:col-span-2'>
                {
                    products?.slice(4, 5).map((product) => (
                        <Product
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            description={product.description}
                            img={product.image}
                            price={product.price}
                            category={product.category}
                            rating={product.rating}
                        />
                    ))
                }
            </div>

            {
                products?.slice(5, products.length).map((product) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        img={product.image}
                        price={product.price}
                        category={product.category}
                        rating={product.rating}
                    />
                ))
            }
        </div>
    )
}

export default ProductFeed