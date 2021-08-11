# Find My Tutor

![Logo of Find My Tutor](./client/public/logo192.png)

## https://find-my-tutor-ubc.herokuapp.com

- [Description](#description)
- [Goals](#goals)
- [Tech Stack](#tech-stack)
- [Above and Beyond Features](#above-and-beyond-features)
- [Next Steps](#next-steps)
- [Contributions](#contributions)

## Description

- Find my Tutor is a free, peer-to-peer tutoring platform connecting tutors of all different domains with their respective students.
  Tutors are encouraged to post their specialties and contact information, making tutoring services more accessible for students of all backgrounds.
  Students can choose to contact tutors directly for tutoring services and rate their experiences with respective tutors, promoting transparency in the tutoring industry.

## Goals

- ### Minimal Requirements
  
    - [x] Tutors
        - [x] Can register and log in as a tutor
        - [x] Can create a tutor post of tutoring service
        - [x] Can view a list of posts created by all tutors
        - [x] Can view a specific post with details and comments
    - [x] Students
        - [x] Can register and log in as a student
        - [x] Can create a student comment on a tutor post
        - [x] Can view a list of posts created by all tutors
        - [x] Can view a specific post with details and comments
        - [x] Can save a post to their favorite collection

- ### Standard Requirements
  
    - [x] Tutors in account page
        - [x] Can view and edit their own personal information
        - [x] Can view all posts they have created previously
        - [x] Can delete a post created by themselves
    - [x] Students in account page
        - [x] Can view and edit their own personal information
        - [x] Can view all posts saved to their favorite collection

- ### Stretch Requirements
  
    - [x] Tutors and students
        - [x] have session persistence so that refreshing the webpage does not log users out
        - [x] Can filter posts by various categories in the home page
        - [x] Can view a static Google map to show the offline tutoring location in a post page
        - [x] Can establish an online tutoring service that allow users to have an 1-on-1 video meeting

## Tech Stack

- ### Unit 1 - HTML / CSS / JS & Unit 2 – React

  The frontend of our application is implemented based on React because it facilitates the overall process of writing components and ensures faster rendering.
  To be specific, the usage of component's states helps our app to manage UI data and rendering.
  Since React uses downward data flow, small changes taking place in the child structures won't affect their parents thus only particular components will be updated.
  This structure of data binding ensures code stability and boosts our app performance.
  We use Javascript and Material-UI (React UI framework) to develop React modular components.
  Although we did not directly use HTML in the code base, JSX which has very similar syntax to HTML was heavily used.
  Also, we used Material-UI customized styling to format the appearance of React components because it resembles CSS syntax and allows associating styling code to respective components neatly.

- ### Unit 3 – NodeJS / Express

  The backend of our application is implemented based on NodeJS and Express web framework because it is easy to configure/customize and allows us to define routes of our app based on HTTP methods and URLs.
  We used Restful API endpoints to performs CRUD operations by receiving HTTP requests from the frontend and sending back the responses.
  For error handling during requests, our backend respond with an error flag and meaningful error messages.

- ### Unit 4 – MongoDB

  We used MongoDB, a NoSQL database, to store document collections of accounts, posts and comments in our web application.
  Compared to traditional relational databases, MongoDB is more flexible and the document format closely resembles Javascript objects.
  This is easier for communicating among our full stack since both frontend and backend are written in Javascript.
  Mongoose framework is also used to efficiently connect our backend to MongoDB, and it allows us to make schemas for our document collections with several attributes and restrictions.

- ### Unit 5 - Release Engineering / Heroku

  We used GitHub Actions for our CI pipeline.
  On every push to the project milestone branch, the pushed code will be released into production and be automatically deployed to Heroku.
  Heroku is chosen as our deployment platform due to its simplicity and ease to connect with GitHub Actions through a yml file.
  Also, Heroku provides us an insight into user behaviours through its handy tools measuring metrics such as response times and volumes.
  
## Above and Beyond Features

- ### Fully Accessible
  Find My Tutor is fully accessible, and it supports screen readers to help users who are visually challenged.

- ### Fully Responsive

  Find My Tutor is fully responsive, and it has responsive web design cross-browser compatibility.
  The app will rescale to preserve the user experience across all devices.
  It is especially optimized for desktop view and mobile view respectively.
  
- ### External APIs

  Under contact-us page on Find My Tutor, we provided an email service that serves users to contact our team directly for prompt responses.
  This email service is using external EmailJS API.
  Under each tutor post page, we provided a static map to show the tutor’s offline tutoring location.
  This map is rendered using external Google map API.

- ### Online Tutoring Service

  Find My Tutor provides an online tutoring service that allow users to make video calls.
  This feature is introduced to avoid firewall blocking for some video chat apps in specific countries.
  It provides an interface for tutors and students to have an 1-on-1 video meeting, without downloading any external software.
  
## Next Steps

- ### Testing of Frontend and Backend

  Due to time constrain, we are unable to systematically test frontend and backend.
  In the future, our team will implement two test suites that generate mock data for frontend and backend respectively so that their developments can progress independently of each other.
  The testing should be fully automated and run on every push.

- ### Third-party Login

  It would be convenient for users if the application supports third-party login.
  In the future, we may consider implementing this feature to allow users log in our web application through Google or Facebook.

- ### Resources Sharing

  It would be helpful for users to access a sharing system of study resources.
  In the future, we may consider implementing this feature that allows users to share study resources by uploading and downloading digital documents on Find My Tutor.
  
## Contributions

- ### Deyu (Jerry) Liu
  > Deyu is the frontend developer in the team.
  > He was mainly in charge of building frontend component structure, dataflow, and implementing styling, responsive and session persistence.

- ### Yi Xuan (CQ) Qi
  > Yi Xuan is the full stack developer in the team.
  > She mainly worked on the user account page, including UI design, features and RESTful APIs corresponding to the account page.

- ### Kehong (Kevin) Liu
  > Kehong is the full stack developer in the team.
  > He mainly worked on setting up Google map display for the post page, designing the database schema, setting up deployment and CI pipeline, and developing the online tutoring functionality.

- ### Chengzhi (Franky) Fan
  > Chengzhi is the full stack developer and the project manager in the team.
  > He set up the scaffolding for the project including the frontend UI design, the backend RESTful API, and the database schemas.
  > He clearly set the requirements for the team and decided technologies used in the application.
  > He contributed both frontend and backend development and participated in solving project challenges.
