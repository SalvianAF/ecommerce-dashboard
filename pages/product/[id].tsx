import Head from 'next/head';
import styles from '../../styles/product.module.css';
import Layout from '../../components/layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Image from 'next/image';

export async function getStaticPaths() {
    const paths = []
    const res = await fetch(`https://dummyjson.com/products`)
    const data = await res.json()

    // data.products.map((product) => { // not working because there's a limit
    //     paths.push({ params: { id: (product.id).toString() }})
    // })
    for (let i = 0; i < data.total; i++){
        paths.push({ params: { id: (i+1).toString() }})
    }
   

    return {
      paths,
      fallback: false,
    };
}

export async function getStaticProps({params}) {
    const res = await fetch(`https://dummyjson.com/products/${params.id}`)
    const productData = await res.json()
  
    return {
      props: {
        productData,
      },
    }
  }


export default function Product(productData) {
  const [product, setPeoduct] = useState(productData.productData)
//   const [page, setPage] = useState<number>(0)
//   const [pages, setPages] = useState<number>(Math.ceil(cartData.cartData.totalProducts/ 5))
//   const [products, setProducts] = useState(cartData.cartData.products)
//   const [productsView, setProductsView] = useState(cartData.cartData.products)//No need of pagination because total product is only 5
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Layout>
        {isLoading?
        <div className="container-loading">
            <CircularProgress color="secondary" />
        </div>
        :
        <>
        {console.log(product)}
            <Head>
                <title>Product Detail</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <div className={styles.container}>
                <div className={styles['container-head']}>
                    <h2 className="title">{product.title}</h2>
                </div>

                <Image
                    // loader={() => product.thumbnail}
                    src={product.thumbnail} // Route of the image file
                    height={300} // Desired size with correct aspect ratio
                    width={400} // Desired size with correct aspect ratio
                    alt="thumbnail"
                    className={styles.img}
                />
                
                <div className={styles['container-detail']}>
                    <p>{product.description}</p>
                    <h4>Brand : &nbsp;{product.brand}</h4>
                    <h4>Price : &nbsp;$&nbsp;{product.price}</h4>
                    <h4>Stock : &nbsp;{product.stock}</h4>
                    <h4>Rating : &nbsp;{product.rating}&nbsp;/&nbsp;5</h4>
                </div>
            </div>


            {/* <div className={styles["container-detail"]}>
                <div className={"row"}>
                  <h3 className={styles["title-detail"]}>Details</h3>
                </div>
                <div className={`row ${styles.around}`}>
                    <div>
                        User ID : {cart.userId}
                    </div>
                    <div>
                        Number of Items : {cart.totalProducts}
                    </div>
                </div>
                <div className={`row ${styles.around}`}>
                    <div>
                        Added On : {cart.userId}
                    </div>
                    <div>
                        Total Amount : $&nbsp; {cart.total}
                    </div>
                </div>
            </div> */}

          
        </>
        }
    </Layout>
  )
}
