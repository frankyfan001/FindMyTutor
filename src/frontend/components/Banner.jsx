import Banners from 'react-banners';
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    maxHeight: '400px',
  },
}));

export const TutorBanner = () => (
  <div style={{ overflow: 'hidden' }} className={useStyles().root}>
    <Banners py={80} style={{ overflow: 'hidden' }}>
      <Banners.Blocks textWidth="40%">
        <Banners.Block imageAlign="right">
          <Banners.Title>Find My Tutor</Banners.Title>
          <Banners.SubTitle>
            A completely free platform for students
            to find realiable tutor
          </Banners.SubTitle>
          <Banners.Description my={30}>
            <Banners.Button color="rgb(128, 111, 193)">
              Login
            </Banners.Button>
            {/* <Banners.Button color="rgb(128, 111, 193)" ghost>
              Login as tutor
            </Banners.Button> */}
          </Banners.Description>
          <Banners.Image
            width="33.5%"
            src="//img.alicdn.com/tfs/TB1nchIg4jaK1RjSZKzXXXVwXXa-390-419.svg"
          />
        </Banners.Block>
      </Banners.Blocks>
      <Banners.Texture
        style={{
          width: '100%',
          height: '100%',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(2.5)',
          backgroundSize: 'cover',
          backgroundPosition: '50%',
          backgroundImage:
            'url(//img.alicdn.com/tfs/TB1gqwCgSzqK1RjSZFjXXblCFXa-1141-1259.svg)',
        }}
      />
    </Banners>
  </div>
);
