// Enhanced image data with more realistic content
// Enhanced image data with more realistic content
const imageData = [
    {
        id: 1,
        src: 'images/collection1/Grey_Squirrel.jpg',
        title: 'Grey Squirrel',
        description: 'The grey squirrel can be found in woods, gardens and parks across town and country, and often proves to be very tame.',
        date: '20-10-2025',
        collection: 'collection1',
        likes: 0,
        views: 210,
        liked: false
    },
    {
        id: 2,
        src: 'images/collection1/Blue_Tit.jpg',
        title: 'Blue Tit',
        description: 'Eurasian blue tit, is a common small bird with a blue cap, yellow breast, green back, and white cheeks, often found in woodlands, parks, and gardensBeautiful sunrise over the  range with golden light illuminating the peaks. The morning mist creates a magical atmosphere in the valley below.',
        date: '24-10-2025',
        collection: 'collection1',
        likes: 0,
        views: 156,
        liked: false
    },
    {
        id: 3,
        src: 'images/collection1/Robin.jpg',
        title: 'Robin',
        description: 'The bird is a small, plump, and territorial songbird that feeds on insects, seeds, and fruit, and is a familiar sight in gardens, parks, and woodlands.',
        date: '24-10-2025',
        collection: 'collection1',
        likes: 0,
        views: 128,
        liked: false
    },
    {
        id: 4,
        src: 'images/collection2/Future_Me.jpg',
        title: 'Matthew',
        description: 'Only me, I think therefore i am, the very act of thinking is proof of ones existence.',
        date: '09-02-2025',
        collection: 'collection2',
        likes: 0,
        views: 189,
        liked: false
    },
    {
        id: 5,
        src: 'images/collection2/Sykes.jpg',
        title: 'Sykes',
        description: 'The family dog Syke who loves her walkies in the morning,They actually take me for a walk.',
        date: '10-05-2025',
        collection: 'collection2',
        likes: 0,
        views: 245,
        liked: false
    },
    {
        id: 6,
        src: 'images/collection2/Honey.jpg',
        title: 'Honey',
        description: 'The family dog Honey who loves her walkies in the morning,They actually take me for a walk.',
        date: '10-05-2025',
        collection: 'collection2',
        likes: 0,
        views: 298,
        liked: false
    },
    {
        id: 7,
        src: 'images/collection3/Green_Story.jpg',
        title: 'Green Story',
        description: 'Peaceful and charming place, especially beautiful when it rains. It\'s a perfect spot for couples seeking a romantic date, offering a quiet and intimate atmosphere. The location is also ideal for photography.',
        date: '10-11-2025',
        collection: 'collection3',
        likes: 0,
        views: 234,
        liked: false
    },
    {
        id: 8,
        src: 'images/collection3/Xmas_Sim.jpg',
        title: 'Winter Ice Christmas Fest',
        description: 'City streets illuminated by neon signs and passing traffic at night. The motion blur of vehicles creates dynamic light trails.',
        date: '10-11-2025',
        collection: 'collection3',
        likes: 0,
        views: 167,
        liked: false
    },
     {
        id: 9,
        src: 'images/collection3/Filo_my_puppie.jpg',
        title: 'Filo my puppie',
        description: 'Filo my AI pet who guards my parcel in SecondLife. He is very loyal and friendly, always excited to see me when I log in. Filo loves to play fetch and go on adventures around the virtual world.',
        date: '10-11-2025',
        collection: 'collection3',
        likes: 0,
        views: 167,
        liked: false
    }
];

// DOM Elements
const galleryContainer = document.getElementById('galleryContainer');
const themeToggle = document.getElementById('themeToggle');
const filterLinks = document.querySelectorAll('.nav-link[data-filter]');
const collectionCards = document.querySelectorAll('.collection-card');
const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

// Current modal image reference
let currentModalImage = null;

// Initialize the gallery
document.addEventListener('DOMContentLoaded', function() {
    loadGallery('all');
    setupEventListeners();
    initTheme();
});

// Set up event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Filter links
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Load filtered gallery
            loadGallery(filter);
            
            // Scroll to gallery
            scrollToGallery();
        });
    });
    
    // Collection cards
    collectionCards.forEach(card => {
        card.addEventListener('click', function() {
            const collection = this.getAttribute('data-collection');
            
            // Update active state
            filterLinks.forEach(l => l.classList.remove('active'));
            document.querySelector(`[data-filter="${collection}"]`).classList.add('active');
            
            // Load filtered gallery
            loadGallery(collection);
            
            // Scroll to gallery
            scrollToGallery();
        });
    });

    // Modal event listeners for like and download buttons
    document.getElementById('imageModal').addEventListener('shown.bs.modal', function() {
        if (currentModalImage) {
            updateModalButtons(currentModalImage);
        }
    });
}

