import { Nanny,html } from 'https://cdn.skypack.dev/nanny-state'

const View = state => html`
<div class="main">
<h1>Guess the Number</h1>
${state.started ?
 html`${state.numbers.map((element,index) => element === "winner" ? 
              html`<button class="winningButton" onclick=${state.start}>${index+1}</button>` : element ?           
              html`<button class="validButton" onclick=${state.guess(index)}>${index+1}</button>`:
              html`<button class="invalidButton">${index+1}</button>`)}
      <p>${state.feedback}</p>
      ${state.numbers.includes('winner') ? html`<button onclick=${state.start}>PLAY AGAIN</button>` : html`<div></div>`}`
:
 html`<button onclick=${state.start}>START</button>`
}</div>`

const start = event => Update({
  selectedNum: -1,
  clicks: 0,
  numbers: Array(10).fill(true),
  started: true,
  randomNum: generateNumber(),
  feedback: "Guess a number from 1 to 10"
})

const generateNumber = () => (Math.ceil(Math.random()*10)).toString()

const guess = index => event => {
  Update(state => {
    console.log("The random number is " + state.randomNum + " and you clicked " + (index + 1))
    return {
      clicks: state.clicks + 1,
      selectedNum: index + 1,
      feedback: index + 1 < state.randomNum ? "Your guess is too low" : 
                index + 1 > state.randomNum ? "Your guess is too high" : 
                "You got it in " + (state.clicks + 1) + " guesses!",
      numbers: state.numbers.map((elem, i) => 
                index + 1 < state.randomNum ? (i <= index ? false : elem) : 
                index + 1 > state.randomNum ? (i >= index ? false : elem) : 
                (i === index ? "winner" : false)  )               
    }
  })
}


const State = {
  clicks: 0,
  numbers: Array(10).fill(true),
  selectedNum: -1,
  started: false,
  start, guess,
  View
}

const Update = Nanny(State)