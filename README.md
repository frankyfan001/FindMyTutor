# Project Description

Find my Tutor is a free, peer-to-peer tutoring platform connecting tutors of all different domains with their respective students. Tutors are encouraged to post their specialties and contact information, making tutoring services more accessible for students of all backgrounds. Students can choose to contact tutors directly for tutoring services and rate their experiences with respective tutors, promoting transparency in the tutoring industry.

# Project Team - SuperAOLIGEI

Team members:
* b6t1b - Yi Xuan Qi
* e9j2b - Deyu Liu
* u3j1b - Kehong Liu
* p2k2b - Chengzhi Fan

<!-- # Project Task Requirements

Minimal Requirements:
* User login
* User register
* Viewing post list
* Viewing a specific post

Standard Requirements:
* Creating a new post
* Commenting on a post
* Posts management for a user
* Deleting a post owned by a user

Stretch Requirements:
* Filtering posts by specified criteria, such as course number.
* Providing a sharing system of study resources -->

## Features

### Minimal requirements

- [x] Tutor
  - [x] Can register and log in
  - [x] Can create a post to contact with students
  - [x] Can view a list of posts created by all the users
  - [x] Can view a specific post created by himself/herself or other user

- [x] Student
  - [x] Can register and log in
  - [x] Can create a post to contact with tutors
  - [x] Can view student's homepage
  - [x] Can view the posts created by other users and himself/herself
  - [x] Can view a specific post created by other users and himself/herself

### Standard requirements

- [x] Tutor
    - [x] Can add specific information to posts (time, location, date, salary, course, school...)
    - [x] Can delete a post as well as all of its comments
    - [x] Can see the other users' comments under the posts 

- [x] Student
  - [x] Can like posts (duplicate likes not allowed)
  - [x] Can view all favourite posts 
  - [x] Can create comments for posts (with like/dislike)
  - [x] Can delete post created by himself/herself and all comments 
 
### Stretch requirements

- [x] Tutor
  - [x] Can setup a online tutoring session and be able to contact students in a video meeting look like zoom
  - [x] Can upload, view and edit account information (avatar, username, password)
  - [x] Session persistance (refreshing the tab won't log the user out, only log out manually or close the browser will do so) 

- [x]  Student
  - [x] Can upload, view and edit account information (avatar, username, password)
  - [x] Can filter posts based on various categories (infos provided by tutors)
  - [x] Session persistance (refreshing the tab won't log the user out, only log out manually or close the browser will do so) 
  - [x] Can participate/setup online tutoring session to be able to contact tutors in a video meeting look like zoom

# Task Breakdown

* User login
    1. UI design
    2. Frontend implementation
    3. Backend implementation
    4. User table design for database

* Viewing post list
    1. UI design
    2. Frontend implementation
    3. Backend implementation
    4. Post table design for database

# Above and Beyond Features
* Fully Responsive: 

Find My Tutor is fully responsive and it will rescale to preserve the user experience and look across all devices.

* Uses external APIS:

Under each tutoring post on Find My Tutor, we provided a static map to show the tutor’s off-line tutoring address. This map is rendered using external google map API.

* Online Tutoring Service:

Find My Tutor provides an online tutoring service that allow users to make video calls. This feature is introduce to avoid firewall blocking for some app in some specific countries as well as provided an interface for student and tutor to communicate without needing to download any external software.  


# Prototypes

![Image of prototypes](Project%20Requirements/prototypes.png)


## Contributions

- Jerry Liu

> Jerry is the frontend developer of the team, mainly in charge of building frontend component structure, dataflow, and implementing styling, responsive and session persistance.

- Yi Xuan Qi

> Yi Xuan is full stack developer in the team. Mainly worked on the user account page, including UI design, features and APIs corresponding to the account pages.


## Tech Stack 
- Unit 1 – HTML, CSS, JS; UNIT 2 – React
> We used Javascript and React to develop our front end. Although we did not directly use HTML in the code base for our front end, JSX, which has very similar syntax to HTML is heavily used. We also used CSS grid to format and style our front end.
- Unit 3 – MongoDB
> We used a NoSQL database, MongoDB to store data about the users, posts, and comments in our application. MongoDB allows data to be stored as JSON objects, which are easier for communicating between the application and the database since the application (both front and back end) are written in JS. Mongoose framework is also used to connect back end to MongoDB.
- Unit 4 – Express
> The back end of our application is implemented using Express. The back end has several restful API endpoints to support CRUD operations, such as create/delete/update posts. The front end interacts with the back end by sending HTTP requests. We handle errors by returning an error JSON object.
- Unit 5 - Release Engineering
> We used Github Actions for our CI pipeline. On every push to the project milestone branch, it is automatically deployed to Heroku. Heroku is chosen as the deployment platform due to its simplicity and ease to connect with Github Actions through an simple yml file.
