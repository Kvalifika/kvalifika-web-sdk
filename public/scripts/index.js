
// სესსიის გადამოწმება, გაიარა თუ არა კონკრეტულ ბიჯზე (სტეფზე) ვალიდაცია
const checkSession = async (sessionId) => {
  const data = await fetch(`/check-session/${sessionId}`)
  const body = await data.json()
  return JSON.parse(body)
}

// Liveness Status is 0 if its success and fail if it is 1
// property: faceMatched is boolean if true face matched document
// property: documentValid is boolean if true document is valid
// ამოწმებს თუ წარმატებით მოხდა გავლა ამისამართებს შემდეგ ბიჯზე (სტეპზე)
const nextAction = ({ details: { faceMatched, livenessStatus, documentValid } }) => {
  if (faceMatched && !livenessStatus && documentValid) {
    const frame = document.getElementById('myFrame')
    frame.remove()

    const p = document.createElement("p")
    p.innerHTML = "success"
    document.body.appendChild(p)
  }
}

// თითოეულ ბიჯზე, ლაივნესი, პირადობის სკანირებაზე თუ პასპოსრტვის სკანირებაზე შემოდის
window.addEventListener('message', async event => {
  console.log("TCL: event", event.data)
  if (event.data.finished) {
    // აქ მოდის სერვერიდან მოსული სესიის შესახებ სრული ინფორმაცია
    const body = await checkSession(event.data.sessionId)
    nextAction(body)
  }
  if (event.data.isLivenessFinished) {
    // do something about liveness
  } else {
    // ...
  }
  if (event.data.isDocumentFinished) {
    // event.data.documentType returns enum type 'ID' or 'PASSPORT'
  } else {
    //...
  }

})