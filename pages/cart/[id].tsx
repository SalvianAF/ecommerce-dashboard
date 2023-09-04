import Head from 'next/head';
import styles from '../../styles/cart.module.css';
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

export async function getStaticPaths() {
    const paths = []
    const res = await fetch(`https://dummyjson.com/carts`)
    const totalCarts = await res.json()
    // console.log(totalCarts)
    for (let i = 0; i < totalCarts.total; i++){
        paths.push({ params: { id: (i+1).toString() }})
    }

    return {
      paths,
      fallback: false,
    };
}

export async function getStaticProps({params}) {
    const res = await fetch(`https://dummyjson.com/carts/${params.id}`)
    const cartData = await res.json()
  
    return {
      props: {
        cartData,
      },
    }
  }


export default function Cart(cartData) {
  const [cart, setCart] = useState(cartData.cartData)
//   const [page, setPage] = useState<number>(0)
//   const [pages, setPages] = useState<number>(Math.ceil(cartData.cartData.totalProducts/ 5))
//   const [products, setProducts] = useState(cartData.cartData.products)
  const [productsView, setProductsView] = useState(cartData.cartData.products)//No need of pagination because total product is only 5
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Layout>
        {isLoading?
        <div className="container-loading">
            <CircularProgress color="secondary" />
        </div>
        :
        <>
        {/* {console.log(cart)} */}
            <Head>
                <title>Cart Detail</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container-head">
                <h2 className="title">Cart {cart.id}</h2>
            </div>

            <div className={styles["container-detail"]}>
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
            </div>

            <div className="table">
                <div className="row">
                <h5 className="label larger">Product Name</h5>
                <h5 className="label">Price</h5>
                <h5 className="label">Quantity</h5>
                <h5 className="label">Total</h5>
                </div>
                {productsView.map((product) => (
                    // <ListItem disablePadding>
                    <Link href={`/product/${product.id}`}>
                        <ListItemButton sx={{p:0}}>
                            <div className="col">
                                <div className="row">
                                    <p className="data larger">{product.title}</p>
                                    <p className="data">$&nbsp;{product.price} </p>
                                    <p className="data">{product.quantity}</p>
                                    <p className="data">$&nbsp;{product.total} </p>
                                </div>
                            </div>
                        </ListItemButton>
                    </Link>
                    // </ListItem>
                ))}
            </div>

            {/* <Pagination count={pages} page={page+1} sx={{mt:2, alignSelf:'center'}} color='primary'
            onChange={(e,value) => {setPage(value-1)}}/> */}


        </>
        }
    </Layout>
  )
}
