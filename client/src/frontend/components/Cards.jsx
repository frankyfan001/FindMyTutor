/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DoneIcon from '@material-ui/icons/Done';
import { Grid } from '@material-ui/core';
import TutorRating from './Ratings';

const useCardStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    maxHeight: '160px',
  },
  light: {
    maxHeight: '160px',
    background: 'linear-gradient(45deg, #f3e5f5 50%, #8e24aa 30%)',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    float: 'left',
    position: 'relative',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export const BaseCard = ({ user, description, idx }) => {
  const classes = useCardStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const userAvatar = user.name[0];

  return (
    <Card className={idx % 2 === 0 ? classes.light : classes.root}>
      <CardContent>
        <Grid container>
          <Grid item>
            <Grid container>
              <Grid item>
                <ProfileArea
                  profile={{ name: user.name, img: './static/abc.jpg' }}
                  course="CPSC 110"
                  school="UBC"
                />
              </Grid>

            </Grid>

          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </Grid>

        </Grid>

      </CardContent>
      {/* <CardActions disableSpacing>
        <TutorRating rating={3} />
      </CardActions> */}
    </Card>
  );
};

const useChipStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '20px',
    display: 'flex',
    padding: '10px',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export const CourseChip = ({ course }) => {
  const classes = useChipStyles();

  return (
    <Chip label={course} color="primary" deleteIcon={<DoneIcon />} />
  );
};

export const SchoolChip = ({ school }) => {
  const classes = useChipStyles();
  return (
    <Chip label={school} color="secondary" deleteIcon={<DoneIcon />} />
  );
};

const Chips = ({ course, school }) => (
  <Grid container spacing={3} direction="column">
    <Grid item>
      <SchoolChip school={school} />
    </Grid>
    <Grid item>
      <CourseChip course={course} />
    </Grid>
  </Grid>
);

const useProfileStyles = makeStyles((theme) => ({
  media: {
    // height: '0',
    paddingTop: '56.25%', // 16:9
    float: 'left',
    position: 'relative',
    maxWidth: '100px',
    maxHeight: '100px',
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const ProfileArea = ({ profile, course, school }) => {
  const classes = useProfileStyles();

  const { img, name } = profile;

  return (
    <div>
      <div className="profile-data">
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
          <Grid item xs="auto">
            <Grid item align="center">
              <Avatar aria-label="recipe" className={classes.avatar}>
                S
              </Avatar>
            </Grid>
            <Grid item align="center">
              <Typography paragraph>
                Super OLIGEI
              </Typography>
            </Grid>
            <Grid item align="center">
              <TutorRating rating={3} />
            </Grid>
          </Grid>
          <Grid item xs="auto" sm={3}>
            <Chips course={course} school={school} className={classes.left} />
          </Grid>
          <Grid item xs="auto" sm={6}>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
