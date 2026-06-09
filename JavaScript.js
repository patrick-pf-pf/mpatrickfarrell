document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gallery-container').forEach(container => {
      const mediaList = container.getAttribute('data-media').split(',').map(item => item.trim());
      let currentIndex = 0;
  
      function renderMedia(src, onLoadCallback) {
        const ext = src.split('.').pop().toLowerCase();
        let element;
  
        if (['mp4', 'webm', 'ogg'].includes(ext)) {
          element = document.createElement('video');
          element.src = src;
          element.controls = false;
          element.autoplay = true;
          element.loop = true;
          element.muted = true;
          element.addEventListener('loadeddata', () => {
            if (onLoadCallback) onLoadCallback(element);
          });
        } else {
          element = document.createElement('img');
          element.src = src;
          element.alt = 'Gallery item';
          element.onload = () => {
            if (onLoadCallback) onLoadCallback(element);
          };
        }
  
        element.classList.add('gallery-media');
      }
  
      function updateMedia(index) {
        renderMedia(mediaList[index], (newEl) => {
          container.innerHTML = ''; // Clear current content
          container.appendChild(newEl);
        });
      }
  
      // Initial render
      updateMedia(currentIndex);
  
      container.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % mediaList.length;
        updateMedia(currentIndex);
      });
    });
  });

  container.addEventListener('click', (e) => {
    const containerRect = container.getBoundingClientRect();
    const clickX = e.clientX - containerRect.left;
  
    // Go back if click is on the left half
    if (clickX < containerRect.width / 2) {
      currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
    } else {
      // Go forward if click is on the right half
      currentIndex = (currentIndex + 1) % mediaList.length;
    }
  
    updateMedia(currentIndex);
  });
  
  