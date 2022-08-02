import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import classes from './Header.module.css';

const Header = ({ search, setSearch, searchBook }) => {
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    <a href="/#" onClick={() => window.location.reload(true)}>
                        Linn's <span>little</span> Library
                    </a>
                </Typography>
                <Box display="flex">
                    <div className={classes.search}>
                        <button
                            type="submit"
                            className={classes.searchIcon}
                            color="secondary"
                        >
                            <SearchIcon />
                        </button>
                        <InputBase
                            placeholder="Search..."
                            value={search}
                            className={classes.inputInput}
                            onChange={(event) => setSearch(event.target.value)}
                            onKeyPress={searchBook}
                        />
                    </div>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
