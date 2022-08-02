import React, { useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

import classes from './Quotes.module.css';

const Quotes = ({ quotes, setQuotes, books }) => {
    useEffect(() => {
        const fetchQuotes = async () => {
            axios
                .get(
                    'https://my-book-app-356219-default-rtdb.europe-west1.firebasedatabase.app/quotes.json'
                )
                .then((response) => {
                    const data = response.data;
                    const loadedQuotes = [];

                    for (const key in data) {
                        loadedQuotes.push({
                            id: key,
                            author: data[key].author,
                            text: data[key].text,
                        });
                    }

                    const randomQuote =
                        loadedQuotes[
                            Math.floor(Math.random() * loadedQuotes.length)
                        ];
                    setQuotes(randomQuote);
                })
                .catch((error) => console.log(error));
        };

        fetchQuotes();
    }, [books]);

    return (
        <div className={classes.container}>
            <Typography variant="h5" mb="4rem" className={classes.quote}>
                "{quotes.text}"
            </Typography>
            <div className={classes.p}>- {quotes.author} </div>
        </div>
    );
};

export default Quotes;
