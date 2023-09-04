import Head from 'next/head';
// import styles from '../styles/carts.module.css';
import Layout from '../components/layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';


// interface ProductProps {
//     products:[{
//         title:string,
//         brand:string,
//         category:string,
//         price:number,
//         stock:number,
//         id:number
//     },]

// }


export default function Carts() {
  const [carts, setCarts] = useState([])
  const [page, setPage] = useState<number>(0)
  const [pages, setPages] = useState<number>(0)
//   const [search, setSearch] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchCarts()
  },[page])

  const fetchCarts = async() => {
    await axios.get(`https://dummyjson.com/carts?skip=${5*page}&limit=5`).then((res) => {
        setCarts(res.data.carts)
        setPages(Math.ceil(res.data.total / 5)) //total product pages
        setIsLoading(false)
    })
  
  } 

  return (
    <Layout>
        {isLoading?
        <div className="container-loading">
            <CircularProgress color="secondary" />
        </div>
        :
        <>
        {console.log(carts)}
            <Head>
                <title>Dashboard Carts</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container-head">
                <h2 className="title">Cart List</h2>
            </div>

            <div className="table">
                <div className="row">
                <h5 className="label">Cart ID</h5>
                <h5 className="label">User ID</h5>
                <h5 className="label">Total Products</h5>
                <h5 className="label">Total Quantity</h5>
                <h5 className="label">Total Price</h5>
                </div>
                {carts.map((cart) => (
                    // <ListItem disablePadding>
                    <Link href={`/cart/${cart.id}`}>
                        <ListItemButton sx={{p:0}}>
                            <div className="col">
                                <div className="row">
                                    <p className="data">{cart.id}</p>
                                    <p className="data">{cart.userId}</p>
                                    <p className="data">{cart.totalProducts}</p>
                                    <p className="data">{cart.totalQuantity} </p>
                                    <p className="data">$&nbsp;{cart.total}</p>
                                </div>
                            </div>
                        </ListItemButton>
                    </Link>
                    // </ListItem>
                ))}
            </div>

            <Pagination count={pages} page={page+1} sx={{mt:2, alignSelf:'center'}} color='primary'
            onChange={(e,value) => {setPage(value-1)}}/>


        </>
        }
    </Layout>
  )
}
