(function () {
    const win = document.getElementById('window');
    const titlebar = document.getElementById('titlebar');
    const closeBtn = document.getElementById('closeBtn');
    
    let isDragging = false;
    let offsetX = 0, offsetY = 0;
    
    titlebar.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('btn')) return;
      isDragging = true;
      const rect = win.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      win.style.left = (e.clientX - offsetX) + 'px';
      win.style.top = (e.clientY - offsetY) + 'px';
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    closeBtn.addEventListener('click', () => {
      win.classList.add('hidden');
    });
    linkedButton = document.querySelector('.one');
    linkedButton2 = document.querySelector('.two');
})();
