import React from 'react';
import { Grid, LinearProgress, Box } from '@mui/material';

import BookDetails from '../BookDetails/BookDetails';
import classes from './List.module.css';

const List = ({ currentBooks, isLoading }) => {
    return (
        <div className={classes.container}>
            {isLoading ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color="secondary" />
                </Box>
            ) : (
                <Grid
                    container
                    spacing={2}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    {currentBooks?.map((book, i) => (
                        <Grid item key={i}>
                            {<BookDetails book={book} />}
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default List;
