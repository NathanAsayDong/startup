#NATES CS 260 NOTES

Git Commands:
- add stages
- commit holds and prepares to upload
- push uploads to online repo
- fetch checks for differences online
- pull copys those changes to local repo
- also dont forget to add two spaces after a line to make a new line

AWS Account:
- ssh -i /Users/nathandong/Desktop/Personal/Classes/CS260/NateKey.pem ubuntu@52.203.235.255
- Elastic IP Address: 52.203.235.255
- http://52.203.235.255

Caddy:
- listens for http requests
- creation and rotation of all web certificates
- serves all html, css, and js files
- acts as a gateway

Https / TLS / Web Certificates:
- https is http with encryption
- TLS is the encryption protocol
- web certificates are used to verify the identity of the server
- caddy uses "lets encrypt" to create and rotate web certificates (thats the web cert issuer)

//submit link: https://simon.homework-minder.com/
//add simon-html to cs260 repo not startup repo


deploy code:
./deployReact.sh -k /Users/nathandong/Desktop/Personal/Classes/CS260/NateKey.pem -h homework-minder.com -s startup


Midterm Notes:
Console Commands:
- chmod : change file mode bits
- pwd : show working directory
- cd : change directoyr
- ls : list items
- vim : text editor
- nano : the text editor i use ;)
- mkdir : make directory
- mv : move file or rename
- rm : remove file
- man : display manual
- ps : display information about running processes
- wget : download files from web
- sudo : execute command with superuser privileges
- ssh : secure shell for remote login

DNS:
- domain name system
- domain is human readable, ip is computer readable
- root (top), followed by top level domains and then second level domains
- www = sub, example = second, .com = top (www.example.com)

DOM:
- tree structure where each node corresponds to an object
- root of the tree is the "document" object
- HTML elements are represented as element nodes in the DOM
- provides methods to interact and modify seperate nodes dynamically (ie. getElementID, querySelector)
- provides events
- cross browser compatibility
- asynch functions
- traversal selection (parent node, child node, query selector)

HTML:
- anchor tags are use to create hyperlinks, allowing the user to navigate from one page to another (href="URL")
- <!DOCTYPE html> is the document type declaration

CSS:
- "#" is id, ".<name>" is class
- padding : space between content and border
- margin : space between border and neighboring contents
- box model :inside out , content -> padding -> border -> margin

