let monsterData;
let logo;

function setup() {
  createCanvas(600, 600);
  textAlign(LEFT, TOP);
  textSize(16);
  noLoop();

  // Create and position D&D logo
  logo = createImg('dnd_logo.png', 'D&D Logo');
  logo.size(200, 100);
  logo.position((width - 200) / 2, height - 100 - 20); 
}

function draw() {
  background('#001902');

  // Draw the border
  stroke(255, 215, 0);
  noFill();
  rect(20, 20, width - 40, height - 40, 10);

  fill(255);
  textSize(24);
  textStyle(BOLD);
  text(monsterData ? monsterData.name : "Click to summon a random D&D monster!", 30, 40);

  textSize(16);
  textStyle(NORMAL);

  if (monsterData) {
    // Stat categories
    textSize(18);
    text("Type:", 30, 80);
    text("Size:", 30, 120);
    text("Challenge Rating:", 30, 160);
    text("Hit Points:", 30, 200);
    text("Armor Class:", 30, 240);
    text("Actions:", 30, 280);

    // Stat values
    textSize(16);
    text(monsterData.type || "Unknown", 150, 80);
    text(monsterData.size || "Unknown", 150, 120);
    text(monsterData.challenge_rating || "Unknown", 180, 163);
    text(monsterData.hit_points || "Unknown", 150, 200);

    // armour class is an array from the API so we need to get only the first element from that array
    let armorClassValue = monsterData.armor_class?.[0]?.value ?? "Unknown";
    text(armorClassValue, 150, 240);

    // actions are a list of objects from the API so we need to loop through and pull out each item and display them as a readable list string
    let actions = monsterData.actions?.map(a => a.name).join(", ") || "None";
    text(actions, 150, 280);
  }
}

// when the mouse is pressed, load list of monsters from the API
function mousePressed() {
  let url = "https://www.dnd5eapi.co/api/monsters";
  loadJSON(url, monsterListLoaded);
}


// when the list of monsters is loaded, pick a random monster and load its data
function monsterListLoaded(data) {
  let randomMonster = random(data.results);
  let url = "https://www.dnd5eapi.co" + randomMonster.url;
  loadJSON(url, gotMonster);
}


// when the monster data is loaded, store it in a variable and redraw the canvas
function gotMonster(data) {
  monsterData = data;
  redraw();
}


