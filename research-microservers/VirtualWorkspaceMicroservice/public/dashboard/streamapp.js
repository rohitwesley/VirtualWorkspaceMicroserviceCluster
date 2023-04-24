const container = document.getElementById('image-container');
const form = document.getElementById('add-image-form');

function createImageCard(image) {
  const card = document.createElement('div');
  card.className = 'image-card';

  const img = document.createElement('img');
  img.src = image.url;
  img.alt = image.title;
  card.appendChild(img);

  const metadata = document.createElement('div');
  metadata.className = 'metadata';

  const title = document.createElement('h2');
  title.textContent = image.title;
  metadata.appendChild(title);

  const author = document.createElement('p');
  author.textContent = `By ${image.author}`;
  metadata.appendChild(author);

  card.appendChild(metadata);

  return card;
}

function addImage(event) {
  event.preventDefault();

  const formData = new FormData(form);

  axios.post('/images', {
    title: formData.get('title'),
    author: formData.get('author'),
    url: formData.get('url')
  })
  .then(response => {
    const image = response.data;
    const card = createImageCard(image);
    container.prepend(card);
  })
  .catch(error => {
    console.error(error);
  });
}

form.addEventListener('submit', addImage);

fetch('/images')
  .then(response => response.json())
  .then(images => {
    images.forEach(image => {
      const card = createImageCard(image);
      container.appendChild(card);
    });
  });

// Socket.io code for real-time updates
const socket = io();

socket.on('image-updated', (image) => {
  const card = createImageCard(image);
  container.prepend(card);
});
