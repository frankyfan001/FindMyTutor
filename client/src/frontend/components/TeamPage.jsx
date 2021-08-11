/* eslint-disable */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  textAlignment: {
    textAlign: 'left',
  },
  quote: {
    textAlign: 'right',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(3)
  },
}));

export default function Team(props) {
  const classes = useStyles();

  const content = {
    'header': 'Our Team',
    'description': '"None of us, including me, ever do great things. But we can all do small things, with great love, and together we can do something wonderful."',
    'quote': ' – Mother Teresa',
    '01_image': '/teamAvatars/cq.jpg',
    '01_name': 'Yi Xuan (CQ) Qi',
    '01_job': 'Junior Developer',
    '02_image': '/teamAvatars/jerry.jpg',
    '02_name': 'Deyu (Jerry) Liu',
    '02_job': 'Junior Developer',
    '03_image': '/teamAvatars/kevin.jpg',
    '03_name': 'Kehong (Kevin) Liu',
    '03_job': 'Junior Developer',
    '04_image': '/teamAvatars/franky.jpg',
    '04_name': 'Chengzhi (Franky) Fan',
    '04_job': 'Junior Developer',
    ...props.content
  };

  return (
    <section className={classes.textAlignment}>
      <Container maxWidth="lg">
        <Box py={8}>
          <Grid container spacing={8}>
            <Grid item xs={12} lg={4}>
              <Box maxWidth={768}>
                <Typography variant="h4" component="h2" gutterBottom={true}
                            className={classes.header}>{content['header']}</Typography>
                <br/>
                <Typography variant="subtitle1" color="textSecondary">{content['description']}</Typography>
                <br/>
                <Typography variant="subtitle1" color="textSecondary"
                            className={classes.quote}>{content['quote']}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <Box display="flex">
                    <Avatar alt="" src={content['01_image']} className={classes.avatar}/>
                    <Box>
                      <Typography variant="h6" component="h4">{content['01_name']}</Typography>
                      <Typography variant="h6" color="textSecondary" component="span">{content['01_job']}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box display="flex">
                    <Avatar alt="" src={content['02_image']} className={classes.avatar}/>
                    <Box>
                      <Typography variant="h6" component="h4">{content['02_name']}</Typography>
                      <Typography variant="h6" color="textSecondary" component="span">{content['02_job']}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box display="flex">
                    <Avatar alt="" src={content['03_image']} className={classes.avatar}/>
                    <Box>
                      <Typography variant="h6" component="h4">{content['03_name']}</Typography>
                      <Typography variant="h6" color="textSecondary" component="span">{content['03_job']}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box display="flex">
                    <Avatar alt="" src={content['04_image']} className={classes.avatar}/>
                    <Box>
                      <Typography variant="h6" component="h4">{content['04_name']}</Typography>
                      <Typography variant="h6" color="textSecondary" component="span">{content['04_job']}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}
