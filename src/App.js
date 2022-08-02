import React, { useState } from 'react';
import axios from 'axios';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Grid, Pagination } from '@mui/material';

import Header from './components/Header/Header';
import List from './components/List/List';
import Quotes from './components/Quotes/Quotes';

const theme = createTheme({
    palette: {
        primary: {
            light: '#64d8cb',
            main: '#26a69a',
            dark: '#00766c',

            contrastText: '#fff',
        },
        secondary: {
            light: '#b085f5',
            main: '#7e57c2',
            dark: '#4d2c91',
            contrastText: '#000',
        },
    },
});

const App = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [quotes, setQuotes] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(6);

    const APIkey = process.env.REACT_APP_GOOGLEBOOKSAPI_KEY;

    // Fetches maximum 40 books from a search with Google Books API
    const searchBook = async (event) => {
        if (event.key === 'Enter') {
            setIsLoading(true);
            axios
                .get(
                    `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APIkey}&maxResults=40`
                )
                .then((results) => setBooks(results.data.items))
                .catch((error) => console.log(error));
        }
        setIsLoading(false);
    };

    // Get current posts
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    // Changes the page
    const pageChangeHandler = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header
                search={search}
                setSearch={setSearch}
                searchBook={searchBook}
            />
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{
                    width: '100%',
                    marginTop: '4rem',
                }}
            >
                <Grid item xs={8}>
                    <Quotes
                        quotes={quotes}
                        setQuotes={setQuotes}
                        books={books}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={3}
                columns={{ xs: 4, md: 12 }}
                justifyContent="center"
                flex-wrap="wrap"
            >
                <Grid item xs={6} md={10}>
                    <List currentBooks={currentBooks} isLoading={isLoading} />
                </Grid>
            </Grid>
            <Grid container justifyContent="center" marginBottom="2rem">
                {search ? (
                    <Pagination
                        color="secondary"
                        currentPage={currentPage}
                        count={Math.ceil(books.length / booksPerPage)}
                        onChange={pageChangeHandler}
                    />
                ) : (
                    ''
                )}
            </Grid>
        </ThemeProvider>
    );
};

export default App;
