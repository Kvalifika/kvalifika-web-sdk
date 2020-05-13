
<p align="left">
  <a href="http://kvalifika.com/" target="blank"><img src="https://landen.imgix.net/bdgkclkkfohb/assets/6crsydul.png?w=244" alt="Kvalifika logo" /></a>
</p>


## Kvalifika web SDK & web iFrame solution

Seamless customer on-boarding through facial authentication

To try out the end-user facing verification flow, simply navigate to [https://dev.demo.kyc.ge](https://dev.demo.kyc.ge) - this will start the verification flow in your browser.

Kvalifika web SDK, is a simple and customisable library which helps to integrate with Kvalifika solution. 
Use this to simply include Kvalifika flow. You don't need any backend on your side your own for this including JS SDK to your website.

We Also provide a web iFrame solution for best integration into your web app.

#### Features 
Visit our complete feature list to better know what we have for your business
[Feature list](https://github.com/Kvalifika/kvalifika-web-sdk/blob/master/documentation/Features.md)

#### Getting started

- Install dependencies ``` yarn  install```
- Start project ``` yarn start ```


#### Files

-  ```.env``` Credentials for development & testing purposes  see : SECRET_TOKEN, KYC_API_HOST
-  ```public/index.html``` Kvalifika web iFrame loading
-  ```public/js/index.js``` Handling session during onboarding process.
-  ```index.js``` Backend implementation node.js sample to check session & close session for further calling


#### Kvalifika backend API 

- https://apidev.kyc.ge/api

#### Language support

Web iFrame supports now two languages you English and Georgian.
You can manage it with parameters en & geo

```html 
<iframe id='kvalifikaiFrame' src="https://dev.demo.kyc.ge/en"  style="width: 100vw; height: 100vh" allow="camera" />
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
  if (faceMatched && !livenessStatus && documentValid) {
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

})
```


### Contact us

Got any questions? Don't hesitate to reach out @ [kvalifika.com](https://kvalifika.com)