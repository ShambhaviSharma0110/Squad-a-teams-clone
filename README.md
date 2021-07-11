Welcome to the Squad-a-teams-clone wiki!

# Squad is a teams clone built using Reactjs.

To run the code:
cd client
npm start
(for frontend)
node server.js
(for backend)
for the server.js file to run make sure you open the redis server or you'll get an error.

## Packages utilized:

* React-router-dom-- for routing
* node-sass--stylesheet preprocessor
* moment-- for date formatting
* Axios--promise-based HTTP client
* fontawesome-- for icons
* socket-io-client-- for realtime communication
* simple-peer-- one-to-one video/audio calling
* shortid-- unique id generator
* roughjs-- canvas for whiteboard
* react-flow-renderer -- node based graph
* fullcalendar-- calendar scheduling

## Flow of events:
* The user lands at the homepage consisting of a welcome test and a list of features below which are the buttons to each of the described features,
* > The first button is the new meeting button, clicking which one can start a meeting, copy and share the link given in the meeting info tab. Joining that link one can join the meeting host is on.
> *  Once both the users are on the same link the following features can be performed by clicking the icons present on the footer:
> *  Muting the call
> *  Screen sharing a chrome tab
> *  End call
> *  Users can chat in case of disturbances using the chat icon on the top right corner of the screen next to the clock
> * End call to use more features or screen share to use the same features while on call.
* > Whiteboard is a canvas-like feature to gather your thoughts. Can be accessed using the whiteboard button next to the new meeting.
> * Use lines and rectangles to draw 
> * Undo in case of a mistake
> * Redo a mistaken undo
> * Select lines and rectangles to move accordingly
* > The calendar button will lead you to a calendar to help you schedule meetings on certain dates or to mark events and plan in advance to keep track.
> * Exclude weekends to focus on workdays
> * Dive in the past, you go to a date in the past, by default set to January 2011.
> * Click today to go to the present day and navigate months by clicking the next and previous buttons next to the today button.
> * Click on any day to input the event and schedule your month.
* > Mind-map button to plan whatever you want, for example, features of an app
> * Input feature in the input field, add a feature by clicking on the button.
> * Click on the + or the - buttons to adjust screen size and move the feature bubble by clicking and dragging it to place it around the central mind node.
> * Lock screen to not move feature bubbles here and there
> * Head back home button on each page will bring you back to the home page.

Homepage
![image](https://user-images.githubusercontent.com/60618802/125196983-8417bb00-e279-11eb-890e-0cdcc20b7aaf.png)

Calling page:
![image](https://user-images.githubusercontent.com/60618802/125197410-18365200-e27b-11eb-85db-79ebbd72b204.png)

Whiteboard:
![image](https://user-images.githubusercontent.com/60618802/125197419-208e8d00-e27b-11eb-8408-6f1c26d2c1f7.png)

Calendar:
![image](https://user-images.githubusercontent.com/60618802/125197372-fc32b080-e27a-11eb-976c-507284f68f01.png)

Mind-map:
![image](https://user-images.githubusercontent.com/60618802/125197444-4caa0e00-e27b-11eb-9633-ef0bc7909476.png)


