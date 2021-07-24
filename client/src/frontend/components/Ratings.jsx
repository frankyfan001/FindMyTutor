import React from 'react';
import Rating from '@material-ui/lab/Rating';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

export default function TutorRating({ rating }) {
  return (
    // <Box component="fieldset" mb={3} borderColor="transparent">
    //   {/* <Typography component="legend">Average Rating</Typography> */}
    //   <Rating name="read-only" value={rating} readOnly />
    // </Box>
    <Rating name="read-only" value={rating} readOnly />
  );
}
