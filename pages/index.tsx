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

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles["container-head"]}>
        <h1 className={styles.title}>Welcome to Dashboard !</h1>
        <p>To navigate please use sidebar</p>
      </div>
    </Layout>
  )
}