// Load gallery with optional filter
function loadGallery(filter = 'all') {
    galleryContainer.innerHTML = '';
    
    const filteredImages = filter === 'all' 
        ? imageData 
        : imageData.filter(img => img.collection === filter);
    
    if (filteredImages.length === 0) {
        galleryContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-image display-1 text-muted mb-3"></i>
                <h3 class="text-muted">No images found</h3>
                <p class="text-muted">Try selecting a different collection.</p>
            </div>
        `;
        return;
    }
    
    filteredImages.forEach((image, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-3';
        col.style.animationDelay = `${index * 0.1}s`;
        
        // Limit description length for card view using JavaScript only
        const shortDescription = limitTextToWords(image.description, 15);
        
        col.innerHTML = `
            <div class="gallery-card" data-id="${image.id}">
                <div class="card-img-container">
                    <img src="${image.src}" class="card-img-top" alt="${image.title}" onerror="this.src='https://picsum.photos/400/300?random=${image.id}'">
                    <div class="card-overlay">
                        <span class="collection-badge">${getCollectionName(image.collection)}</span>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${image.title}</h5>
                    <p class="card-text">${shortDescription}</p>
                </div>
                <div class="card-footer">
                    <small class="card-date">${formatDateLong(image.date)}</small>
                    <button class="btn btn-sm view-btn">View →</button>
                </div>
            </div>
        `;
        
        galleryContainer.appendChild(col);
        
        // Add event listener to the view button
        col.querySelector('.view-btn').addEventListener('click', () => {
            openImageModal(image);
        });
    });
}

// Limit text by word count (pure JavaScript solution)
function limitTextToWords(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
}

// Open image modal
function openImageModal(image) {
    currentModalImage = image;
    
    document.getElementById('modalImage').src = image.src;
    document.getElementById('modalImageTitle').textContent = image.title;
    document.getElementById('modalImageDescription').textContent = image.description;
    document.getElementById('modalImageDate').textContent = `Added: ${formatDateLong(image.date)}`;
    document.getElementById('modalImageCollection').textContent = `${getCollectionName(image.collection)} Collection`;
    
    // Update like count display
    const likeCountElement = document.getElementById('modalLikeCount');
    if (likeCountElement) {
        likeCountElement.textContent = `${image.likes} likes`;
    }
    
    imageModal.show();
}

// Update modal buttons state
function updateModalButtons(image) {
    const likeButton = document.querySelector('.btn-like');
    const downloadButton = document.querySelector('.btn-download');
    
    if (likeButton) {
        // Update like button state
        likeButton.innerHTML = image.liked ? 
            '<i class="bi bi-heart-fill"></i> Liked' : 
            '<i class="bi bi-heart"></i> Like';
        likeButton.classList.toggle('btn-danger', image.liked);
        likeButton.classList.toggle('btn-outline-primary', !image.liked);
        
        // Update like count
        const likeCountElement = document.getElementById('modalLikeCount');
        if (likeCountElement) {
            likeCountElement.textContent = `${image.likes} likes`;
        }
        
        // Remove existing event listener and add new one
        likeButton.replaceWith(likeButton.cloneNode(true));
        const newLikeButton = document.querySelector('.btn-like');
        newLikeButton.addEventListener('click', () => toggleLike(image));
    }
    
    if (downloadButton) {
        // Remove existing event listener and add new one
        downloadButton.replaceWith(downloadButton.cloneNode(true));
        const newDownloadButton = document.querySelector('.btn-download');
        newDownloadButton.addEventListener('click', () => downloadImage(image));
    }
}

// Toggle like for an image
function toggleLike(image) {
    image.liked = !image.liked;
    image.likes += image.liked ? 1 : -1;
    
    // Update the button in the modal
    updateModalButtons(image);
    
    // Show feedback
    const likeButton = document.querySelector('.btn-like');
    if (likeButton) {
        likeButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            likeButton.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Save to localStorage (optional persistence)
    saveLikesToStorage();
}

// Download image
function downloadImage(image) {
    try {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = image.src;
        link.download = `${image.title.replace(/\s+/g, '_')}.jpg`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show download feedback
        const downloadButton = document.querySelector('.btn-download');
        if (downloadButton) {
            const originalText = downloadButton.innerHTML;
            downloadButton.innerHTML = '<i class="bi bi-check"></i> Downloaded!';
            downloadButton.classList.add('btn-success');
            downloadButton.classList.remove('btn-outline-primary');
            
            setTimeout(() => {
                downloadButton.innerHTML = originalText;
                downloadButton.classList.remove('btn-success');
                downloadButton.classList.add('btn-outline-primary');
            }, 2000);
        }
        
    } catch (error) {
        console.error('Download failed:', error);
        alert('Sorry, the download failed. The image might be hosted externally.');
    }
}

// Save likes to localStorage
function saveLikesToStorage() {
    const likesData = imageData.reduce((acc, image) => {
        acc[image.id] = {
            liked: image.liked,
            likes: image.likes
        };
        return acc;
    }, {});
    
    localStorage.setItem('galleryLikes', JSON.stringify(likesData));
}

// Load likes from localStorage
function loadLikesFromStorage() {
    const savedLikes = localStorage.getItem('galleryLikes');
    if (savedLikes) {
        const likesData = JSON.parse(savedLikes);
        imageData.forEach(image => {
            if (likesData[image.id]) {
                image.liked = likesData[image.id].liked;
                image.likes = likesData[image.id].likes;
            }
        });
    }
}

// Toggle between light and dark theme
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-bs-theme', newTheme);
    
    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'light' ? 'bi bi-moon' : 'bi bi-sun';
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
}

// Get collection name from ID
function getCollectionName(collectionId) {
    const names = {
        'collection1': 'Nature',
        'collection2': 'Personal',
        'collection3': 'SecondLife'
    };
    
    return names[collectionId] || collectionId;
}

// Format date for UK format (DD-MM-YYYY) to long format
function formatDateLong(dateString) {
    // Parse the UK date format (DD-MM-YYYY)
    const parts = dateString.split('-');
    if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        
        // Create a proper Date object (months are 0-indexed in JavaScript)
        const date = new Date(year, month - 1, day);
        
        // Format to long UK date format
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }
    
    // Fallback if the date format is unexpected
    return dateString;
}

// Check for saved theme preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    
    // Set correct icon
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'light' ? 'bi bi-moon' : 'bi bi-sun';
    
    // Load saved likes
    loadLikesFromStorage();
}

// Scroll to gallery section
function scrollToGallery() {
    document.getElementById('gallery').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleY = (x - centerX) / 25;
            const angleX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        }
    });
});