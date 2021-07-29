
// Performs a session check from your backend with your production SECRET_KEY
// See index.js file
// match confidence, using zoom?
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
    const p = document.createElement("p")
    p.innerHTML = "success"
    document.body.appendChild(p)
  }
}

// Event listener, listens each step is web flow. 
// If full process has been finished, you can check here 
// each step if finished liveness or document scanning
window.addEventListener('message', async event => {

  console.log('Event', event.data)

  // Checks if full process liveness and document scanning has been finished
  if (event.data.finished) {
    console.log('Finished session')
  }
  
  // Checks if liveness step has been finished
  if (event.data.isLivenessFinished) {
    console.log('Finished Liveness')
  }
  
  // Checks is document scanning step has been finsihed
  if (event.data.isDocumentFinished) {
    console.log('Finished Document')
  }

})