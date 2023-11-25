# Startup
CS260 Startup Project Website

IDEA: Idea: A software that takes user input homework assignments with structured parameters like due date, difficulty level, time required, class, etc. The program then take those variables and stores them in a database. The software displays a timeline chart onto the screen showing when and for how long a student should focus on that homework assignment to successfully complete the assignment. Additionally, features like goals, and incentives could be added as well.

URL TO Draw Up: https://www.canva.com/design/DAFu24Bo5XQ/li59gvJK14vco5jJQZrZ4Q/edit?utm_content=DAFu24Bo5XQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

**WEBSOCKET ADDITION:
-I plan on implementing live server data on my website by using websockets. I will use websockets to display the current time on the dashboard of my site so that way a user
can look at the time while they are working on their homework. I will also use websockets to display messages from teachers on a seperate page of the website. This will allow teachers (in theory) to relay mass announcments to their students in case of last minute updates or changes to do dates. That way students dont have to jump to email, learning suite, or canvas to check those announcments.


Startup HTML Checklist:
- [x] All pages as indicated by writeup and demo graphic have been created in HTML
- [x] Links between pages are created and functional. Even a temp link to the google auth page to view content
- [x] Textual content such as titles, footers, nav bars and text have been added
- [x] 3rd party service call placeholders have been made on login page and calendar page
- [x] All images have been added for the tab icon and also a temp calendar image as a placeholder
- [x] Login created allong with placeholders for text boxes and a forgot password button
- [x] Database usage is located on the calender and add assignement page (database will store all homework tasks as added by "add assignment" page)
- [x] Websocket placeholder are assigned on "announcemnts" page and also the "dashboard" page for a small timestamp
- [x] All git commands are pushed and -m with details


CSS Properties for Startup:
- Font Title: Impact[sans-serif]
- Font Body:  Courier New, Courier, monospace


STARTUP CSS CHECKLIST:
- [x] Header, footer, and main content body
- [x] Navigation elements
- [x] Responsive to window resizing
- [x] Application elements
- [x] Application text content
- [x] Application images
- [x] Multiple Git commits with meaningful comments.


STARTUP JS CHECKLIST:
- [x] JavaScript support for future login.
    -login is set up to pull users from databse
- [x] JavaScript support for future database data.
    -multiple get functions in code to pull from database
- [x] JavaScript support for future WebSocket.
    -calendar and assignements set up for websocket use
- [x] JavaScript support for your application's interaction logic.
    -all pages have some sort of javascript interaction
- [x] Multiple Git commits with meaningful comments.
    -done

STARTUP SERVICE CHECKLIST:
- [x] Create an HTTP service using Node.js and Express
        -done, initialized with npm init -y and npm install express
        -moved files to public folder
- [x] Frontend served up using express static middleware
        -made index.js
        -done, app.use(express.static('public'));
- [x] Your frontend calls third party service endpoints
        -home page uses world clock api and now displays time on home page
        -done
- [x] Your backend provides service endpoints
        -made temporary const variables and returned them as json responses
        -done
- [x] Your frontend calls your service endpoints
        -login and home page each have functions that calls service
- [x] Multiple Git commits with meaningful comments.
        -done

STARTUP DATABASE CHECKLIST:
- [x] Create a MongoDB Atlas database
        -done
        -database name: startup
- [x] Provide backend endpoints for manipulating application data
        -done
        -endpoints are in index.js and created mongoDBService.js
- [x] Store application data in MongoDB
        -done
        -multiple functions to get / post in the database
- [x] Multiple Git commits with meaningful comments.

STARTUP AUTHENTICATION CHECKLIST:
- [x] Supports new user registration
        -done
        -register page is set up to add new users to database
- [x] Supports existing user authentication
        -done
        -login page is set up to check if user exists in database
- [x] Stores and retrieves credentials in MongoDB
        -done
        -database is set up to store user credentials
- [x] Restricts application functionality based upon authentication
        -done
        -if user is not logged in, they cannot access the calendar page
- [x] Multiple Git commits with meaningful comments.

Websocket Checklist:
- [x] Backend listens for WebSocket connection
- [x] Frontend makes WebSocket connection
- [x] Data sent over WebSocket connection
- [x] WebSocket data displayed in the application interface
- [x] Multiple Git commits with meaningful comments.