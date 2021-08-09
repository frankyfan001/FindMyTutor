/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  media: {
    height: '256px'
  },
}));

export default function AboutPage(props) {
  const classes = useStyles();

  const content = {
    'header': 'About Us',
    'description': 'Find My Tutor is on its best approach to change the way you get tutoring.',
    '01_image': 'https://www.k-state.edu/aac/images/tutoring/Tutoring.png',
    '01_company': 'Become A Tutor',
    '01_description': 'Professional, dedicated and local.',
    '02_image': 'https://www.atlasnetwork.org/assets/uploads/news-main/_detail/Students_liberty.png',
    '02_company': 'Become A Student',
    '02_description': 'Enjoy the best tutoring experiences.',
    ...props.content
  };

  return (
    <section>
      <Box pt={8} pb={10}>
        <Container maxWidth="sm">
          <Box textAlign="center" mb={5}>
            <Typography variant="h4" component="h2" gutterBottom={true}>{content['header']}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{content['description']}</Typography>
          </Box>
        </Container>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardActionArea component={RouterLink} to="/register?type=tutor">
                    <CardMedia className={classes.media} image={content['01_image']} />
                    <CardHeader title={content['01_company']} subheader={content['01_description']} titleTypographyProps={{gutterBottom: true}}/>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardActionArea component={RouterLink} to="/register?type=student">
                    <CardMedia className={classes.media} image={content['02_image']} />
                    <CardHeader title={content['02_company']} subheader={content['02_description']} titleTypographyProps={{gutterBottom: true}} />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </section>
  );
}
