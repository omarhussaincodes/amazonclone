import Head from 'next/head'
import Header from '../components/Header'
import axios from 'axios';
import ProductFeed from '../components/ProductFeed';
import Banner from '../components/Banner';
import { getSession } from "next-auth/react"

export default function Home({ products }) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon | Beckham</title>
      </Head>

      <main className='max-w-screen-2xl mx-auto'>
        <Header
          products={products}
        />

        <Banner />

        <ProductFeed
          products={products}
        />
      </main>

      <footer>
      </footer>
    </div>
  )
}


export async function getServerSideProps(context) {

  const session = await getSession(context);
  const products =
    await axios.get('https://fakestoreapi.com/products')
      .catch(e => {
        console.log('Oops! something went wrong!', e);
      });

  return {
    props: {
      products: products.data,
      session
    }
  }
}
