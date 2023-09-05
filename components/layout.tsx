import styles from './layout.module.css';
import SideBar from './sidebar';
import { Box } from '@mui/material';

export default function Layout({ children }) {
    return(
    <>
        <SideBar/>
        <main className={styles.layout}>{children}</main>
    </>
    );
  }