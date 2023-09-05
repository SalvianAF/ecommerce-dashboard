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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
  import BarChart from '../components/barChart';

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

interface ChartDataProps {
    data:{
        labels:string[],
        datasets:{
            label:string,
            data:number[],
            backgroundColor:string,
        }[],
    }
}

export default function Products(productProps:ProductProps, chartDataProps:ChartDataProps) {
  const [products, setProducts] = useState(productProps.products)
  const [page, setPage] = useState<number>(0)
  const [pages, setPages] = useState<number>(0)
  const [search, setSearch] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<string[]>([])
  const [category, setCategory] = useState<string>("")
  const [allProduct, setAllProduct] = useState<any>([])
  const [labels, setLabels] = useState<string[]>([])
  const [chartData, setChartData] = useState(chartDataProps.data)

  useEffect(() => {
    fetchProducts()
  },[page, search])

  useEffect(() => {
    fetchCatagories()
    fetchAllProduct()
  },[])

  useEffect(() => {
    fetchProductByCatagory()
  },[category])

  const fetchProducts = async() => {
    await axios.get(`https://dummyjson.com/products/search?q=${search}&limit=5&skip=${5*page}&select=title,brand,price,category,stock`).then((res) => {
      setProducts(res.data.products)
      setPages(Math.ceil(res.data.total / 5)) //total product pages
      setIsLoading(false)
    })
  } 

  const fetchCatagories = async() => {
    await axios.get(`https://dummyjson.com/products/categories`).then((res) => {
        setCategories(res.data)
    })
  }

  const fetchProductByCatagory = async() => {
    if (category){
        await axios.get(`https://dummyjson.com/products/category/${category}`).then((res) => {
            setProducts(res.data.products)
            setPages(Math.ceil(res.data.total / 5)) //total product pages
        })
    }else{
        fetchProducts() //if category equals "" or None
    }
  }

  const fetchAllProduct = async() => {
    let tempAllProduct = {}
    await axios.get('https://dummyjson.com/products?limit=100&skip=0&}&select=title,brand,price,category,stock').then((res) => {
        tempAllProduct = res.data.products
    })
    makeBarChartData(tempAllProduct)
  }

  const makeBarChartData = (rawData) => {
    const tempLabel:string[] = []
    const tempStock:number[] = []
    rawData.map((data) => {
        tempLabel.push(data.title)
        tempStock.push(data.stock)
    })
    const data = {
        labels : tempLabel,
        datasets: [
            {
                label: 'Stock',
                data: tempStock,
                backgroundColor: '#6913D8',
            }
        ],
    }
    setChartData(data)
  }

  return (
    <Layout>
        {isLoading?
            <div className="container-loading">
                <CircularProgress color="secondary" />
            </div>
        :
            <>
                <Head>
                    <title>Dashboard Products</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className={styles["container-head"]}>
                    <h2 className={styles.title}>Product List</h2>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 150, mr:4, mt:2}} size="small">
                            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
                            <Select defaultValue="" id="grouped-select" label="Filter" autoWidth value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}>
                                <MenuItem value="">
                                    None
                                </MenuItem>
                                {categories.map((category,idx) => (
                                    <MenuItem value={category} key={category+idx}>{category}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField id="standard-basic" label="Search Product" variant="standard" sx={{width:150, m:1}}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(0)
                        }}
                        />
                    </div>
                </div>

                <div className="table">
                    <div className="row">
                        <h5 className="label larger">Name</h5>
                        <h5 className="label">Brand</h5>
                        <h5 className="label">Price</h5>
                        <h5 className="label">Stock</h5>
                        <h5 className="label larger">Category</h5>
                    </div>
                    {products.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id}>
                            <ListItemButton sx={{p:0}}>
                                <div className="col">
                                    <div className="row">
                                        <p className="data larger">{product.title}</p>
                                        <p className="data">{product.brand}</p>
                                        <p className="data">$&nbsp;{product.price} </p>
                                        <p className="data">{product.stock}</p>
                                        <p className="data larger">{product.category} </p>
                                    </div>
                                </div>
                            </ListItemButton>
                        </Link>
                    ))}
                </div>
                
                <Pagination count={pages} page={page+1} sx={{mt:2, alignSelf:'center'}} color='primary'
                onChange={(e,value) => {setPage(value-1)}}/>

                <BarChart data={chartData}/>
            </>
        }
    </Layout>
  )
}
