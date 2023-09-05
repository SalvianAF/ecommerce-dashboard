import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Menu from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import Link from 'next/link';


const drawerWidth = 240;


interface Props {
    window?: () => Window;
  }

export default function SideBar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;
    
    return(<>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color='primary'>
                <Toolbar sx={{display:"flex", flexDirection:"row"}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Link href="/">
                        <Box sx={{ display: 'flex' , flexDirection:'row'}}>
                            <Typography variant="h5" noWrap component="div" fontWeight={700}>
                                Dashboard
                            </Typography>
                            <Typography variant="h5" noWrap component="div" fontWeight={700} color='secondary'>
                                !
                            </Typography>
                        </Box>
                    </Link>
                </Toolbar>
            </AppBar>
            <Drawer
            container={container} //mobile
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            <div>
                    <List sx={{paddingTop:10}}>
                        <Link href="/products">
                            <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ShoppingBagIcon color='primary'/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Products"} />
                                    </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link href="/carts">
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ShoppingCartIcon color='primary'/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Carts"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        {/* ))} */}
                    </List>
                </div>
            </Drawer>
            <Drawer
                variant="permanent" //web
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', paddingTop:2},
                }}
            >
                <Toolbar />
                <div>
                    <List>
                        <Link href="/products">
                            <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ShoppingBagIcon color='primary'/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Products"} />
                                    </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link href="/carts">
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ShoppingCartIcon color='primary'/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Carts"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
        </Box>
        </>
    )
}