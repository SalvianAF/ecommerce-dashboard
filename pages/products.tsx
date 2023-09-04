import Head from 'next/head';
import styles from '../styles/products.module.css';
import Layout from '../components/layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';


interface ProductProps {
    products:[{
        title:string,
        brand:string,
        category:string,
        price:number,
        stock:number,
        id:number
    },]

}


export default function Products(productProps:ProductProps) {
  const [products, setProducts] = useState(productProps.products)
  const [page, setPage] = useState<number>(0)
  const [pages, setPages] = useState<number>(0)
  const [search, setSearch] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchProducts()
  },[page, search])

  const fetchProducts = async() => {
    await axios.get(`https://dummyjson.com/products/search?q=${search}&limit=5&skip=${5*page}&select=title,brand,price,category,stock`).then((res) => {
      setProducts(res.data.products)
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
        {console.log(products)}
            <Head>
                <title>Dashboard Products</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles["container-head"]}>
                <h2 className="title">Product List</h2>
                <TextField id="standard-basic" label="Search Product" variant="standard" sx={{mb:4, width:150}}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(0)
                }}
                />
            </div>

            <div className="table">
                <div className="row">
                <h5 className="label larger">Name</h5>
                <h5 className="label">Brand</h5>
                <h5 className="label">Price</h5>
                <h5 className="label">Stock</h5>
                <h5 className="label">Category</h5>
                </div>
                {products.map((product) => (
                    <Link href={`/product/${product.id}`}>
                        <ListItemButton sx={{p:0}}>
                            <div className="col">
                                <div className="row">
                                    <p className="data larger">{product.title}</p>
                                    <p className="data">{product.brand}</p>
                                    <p className="data">$&nbsp;{product.price} </p>
                                    <p className="data">{product.stock}</p>
                                    <p className="data">{product.category} </p>
                                </div>
                            </div>
                         </ListItemButton>
                    </Link>
                ))}
            </div>
            
            <Pagination count={pages} page={page+1} sx={{mt:2, alignSelf:'end', marginRight:6}} color='primary'
            onChange={(e,value) => {setPage(value-1)}}/>

        </>
        }
    </Layout>
  )
}
