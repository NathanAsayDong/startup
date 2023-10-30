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
./deployFiles.sh -k /Users/nathandong/Desktop/Personal/Classes/CS260/NateKey.pem -h homework-minder.com -s simon


Midterm Notes:
Console Commands:
-

DNS:
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
- # is id, .<name> is class
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








    


