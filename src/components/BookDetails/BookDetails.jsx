import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Button,
    Modal,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import ModalContent from '../ModalContent/ModalContent';

import classes from './BookDetails.module.css';

const BookDetails = ({ book }) => {
    console.log(book);

    const [open, setOpen] = useState(false);

    const openHandler = () => setOpen(true);
    const closeHandler = () => setOpen(false);

    const bookThumbnail = book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.smallThumbnail
        : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png';

    const bookTitle =
        book.volumeInfo.title.length > 45
            ? `${book.volumeInfo.title.substring(0, 45)}...`
            : book.volumeInfo.title;

    const bookDescription =
        book.volumeInfo.description?.length > 100
            ? `${book.volumeInfo.description.substring(0, 100)}...`
            : book.volumeInfo.description;

    return (
        <Card variant="outlined" className={classes.container}>
            <CardMedia
                style={{
                    height: 250,
                    width: 170,
                    padding: 10,
                }}
                component="img"
                image={bookThumbnail}
                title={book.volumeInfo.title}
            />
            <CardContent className={classes.description}>
                <Typography gutterBottom variant="p">
                    <strong>{bookTitle}</strong>
                    <br />
                    {book.volumeInfo.authors
                        ? `${book.volumeInfo.authors} `
                        : 'No author found'}
                </Typography>
                <Box>
                    <Rating
                        name="read-only"
                        value={Number(book.volumeInfo.averageRating)}
                        readOnly
                        size="small"
                    />
                </Box>
                <Typography
                    gutterBottom
                    variant="p"
                    className={classes.description}
                >
                    {bookDescription}
                </Typography>
                <Box>
                    <Button onClick={openHandler}>Read More</Button>
                </Box>
            </CardContent>
            <Modal
                open={open}
                onClose={closeHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalContent closeHandler={closeHandler} book={book} />
            </Modal>
        </Card>
    );
};

export default BookDetails;
