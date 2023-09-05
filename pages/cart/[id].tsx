import Head from 'next/head';
import styles from '../../styles/cart.module.css';
import Layout from '../../components/layout';
import { useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';

export async function getStaticPaths() {
    const paths = []
    const res = await fetch(`https://dummyjson.com/carts`)
    const totalCarts = await res.json()
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

                {productsView? 
                    <div className="table">
                        <div className="row">
                        <h5 className="label larger">Product Name</h5>
                        <h5 className="label">Price</h5>
                        <h5 className="label">Quantity</h5>
                        <h5 className="label">Total</h5>
                        </div>
                        {productsView.map((product) => (
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
                        ))}
                    </div>
                :
                    <></>
                }
            </>
        }
    </Layout>
  )
}
