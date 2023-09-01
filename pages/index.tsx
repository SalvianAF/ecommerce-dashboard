import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import axios from 'axios';
import { useState, useEffect } from 'react';


// export async function getStaticProps() {
//   const res:any = await axios.get('https://dummyjson.com/products')
//   const data = JSON.parse(JSON.stringify(res));
//   // const stringRes = res.json()
//   // console.log(stringRes)
//     return {
//         props: {
//             data: {data},
//         }
//     };
// }

export default function Home() {
  const [products, setProducts] = useState<any>([])

  useEffect(() => {
    fetchproducts()
  },[])

  const fetchproducts = async() => {
    await axios.get('https://dummyjson.com/products').then((res) => {
      setProducts(res.data.products)
    })
  } 

  return (
    <Layout>
      {console.log(products)}
      <Head>
        <title>Dashboard Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className={styles.title}>Products List</h2>
      <div className={styles.table}>
        <div className={styles.row}>
          <h5 className={`${styles.label} ${styles.larger}`}>Name</h5>
          <h5 className={styles.label}>Brand</h5>
          <h5 className={styles.label}>Price</h5>
          <h5 className={styles.label}>Stock</h5>
          <h5 className={styles.label}>Category</h5>
        </div>
        {products.map((product) => (
            <div className={styles.col}>
              <div className={styles.row}>
                <p className={`${styles.data} ${styles.larger}`}>{product.title}</p>
                <p className={styles.data}>{product.brand}</p>
                <p className={styles.data}>$&nbsp;{product.price} </p>
                <p className={styles.data}>{product.stock}</p>
                <p className={styles.data}>{product.category} </p>
              </div>
           </div>
        ))}
      </div>
    </Layout>
  )
}
