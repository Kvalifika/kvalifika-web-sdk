
<p align="left">
  <a href="http://kvalifika.com/" target="blank"><img src="https://landen.imgix.net/bdgkclkkfohb/assets/6crsydul.png?w=244" alt="Kvalifika logo" /></a>
</p>


## Kvalifika web SDK & web iFrame solution

Seamless customer on-boarding through facial authentication

To try out the end-user facing verification flow, simply navigate to [https://admin.kvalifika.com](https://admin.kvalifika.com) 
- After registrationyou can quickly generate one time instant verification link

Kvalifika web SDK, is a simple and customisable library which helps to integrate with Kvalifika solution. 
Use this to simply include Kvalifika flow. 

We Also provide a web iFrame solution for best integration into your web app.

#### Features 
Visit our complete feature list to better know what we have for your business
[Feature list](https://github.com/Kvalifika/kvalifika-web-sdk/blob/master/documentation/Features.md)

##### Installing dependencies and launch sample application

First navigate on example folder and launch commands below

- Install dependencies ``` yarn  install```
- Start project ``` yarn start ```


#### Getting started. How to start Iframe sample?

1. First you need to signup and get keys your APP_ID and SECRET_KEY from http://admin.kvalifika.com
APP_ID and SECRET_KEY  you can find Setting -> Security -> Credentials
2. Write your CORS domain into Security -> CORS. ( Domain where you want to host your production or staging versions)
3. Change index.html file change replace APP_ID and DOMAIN with your variables
4. For backend communication you need to change SECRET_KEY in index.js file
5. To test run ```yarn start``` command and visit http://localhost:8080 


![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `Take note for hosted version you need to SSL ( https://)` 

#### Files

-  ```example/public/index.html``` Kvalifika web iFrame loading simple example
-  ```example/public/advanced.html``` Kvalifika web iFrame loading advanced  example with several options
-  ```example/public/js/index.js``` Handling session during onboarding process.
-  ```example/index.js``` Backend implementation node.js sample to check session & close session for further calling


#### Kvalifika backend API 

- https://api.kvalifika.com/api/

#### Language support

Web iFrame supports now two languages you English, Georgian, Spanish and Russian
You can manage it with lang parameter: en, geo, ru, sp

```html 
https://main.app.kvalifika.com/?sessionId=<SESSION_ID>&lang=en
```
#### Handling & listening Kvalifika web iFrame


```javascript

// Performs a session check from your backend with your production SECRET_KEY
// See index.js file
const checkSession = async (sessionId) => {
  const data = await fetch(`/check-session/${sessionId}`)
  const body = await data.json()
  return JSON.parse(body)
}

// livenessStatus: 0/1/2. 0 = passed, 1 = undetermined, 2 = undetermined. 
// 3D FaceMap came from a session where there was a live human being if and only if the livenessStatus is 0.
// ..............................................
// faceMatched is boolean if true face matched document
// documentValid is boolean if true document is valid
const nextAction = ({ details: { faceMatched, livenessStatus, documentValid } }) => {

  // Handle your results & remove frame, or you can do anything here
  if (!livenessStatus && documentValid) {
    const frame = document.getElementById('kvalifikaiFrame')
    frame.remove()
    const p = document.createElement("p")
    p.innerHTML = "success"
    document.body.appendChild(p)
  }
}

// Event listener, listens each step in web flow. 
// If full process has been finished, you can check here 
// each step if finished liveness or document scanning
window.addEventListener('message', async event => {
  
  // Checks if full process liveness and document scanning has been finished
  if (event.data.finished) {
    // 
    const body = await checkSession(event.data.sessionId)
    nextAction(body)
  }
  
  // Checks if liveness step has been finished
  if (event.data.isLivenessFinished) {
  // Do something if liveness step has been finished
  }
  
  // Checks is document scanning step has been finsihed
  if (event.data.isDocumentFinished) {
    // event.data.documentType returns enum type 'ID' or 'PASSPORT'
  }

  // Case when link is no longer valid
  if (event.data.linkExpired) {
    // TODO.re generate session
  }
  
  // Checkes is session session has been closed
  if (event.data.isClose) {
       //TODO
  }
   
  // checks if retry step has been closed
  if (event.data.isRetryClosed) {
     // TODO 
  }	 

  // Case when customer attempts has been expired.
  if (event.data.expiredAttempts) {
    // TODO.re generate session
  } 

  // Case when customer has already passed liveness, and tries again. we wont allow session retry, if liveness is already passed
  if (event.data.isLivenessAlreadyPassed) {
    // TODO.re generate session
  }

})
```


### Contact us

Got any questions? Don't hesitate to reach out @ [kvalifika.com](https://kvalifika.com)
