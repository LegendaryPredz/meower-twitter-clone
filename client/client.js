
console.log('Hello World!');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading')
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/mews' : 'https://meower-api.vercel.app/mews';
const mewsElement = document.querySelector('.mews');


loadingElement.style.display = '';

listAllMews();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const mew = {
        name,
        content
    };

    form.style.display = 'none';
    loadingElement.style.display = '';
    
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
      .then(createdMew => {
          console.log(createdMew);
          form.reset();
          setTimeout(() => {
            form.style.display = '';
          }, 30000);
        listAllMews();
      })
});

function listAllMews() {
    fetch(API_URL)
      .then(response => response.json())
      .then(mews => {
          mews.reverse();
          console.log(mews);
          mews.forEach(mew => {
              const div = document.createElement('div');

              const header = document.createElement('h3');
              header.textContent = mew.name;

              const contents = document.createElement('p');
              contents.textContent = mew.content;

              const date = document.createElement('small');
              date.textContent = new Date(mew.created);

              div.appendChild(header);
              div.appendChild(contents);
              div.appendChild(date);

              mewsElement.appendChild(div);
          });
          loadingElement.style.display = 'none';
      });
}