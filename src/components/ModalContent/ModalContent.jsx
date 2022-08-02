import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import Rating from '@mui/material/Rating';

import classes from './ModalContent.module.css';

const ModalContent = ({ book, closeHandler }) => {
    return (
        <Box className={classes.container}>
            <Box className={classes['main-info']}>
                <img src={book.volumeInfo.imageLinks.smallThumbnail} />
                <Box className={classes['text-info']}>
                    <Typography variant="h5">
                        {book.volumeInfo.title}
                    </Typography>
                    <Rating
                        name="read-only"
                        value={Number(book.volumeInfo.averageRating)}
                        readOnly
                        size="small"
                    />
                    <Typography variant="p">
                        {book.volumeInfo.authors
                            ? `${book.volumeInfo.authors} `
                            : 'No author found'}
                    </Typography>
                    <Typography variant="p">
                        Published: {book.volumeInfo.publishedDate}
                    </Typography>
                    <Box>
                        {book?.volumeInfo?.categories?.map((category) => (
                            <Chip
                                key={category}
                                size="small"
                                label={category}
                                variant="outlined"
                                className={classes.chip}
                            />
                        ))}
                    </Box>
                    {book.saleInfo.saleability === 'NOT_FOR_SALE' ? (
                        ''
                    ) : (
                        <Box>
                            <Typography variant="p">
                                Price: {book.saleInfo.listPrice?.amount}KR
                            </Typography>
                            <Button
                                onClick={() =>
                                    window.open(book.saleInfo.buyLink, '_blank')
                                }
                            >
                                Buy
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box className={classes.description}>
                <Typography variant="p">
                    <strong>Description</strong>: <br />
                    {book.volumeInfo.description
                        ? book.volumeInfo.description
                        : 'No description found.'}
                </Typography>
            </Box>
            <Box direction="row" align="center">
                <Button
                    onClick={() =>
                        window.open(book.volumeInfo.infoLink, '_blank')
                    }
                    className={classes.button}
                >
                    More
                </Button>
                <Button onClick={closeHandler} className={classes.button}>
                    Close
                </Button>
            </Box>
        </Box>
    );
};

export default ModalContent;
