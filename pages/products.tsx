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
    products:{
        title:string,
        brand:string,
        category:string,
        price:number,
        stock:number,
        id:number
    }[]

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

const filters = ["brand", "category", "price"]
const priceRange = ["1 ~ 100", "100 ~ 500", "500 ~ 1000", "1000 ~ 2000"]

export default function Products(productProps:ProductProps, chartDataProps:ChartDataProps) {
  const [products, setProducts] = useState(productProps.products)
  const [page, setPage] = useState<number>(0)
  const [pages, setPages] = useState<number>(0)
  const [search, setSearch] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [category, setCategory] = useState<string>("")
  const [brand, setBrand] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [chartData, setChartData] = useState(chartDataProps.data)
  const [allProducts, setAllProducts] = useState(productProps.products) //contain all the product
  const [filteredProducts, setFilteredProducts] = useState(productProps.products) //contain filtered product
  const [selectedFilter, setSelectedFilter] = useState("")

  useEffect(() => { //handle search and page changes
    if (selectedFilter){
        sliceProduct()
    }else{
        fetchProducts()
    }
    if (selectedFilter == ""){
        setPage(0)
    }
  },[page, search, selectedFilter])

  useEffect(() => { //handle render for the first time
    fetchCatagories()
    fetchAllProduct()
  },[])

  useEffect(() => {  //handle category changes
    fetchProductByCatagory()
  },[category])

  const fetchProducts = async() => {
    await axios.get(`https://dummyjson.com/products/search?q=${search}&limit=5&skip=${5*page}&select=title,brand,price,category,stock`).then((res) => {
      setProducts(res.data.products)
      setPages(Math.ceil(res.data.total / 5)) //total product pages
      setIsLoading(false)
    })
  } 

  const sliceProduct = () => {
    if (filteredProducts){
        setProducts(filteredProducts.slice(5*page,5*page+5))
    }
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
    let tempAllProduct = []
    const tempBrands = new Set(); 
    await axios.get('https://dummyjson.com/products?limit=100&skip=0&}&select=title,brand,price,category,stock').then((res) => {
        tempAllProduct = res.data.products
        setAllProducts(res.data.products)
    })
    tempAllProduct.map((prod) => {
        tempBrands.add(prod.brand) //collecting all brands in dataset
    })
    setBrands(Array.from(tempBrands) as string[])
    makeBarChartData(tempAllProduct)
  }

  const makeBarChartData = (rawData) => { //to make data for bar chart
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

  const filterAllProduct = (filter:string, data:string) => { //filter product by brand and price range
    // const tempProducts = [...allProducts]
    // console.log(data)
    if (data){
        if(filter == "brand"){
            const tempProducts = allProducts.filter((prod) => {
                // if (product.brand == data){
                //     return false
                // }
                return prod[filter] == data
            })
            // console.log(tempProducts)
            setProducts(tempProducts)
            setPages(Math.ceil(tempProducts.length / 5)) //total product pages
        }else if (filter == "price"){
            const [lowerLimit, upperLimit] = data.split(" ~ ")
            const tempProducts = allProducts.filter((prod) => {
                // if (product.brand == data){
                //     return false
                // }
                return prod.price > parseInt(lowerLimit) && prod.price < parseInt(upperLimit)
            })
            // console.log(tempProducts)
            setProducts(tempProducts.slice(0,5))
            setFilteredProducts(tempProducts)
            setPages(Math.ceil(tempProducts.length / 5)) //total product pages
            setPage(0)
        }

    }else{
        fetchProducts() //if category equals "" or None
    }
    
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
                <h2 className={styles.title}>Product List</h2>
                <div className={styles["container-head"]}>
                    <div>
                        
                        <TextField id="standard-basic" label="Search Product" variant="standard" sx={{width:150, m:1}} value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                // filterAllProduct('brand', "Apple")
                                setPage(0)
                                setCategory("")
                                setBrand("")
                                setPrice("")
                                setSelectedFilter("")
                            }}
                        />

                        <FormControl sx={{ m: 1, minWidth: 150, mr:4, mt:2}} size="small">
                            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
                            <Select defaultValue="" id="grouped-select" label="Filter" autoWidth value={selectedFilter}
                            onChange={(e) => {
                                setSelectedFilter(e.target.value)
                                setSearch("")
                            }}>
                                <MenuItem value="">
                                    None
                                </MenuItem>
                                {filters.map((filter,idx) => (
                                    <MenuItem value={filter} key={filter+idx}>{filter}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {selectedFilter == "category"?
                            <FormControl sx={{ m: 1, minWidth: 150, mr:4, mt:2}} size="small">
                                <InputLabel htmlFor="grouped-select">Category</InputLabel>
                                <Select defaultValue="" id="grouped-select" label="Category" autoWidth value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                    setSearch("")
                                }}>
                                    <MenuItem value="">
                                        None
                                    </MenuItem>
                                    {categories.map((category,idx) => (
                                        <MenuItem value={category} key={category+idx}>{category}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        :selectedFilter == "brand"?
                            <FormControl sx={{ m: 1, minWidth: 150, mr:4, mt:2}} size="small">
                                <InputLabel htmlFor="grouped-select">Brand</InputLabel>
                                <Select defaultValue="" id="grouped-select" label="Brand" autoWidth value={brand}
                                    onChange={(e) => {
                                        filterAllProduct("brand", e.target.value)
                                        setBrand(e.target.value)
                                        setSearch("")
                                    }}
                                >
                                    <MenuItem value="">
                                        None
                                    </MenuItem>
                                    {brands.map((brand,idx) => (
                                        <MenuItem value={brand} key={brand+idx}>{brand}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        :selectedFilter == "price"?
                            <FormControl sx={{ m: 1, minWidth: 150, mr:4, mt:2}} size="small">
                                <InputLabel htmlFor="grouped-select">Price</InputLabel>
                                <Select defaultValue="" id="grouped-select" label="Price" autoWidth value={price}
                                onChange={(e) => {
                                    filterAllProduct("price", e.target.value)
                                    setPrice(e.target.value)
                                    setSearch("")
                                }}>
                                    <MenuItem value="">
                                        None
                                    </MenuItem>
                                    {priceRange.map((price,idx) => (
                                        <MenuItem value={price} key={"price"+idx}>$ &nbsp;{price}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        :<></>
                        }

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
