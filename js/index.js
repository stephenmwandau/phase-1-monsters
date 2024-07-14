const baseURL = 'http://localhost:3000'; // Assuming json-server runs on localhost:3000
let currentPage = 1;
const monstersPerPage = 50;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-monster-form');
  const monsterContainer = document.getElementById('monster-container');
  const loadMoreBtn = document.getElementById('load-more');

  // Fetch and display initial monsters
  fetchMonsters(currentPage);

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const description = document.getElementById('description').value;

    createMonster(name, age, description);
    form.reset(); // Clear form fields after submission
  });

  // Load more monsters
  loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    fetchMonsters(currentPage);
  });

  // Function to fetch monsters
  function fetchMonsters(page) {
    fetch(`${baseURL}/monsters?_page=${page}&_limit=${monstersPerPage}`)
      .then(response => response.json())
      .then(monsters => {
        monsters.forEach(monster => {
          renderMonster(monster);
        });
      });
  }

  // Function to render a single monster
  function renderMonster(monster) {
    const monsterCard = document.createElement('div');
    monsterCard.classList.add('monster-card');
    monsterCard.innerHTML = `
      <h3>${monster.name}</h3>
      <p>Age: ${monster.age}</p>
      <p>Description: ${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterCard);
  }

  // Function to create a new monster
  function createMonster(name, age, description) {
    fetch(`${baseURL}/monsters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        age,
        description
      })
    })
    .then(response => response.json())
    .then(newMonster => {
      renderMonster(newMonster);
    });
  }
});
