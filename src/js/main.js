const API_KEY = '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'

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', fetchImages);

const searchInput = document.getElementById('searchInput');

// add this later on
searchInput.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    fetchImages();
  }
})

async function fetchImages() {
  const prompt = searchInput.value;
  
  const numImages = 2;
  // Validate the number of images
  if (numImages < 1 || numImages > 10) {
    alert('Invalid number of images. Please enter a number between 1 and 10.');
    return;
  }

  // Clear the existing images
  const imageGrid = document.getElementById('imageGrid');
  imageGrid.innerHTML = '';

  showLoadingAnimation();


  try {
    // Make API request to OpenAI to fetch images
    // Replace 'YOUR_API_KEY' with your actual OpenAI API key
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        n: numImages,
        size: '512x512'
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Display the fetched images
      data.data.forEach(imageUrl => {
        const generatedUrl = imageUrl.url;
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');

        const img = document.createElement('img');
        img.src = generatedUrl;

        // add this later on
        img.addEventListener('load', () => {
          img.classList.add('loaded'); 
        })

        imageCard.appendChild(img);
        imageGrid.appendChild(imageCard);
      });
    } else {
      console.error('Image fetch failed:', data.error);
    }
  } catch (error) {
    console.error('Error:', error)
  }
  hideLoadingAnimation();
}

function showLoadingAnimation() {
  const searchBtnIcon = document.getElementById('searchBtnIcon');
  searchBtnIcon.style.display = 'none';

  const loadingAnimation = document.getElementById('loadingAnimation');
  loadingAnimation.style.display = 'block';
}

function hideLoadingAnimation() {
  const searchBtnIcon = document.getElementById('searchBtnIcon');
  searchBtnIcon.style.display = 'block';

  const loadingAnimation = document.getElementById('loadingAnimation');
  loadingAnimation.style.display = 'none';
}