Javascript:
- Arrow Function:
const add = (a, b) => a + b;
- Array Map:
const doubled = array.map(num => num * 2);
- Event Listener:
document.getElementById('elementID').addEventListener('click', function() {...});
- DOM Selection:
document.querySelector('#selector');
- Object Declaration:
const obj = { key: 'value' };
- For Loop:
Iterate and log: for (let i = 0; i < array.length; i++) { console.log(array[i]); }
- If Statement:
if (condition) { // code } else { // code }
- Changing Text Color:
document.getElementById('byu').style.color = 'green';

Other:
- ssh example : ssh username@hostmanem (ssh then the ip address or domain) --> ssh john@example.com (opens user john at domain example.com), you can also specify port by -p then port, additionaly you may need a key which is -i then path to key then domain and name
- HTTPS does require a web certificate
- A DNS record cannot directly point to another DNS record, it maps to a domain and ipv4 address
- port 443 --> https, port 80 --> http, port 22 --> ssh
- JSON : javascript object notation
- adding js to file : use inline "<script> lines of code </script" or external "<script src = blank></script>"

Final Notes:
- What ports are used for HTTP, HTTPS, SSH? --> 80, 443, 22
- What do HTTP status codes in the 300, 400, 500 range indicate? --> 300 = redirection, 400 = client error, 500 = server error
- What is the difference between HTTP and HTTPS? --> HTTPS is HTTP with encryption
- What is the difference between a domain name and an IP address? --> domain name is human readable, ip address is computer readable
- What is the difference between a DNS record and a DNS name server? --> DNS record maps to a domain and ipv4 address, DNS name server is a server that stores DNS records
- What does the HTTP header content-type allows you to do? --> specify the type of data being sent
- What do the following attributes of a cookie do?
    - Domain --> specifies which hosts are allowed to receive the cookie
    - Path --> specifies a URL path that must exist in the requested URL in order to send the cookie header
    - SameSite --> specifies if the cookie is sent with cross-site requests
    - HTTPOnly --> specifies if the cookie is accessible to client-side scripts
- Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /foo/bar? --> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
- Express Service Code --> app.get('/api/notes', (req, res) => { res.json(notes); });
- Given the following MongoDB query { cost: { $gt: 10 }, name: /fran.*/} select all of the matching documents. --> { cost: { $gt: 10 }, name: /fran.*/ }
- How should you store user passwords in a database --> hashed
- What is the WebSocket protocol used for? --> full-duplex communication channels over a single TCP connection
- What is the difference between a WebSocket and a REST API? --> REST API is a one way communication, WebSocket is a two way communication
- What is JSX and how are the curly braces rendered? --> JSX is a syntax extension to javascript, curly braces are rendered as javascript
- mongo db query outline:
    - db.collection.find({ query }, { projection })
    - db.collection.insertOne({ document })
    - gt = greater than, gte = greater than or equal to, lt = less than, lte = less than or equal to, ne = not equal to, eq = equal to


// React
- React is a javascript library for building user interfaces
What are React Hooks used for?
- Hooks are functions that let you "hook into" React state and lifecycle features from function components
- Hooks don't work inside classes
- Hooks let you always use functions instead of having to constantly switch between functions, classes, higher-order components, and render props
- Hooks let you reuse stateful logic without changing your component hierarchy
What role does npm play in web development?
- npm is a package manager for the JavaScript programming language
- npm is the default package manager for the JavaScript runtime environment Node.js
What does package.json do in a npm project?
- package.json is a file that gives the necessary information to npm which allows it to identify the project as well as handle the project's dependencies
What does the fetch function do?
- fetch() allows you to make network requests similar to XMLHttpRequest (XHR)
- The main difference is that the Fetch API uses Promises, which enables a simpler and cleaner API, avoiding callback hell and having to remember the complex API of XMLHttpRequest
What does node.js do?
- Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser
What does Vite do?
- Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects
- It consists of two major parts:
    - A dev server that serves your source files over native ES modules, with rich built-in features and astonishingly fast Hot Module Replacement (HMR)
    - A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production

// status codes
2xx:
- 200 OK
- 201 Created
- 204 No Content
3xx:
- 301 Moved Permanently
- 302 Found
- 304 Not Modified
4xx:
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowed
- 409 Conflict
- 410 Gone
5xx:
- 500 Internal Server Error
- 501 Not Implemented
- 503 Service Unavailable
- 504 Gateway Timeout

## Headers

HTTP headers specify metadata about a request or response. This includes things like how to handle security, caching, data formats, and cookies. Some common headers that you will use include the following.

| Header                      | Example                              | Meaning                                                                                                                                                                        |
| --------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization               | Bearer bGciOiJIUzI1NiIsI             | A token that authorized the user making the request.                                                                                                                           |
| Accept                      | image/\*                             | The format the client accepts. This may include wildcards.                                                                                                            |
| Content-Type                | text/html; charset=utf-8             | The format of the content being sent. These are described using standard [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) types. |
| Cookie                      | SessionID=39s8cgj34; csrftoken=9dck2 | Key value pairs that are generated by the server and stored on the client.                                                                                                     |
| Host                        | info.cern.ch                         | The domain name of the server. This is required in all requests.                                                                                                               |
| Origin                      | cs260.click                          | Identifies the origin that caused the request. A host may only allow requests from specific origins.                                                                           |
| Access-Control-Allow-Origin | https://cs260.click                  | Server response of what origins can make a request. This may include a wildcard.                                                                                               |
| Content-Length              | 368                                  | The number of bytes contained in the response.                                                                                                                                 |
| Cache-Control               | public, max-age=604800               | Tells the client how it can cache the response.                                                                                                                                |
| User-Agent                  | Mozilla/5.0 (Macintosh)              | The client application making the request.                                                                                                                                     |
Cookies:
    - Cookies are key-value pairs that are generated by the server and stored on the client
    - basically state managment to help the server remember the client and previous data

Express:
    - Express is a web application framework for Node.js
    - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
    -

MongoDB:
- MongoDB is a document-oriented NoSQL database used for high volume data storage
- MongoDB is a NoSQL database, so it doesn't use the typical rows and columns that you would see in a relational database like MySQL
- Instead, it stores data in documents (which are organized into collections) and uses a flexible structure that can be quickly processed

DOM:
- The Document Object Model (DOM) is a programming interface for HTML and XML documents
- It represents the page so that programs can change the document structure, style, and content
- The DOM represents the document as nodes and objects

DAO:
- Data Access Object (DAO) is an object that provides an abstract interface to some type of database or other persistence mechanism

React:
-Hooks are functions that let you "hook into" React state and lifecycle features from function components
-Browser Router is a router implementation that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL

Websocket:
-TCP Connection : A TCP connection is a connection between two TCP sockets
-protocol : a set of rules that defines how two entities are to communicate with each other
-WebSocket : WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection
-WebSocket is distinct from HTTP
-WebSocket is designed to be implemented in web browsers and web servers, but it can be used by any client or server application
-WebSocket is supported in most browsers including Chrome, Firefox, Internet Explorer, Safari, and Opera
-Websocket uses the same port as HTTP and HTTPS, port 80 and 443


