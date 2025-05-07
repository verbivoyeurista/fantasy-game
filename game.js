// Fantasy Personality Game (JavaScript Version) - Dashboard with Personality + Interaction Tools
const screen = document.getElementById("screen");

let personality = {
  openness: 0,
  conscientiousness: 0,
  extraversion: 0,
  agreeableness: 0,
  neuroticism: 0
};

let allCharacters = [];

function showDashboard() {
  screen.innerHTML = `
    <h2>Traveler's Dashboard</h2>
    <button onclick="startGame()">Start Your Quest</button>
    <button onclick="viewPersonality()">View Your Personality</button>
    <button onclick="calculateInteractions()">Interaction Compatibility</button>
  `;
}

function startGame() {
  showStartScreen();
}

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
  let scenarioHTML = '';

  switch (roll) {
    case 1:
      scenarioHTML = `
        <p>You find a mysterious scroll in a forest. Do you...</p>
        <button onclick="chooseOption('openness', 1)">Open it (Openness +1)</button>
        <button onclick="chooseOption('conscientiousness', 1)">Save it for later (Conscientiousness +1)</button>
      `;
      break;
    case 2:
      scenarioHTML = `
        <p>You’re offered a leadership role in a chaotic town. Do you...</p>
        <button onclick="chooseOption('extraversion', 1)">Rally the townsfolk (Extraversion +1)</button>
        <button onclick="chooseOption('agreeableness', 1)">Seek peaceful negotiations (Agreeableness +1)</button>
      `;
      break;
    case 3:
      scenarioHTML = `
        <p>You hear a whisper in the dark woods. Do you...</p>
        <button onclick="chooseOption('neuroticism', 1)">Worry but follow it (Neuroticism +1)</button>
        <button onclick="chooseOption('openness', 1)">Embrace the mystery (Openness +1)</button>
      `;
      break;
    case 4:
      scenarioHTML = `
        <p>A stranger offers you a magical object. Do you...</p>
        <button onclick="chooseOption('agreeableness', 1)">Accept politely (Agreeableness +1)</button>
        <button onclick="chooseOption('conscientiousness', 1)">Refuse and analyze it (Conscientiousness +1)</button>
      `;
      break;
    case 5:
      scenarioHTML = `
        <p>You must prepare for a dangerous journey. Do you...</p>
        <button onclick="chooseOption('conscientiousness', 1)">Plan every detail (Conscientiousness +1)</button>
        <button onclick="chooseOption('neuroticism', 1)">Panic but press on (Neuroticism +1)</button>
      `;
      break;
    case 6:
      scenarioHTML = `
        <p>You discover a secret passage behind the castle. Do you...</p>
        <button onclick="chooseOption('openness', 1)">Explore immediately (Openness +1)</button>
        <button onclick="chooseOption('extraversion', 1)">Bring friends along (Extraversion +1)</button>
      `;
      break;
    default:
      scenarioHTML = '<p>Something went wrong. Try rolling again.</p>';
  }

  screen.innerHTML = scenarioHTML;
}

function chooseOption(trait, value) {
  personality[trait] += value;
  screen.innerHTML = `
    <p>You chose wisely. ${trait.charAt(0).toUpperCase() + trait.slice(1)} is now ${personality[trait]}.</p>
    <button onclick="nextScenario()">Next</button>
  `;
}

function nextScenario() {
  const name = prompt("Enter your character's name:");
  allCharacters.push({ name, ...personality });
  screen.innerHTML = `
    <p>More quests await... but this is just a demo!</p>
    <p>Your personality so far:</p>
    <pre>${JSON.stringify(personality, null, 2)}</pre>
    <button onclick="showDashboard()">Back to Dashboard</button>
  `;
}

function viewPersonality() {
  screen.innerHTML = `
    <h3>Your Personality</h3>
    <pre>${JSON.stringify(personality, null, 2)}</pre>
    <button onclick="showDashboard()">Back</button>
  `;
}

function calculateCompatibility(charA, charB) {
  const traits = ["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"];
  let score = 0;
  traits.forEach(trait => {
    if (charA[trait] === charB[trait]) score += 1;
    else score -= 1;
  });
  return score;
}

function compatibilitySummary(score) {
  if (score >= 4) return "Great fit";
  if (score === 3) return "Works well";
  if (score === 2) return "Some tension";
  if (score === 1 || score === 0) return "Neutral";
  if (score === -1 || score === -2) return "Strained";
  return "Poor match";
}

function calculateInteractions() {
  if (allCharacters.length < 2) {
    screen.innerHTML = `
      <p>Not enough characters for comparison. Complete more personality journeys first!</p>
      <button onclick="showDashboard()">Back</button>
    `;
    return;
  }

  let html = `<h2>Interaction Compatibility</h2><table border="1"><tr><th></th>`;
  allCharacters.forEach(char => {
    html += `<th>${char.name}</th>`;
  });
  html += `</tr>`;

  allCharacters.forEach((charA, i) => {
    html += `<tr><th>${charA.name}</th>`;
    allCharacters.forEach((charB, j) => {
      if (i === j) {
        html += `<td>—</td>`;
      } else {
        const score = calculateCompatibility(charA, charB);
        const summary = compatibilitySummary(score);
        html += `<td>${score} (${summary})</td>`;
      }
    });
    html += `</tr>`;
  });

  html += `</table><br><button onclick='showDashboard()'>Back</button>`;
  screen.innerHTML = html;
}

showDashboard();
