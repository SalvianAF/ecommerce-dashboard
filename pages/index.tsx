import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';


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
  const [page, setPage] = useState<number>(0)
  const [pages, setPages] = useState<number>(0)
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    fetchproducts()
  },[page, search])

  const fetchproducts = async() => {
    await axios.get(`https://dummyjson.com/products/search?q=${search}&limit=5&skip=${5*page}`).then((res) => {
      setProducts(res.data.products)
      setPages(Math.ceil(res.data.total / 5) - 1) //total product pages
    })
  
  } 

  return (
    <Layout>
      {console.log(page)}
      <Head>
        <title>Dashboard Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles["container-head"]}>
        <h2 className={styles.title}>Products List</h2>
        <TextField id="standard-basic" label="Search Product" variant="standard" sx={{mb:4, width:150}}
         onChange={(e) => {
          setSearch(e.target.value)
          setPage(0)
        }}
        />
      </div>
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
      <Pagination count={pages}  page={page+1}
      onChange={(e,value) => setPage(value-1)} sx={{alignSelf:"end",mr:4, mt:2}}/>
    </Layout>
  )
}
