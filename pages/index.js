import Head from 'next/head'
import Header from '../components/Header'
import axios from 'axios';

export default function Home({ products }) {
  console.log(products)
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon | Beckham</title>
      </Head>

      <main>
        <Header
          products={products}
        />
      </main>

      <footer>
      </footer>
    </div>
  )
}


export async function getServerSideProps() {
  const products =
    await axios.get('https://fakestoreapi.com/products')
      .catch(e => {
        console.log('Oops! something went wrong!', e);
      })

  return {
    props: {
      products: products.data
    }
  }
}
