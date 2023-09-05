import Head from 'next/head';
import styles from '../../styles/product.module.css';
import Layout from '../../components/layout';
import { useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';

export async function getStaticPaths() {
    const paths = []
    const res = await fetch(`https://dummyjson.com/products`)
    const data = await res.json()
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
                    <title>Product Detail</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                
                <div className={styles.container}>
                    <div className={styles['container-head']}>
                        <h2 className="title">{product.title}</h2>
                    </div>

                    <Image
                        loader={() => product.thumbnail}
                        src={product.thumbnail} // Route of the image file
                        height={300} 
                        width={400} 
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
            </>
        }
    </Layout>
  )
}
