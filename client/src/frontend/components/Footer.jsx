/* eslint-disable */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing(1)
  },
  footerLink: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color: 'grey',
    textDecoration: 'none',
  },
  footerIcon: {
    color: 'grey',
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  const content = {
    'copy': '© 2021 Find My Tutor. All rights reserved.',
    'link1': 'Team',
    'link2': 'About',
    'link3': 'Contact',
    ...props.content
  };

  return (
    <div>
      <br/>
      <footer>
        <Container maxWidth="lg">
          <Box py={6} textAlign="center">
            <Box component="nav" className={classes.footerNav}>
              <RouterLink to="/team" aria-label="team" className={classes.footerLink}>{content['link1']}</RouterLink>
              <RouterLink to="/about" aria-label="about" className={classes.footerLink}>{content['link2']}</RouterLink>
              <RouterLink to="/contact" aria-label="contact"
                          className={classes.footerLink}>{content['link3']}</RouterLink>
            </Box>
            <Box mb={3}>
              <IconButton component={Link} href="https://www.twitter.com" color="secondary" aria-label="Twitter"
                          className={classes.footerIcon}>
                <TwitterIcon/>
              </IconButton>
              <IconButton component={Link} href="https://www.facebook.com" color="secondary" aria-label="Facebook"
                          className={classes.footerIcon}>
                <FacebookIcon/>
              </IconButton>
              <IconButton component={Link} href="https://www.instagram.com" color="secondary" aria-label="Instagram"
                          className={classes.footerIcon}>
                <InstagramIcon/>
              </IconButton>
              <IconButton component={Link} href="https://www.linkedin.com" color="secondary" aria-label="LinkedIn"
                          className={classes.footerIcon}>
                <LinkedInIcon/>
              </IconButton>
            </Box>
            <Typography color="textSecondary" component="p" variant="body2" gutterBottom={false}
                        className={classes.copy}>{content['copy']}</Typography>
          </Box>
        </Container>
      </footer>
    </div>
  );
}
