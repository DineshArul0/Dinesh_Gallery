// Define the folder structure
const imagePaths = {
    '2023': {
        'January': [
            'images/2023/January/image1.jpg',
            'images/2023/January/image2.jpg'
        ],
        'February': [
            'images/2023/February/image3.jpg'
        ]
    },
    '2024': {
        'March': [
            'images/2024/March/image4.jpg'
        ]
    }
};

let images = [];
let currentIndex = -1;

// Function to create HTML for card view grouped by year and month
function createCardView(imagePaths) {
    const galleryContainer = document.getElementById('gallery-container');
    
    Object.keys(imagePaths).forEach(year => {
        // Create a section for each year
        const yearSection = document.createElement('div');
        yearSection.classList.add('col-12', 'mb-4');
        
        const yearTitle = document.createElement('h2');
        yearTitle.textContent = `Year: ${year}`;
        yearSection.appendChild(yearTitle);
        
        // Create a section for each month within the year
        Object.keys(imagePaths[year]).forEach(month => {
            // Create a section for each month
            const monthSection = document.createElement('div');
            monthSection.classList.add('col-12', 'mb-4');
            
            const monthTitle = document.createElement('h3');
            monthTitle.textContent = `Month: ${month}`;
            monthSection.appendChild(monthTitle);
            
            // Create a card container for the month
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3', 'row-cols-lg-4', 'row-cols-xl-6', 'g-4');
            
            imagePaths[year][month].forEach((image, index) => {
                const cardItem = document.createElement('div');
                cardItem.classList.add('col');
                
                cardItem.innerHTML = `
                    <div class="card h-100">
                        <img src="${image}" class="card-img-top" alt="Image">
                    </div>
                `;
                
                // Add click event to open the image in the modal
                cardItem.addEventListener('click', () => {
                    images = imagePaths[year][month];
                    currentIndex = index;
                    showModal(image);
                });
                
                cardContainer.appendChild(cardItem);
            });
            
            monthSection.appendChild(cardContainer);
            yearSection.appendChild(monthSection);
        });
        
        galleryContainer.appendChild(yearSection);
    });
}

// Function to show image in the modal
function showModal(imageSrc) {
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.show();
}

// Function to navigate through images
function navigateImage(direction) {
    if (images.length === 0 || currentIndex === -1) return;

    currentIndex = (currentIndex + direction + images.length) % images.length;
    const newImageSrc = images[currentIndex];
    showModal(newImageSrc);
}

// Handle navigation arrows in the modal
document.getElementById('prev-arrow').addEventListener('click', () => {
    navigateImage(-1);
});

document.getElementById('next-arrow').addEventListener('click', () => {
    navigateImage(1);
});

// Handle arrow key navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        navigateImage(-1);
    } else if (event.key === 'ArrowRight') {
        navigateImage(1);
    }
});

// Load images into the gallery
document.addEventListener('DOMContentLoaded', () => {
    createCardView(imagePaths);
});
