document.querySelector('#submit').addEventListener('click', getInput)

function getInput(){
  const questions = ['q1', 'q2', 'q3', 'q4', 'q5']
  const userAnswers = questions.map(function(question){
    // ['', 'a', ]
    const picked = document.querySelector('input[name = "' + question + '"]:checked') // on top of finding an input with a name attribute of the question (q something), additionally, it needs to be checked. The :checked is a psuedoClass that 
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:checked
    return picked ? picked.value : '' // if something isn't checked for a question, then puts an empty string in array useranswers

  })
  if(userAnswers.includes('')){
    document.querySelector('#result').innerText = 'Protect your NECK'
    return
  } // if there is an empty string, then stops getInput() from continuing to run

  let query = questions.map(function(question,index){ // let que
    return question + '=' + userAnswers[index] // q1=a, q2=a these go into an array
  })
  // query = ['q1=a', 'q2=a']
  .join('&') // the array gets joined q1=a&q2
  // query = ['q1=a&q2=a']

  fetch('/api?' + query) // take our query value and concatenate to /api? /api?q1=a&q5=a
  .then(response => response.json())
  .then(data =>
    document.querySelector('#nameFromBackend').innerText = data.finalWutangNameFromBackend
  )
}

// question[3]=document.querySelectorAll('input[name="q4"]:checked')

