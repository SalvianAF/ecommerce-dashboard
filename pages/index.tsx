import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';

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
