'use strict';

// Select DOM elements
const searchResult = document.querySelector('.search');
const form = document.querySelector('form');
const mainContent = document.querySelector('.main-content');

// Add an event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const result = searchResult.value;
  getDiseases(result);
  searchResult.value = '';
});

async function getDiseases(value) {
  try {
    // Fetch the data
    const response = await fetch('data.json');

    const result = await response.json();

    result.forEach(function (data) {
      if (data.name === value) {
        const name = data.name;
        const trimmedName = name[0].toUpperCase() + name.slice(1);

        const html = `
      <div class="disease">
        <h1 class="disease-name">${trimmedName}</h1>
        <p class="disease-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          eaque expedita natus magni porro ipsam?
        </p>
        
        <p class="pathogen">Causative agent: <br><em>${
          data.causativeAgent
        }</em></p>
        <p class="transmission">Mode of transmission: <br>${
          data.modeOfTransmission
        }.</p>
        <p class="incubation-period">Incubation period: <br>${
          data.incubationPeriod
        }.</p>
        <a href="" class="link-who">More in W.H.O</a>
      </div>
      <div class="symptoms">
        <h2>Signs and symptoms</h2>
        <ul class="symptom-list">
        ${data.symptoms
          .map(sym => {
            return `<li><i class="fas fa-check"></i> ${sym}</li>`;
          })
          .join('')}
        </ul>
      </div>
      <div class="precautions">
        <h2>Prevention and cure</h2>
        <ul class="prevention-list">
        ${data.precautions
          .map(pre => {
            return `<li><i class="fas fa-check"></i> ${pre}</li>`;
          })
          .join('')}
        </ul>
      </div>
      `;

        mainContent.innerHTML = '';
        mainContent.insertAdjacentHTML('afterbegin', html);
      }
      if (!value) return;
    });
  } catch (err) {
    mainContent.innerHTML = `Something went wrong`;
  }
}
