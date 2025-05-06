const screen = document.getElementById("screen");

let personality = {
  openness: 0,
  conscientiousness: 0,
  extraversion: 0,
  agreeableness: 0,
  neuroticism: 0
};

function showStartScreen() {
  screen.innerHTML = `
    <p>Welcome, traveler! Your personality will shape your quest.</p>
    <button onclick="rollDice()">Roll the Dice to Begin</button>
  `;
}

function rollDice() {
  const roll = Math.ceil(Math.random() * 6);
  screen.innerHTML = `
    <p>You rolled a ${roll}!</p>
    <button onclick="startScenario(${roll})">Continue</button>
  `;
}

function startScenario(roll) {
  // Sample scenario based on dice roll
  screen.innerHTML = `
    <p>You find a mysterious scroll in a forest. Do you...</p>
    <button onclick="chooseOption('openness', 1)">Open it (Openness +1)</button>
    <button onclick="chooseOption('conscientiousness', 1)">Save it for later (Conscientiousness +1)</button>
  `;
}

function chooseOption(trait, value) {
  personality[trait] += value;
  screen.innerHTML = `
    <p>You chose wisely. ${trait.charAt(0).toUpperCase() + trait.slice(1)} is now ${personality[trait]}.</p>
    <button onclick="nextScenario()">Next</button>
  `;
}

function nextScenario() {
  // You can add more dynamic scenarios here
  screen.innerHTML = `
    <p>More quests await... but this is just a demo!</p>
    <p>Your personality so far:</p>
    <pre>${JSON.stringify(personality, null, 2)}</pre>
    <button onclick="showStartScreen()">Restart</button>
  `;
}

showStartScreen();
