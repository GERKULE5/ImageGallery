class ImageGalleryService {
    constructor() {
        // DOM elements
        this.body = document.body;
        this.themeBtn = document.getElementById('theme-toggle');
        this.title = document.getElementById('gallery-title');
        this.zoomInBtn = document.getElementById('zoom-in');
        this.zoomOutBtn = document.getElementById('zoom-out');
        this.resetBtn = document.getElementById('reset-styles');
        this.statusPanel = document.getElementById('status-panel');
        this.selectedCounter = document.getElementById('selected-counter');
        this.hiddenCounter = document.getElementById('hidden-counter');
        
        this.imageBoxes = document.querySelectorAll('.image-box');
        this.selectBtns = document.querySelectorAll('.select-btn');
        this.hideBtns = document.querySelectorAll('.hide-btn');
        this.images = document.querySelectorAll('.image-box img');
        
        this.init();
    }
    
    // Initialize all event listeners
    init() {
        this.initThemeToggle();
        this.initSelectButtons();
        this.initHideButtons();
        this.initZoomControls();
        this.initResetButton();
        this.initHoverAndDoubleClick();
        this.updateCounters(); 
    }
    
    // Update counters and alert panel
    updateCounters() {
        const selected = document.querySelectorAll('.image-box.selected').length;
        const hidden = document.querySelectorAll('.image-box.hidden').length;
        
        this.selectedCounter.textContent = `Выбрано изображений: ${selected}`;
        this.hiddenCounter.textContent = `Скрыто изображений: ${hidden}`;
        
        if (selected > 1) {
            this.statusPanel.classList.add('status-alert');
        } else {
            this.statusPanel.classList.remove('status-alert');
        }
    }
    
    // Theme toggle
    initThemeToggle() {
        this.themeBtn.addEventListener('click', () => {
            this.body.classList.toggle('dark-theme');
            this.title.classList.toggle('highlighted-title');
            this.themeBtn.textContent = this.body.classList.contains('dark-theme') 
                ? 'Светлая тема' 
                : 'Темная тема';
        });
    }
    
    // Select image
    initSelectButtons() {
        this.selectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const box = e.currentTarget.closest('.image-box');
                const desc = box.querySelector('.image-description');
                
                box.classList.toggle('selected');
                desc.classList.toggle('highlighted-text');
                this.updateCounters();
            });
        });
    }
    
    // Hide image
    initHideButtons() {
        this.hideBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const box = e.currentTarget.closest('.image-box');
                const isHidden = box.classList.contains('hidden');
                
                box.classList.toggle('hidden');
                
                if (!isHidden && box.classList.contains('selected')) {
                    box.classList.remove('selected');
                    box.querySelector('.image-description').classList.remove('highlighted-text');
                }
                
                e.currentTarget.textContent = box.classList.contains('hidden') 
                    ? 'Показать' 
                    : 'Скрыть';
                
                this.updateCounters();
            });
        });
    }
    
    // Zoom controls
    initZoomControls() {
        this.zoomInBtn.addEventListener('click', () => {
            this.imageBoxes.forEach(box => {
                box.classList.add('zoom-large');
                box.classList.remove('zoom-small');
            });
        });
        
        this.zoomOutBtn.addEventListener('click', () => {
            this.imageBoxes.forEach(box => {
                box.classList.add('zoom-small');
                box.classList.remove('zoom-large');
            });
        });
    }
    
    // Reset all styles
    initResetButton() {
        this.resetBtn.addEventListener('click', () => {
            this.imageBoxes.forEach(box => {
                box.classList.remove('selected', 'hidden', 'zoom-large', 'zoom-small');
                box.style.borderColor = '';
                
                const desc = box.querySelector('.image-description');
                desc.classList.remove('highlighted-text');
                
                const hideBtn = box.querySelector('.hide-btn');
                hideBtn.textContent = 'Скрыть';
            });
            
            this.images.forEach(img => {
                img.style.filter = '';
                img.style.transition = '';
            });
            
            this.statusPanel.classList.remove('status-alert');
            this.updateCounters(); 
        });
    }
    
    // Hover and double-click effects
    initHoverAndDoubleClick() {
        this.imageBoxes.forEach(box => {
            box.addEventListener('mouseenter', function() {
                this.style.borderColor = '#FF6B6B';
            });
            
            box.addEventListener('mouseleave', function() {
                this.style.borderColor = '';
            });
            
            // Double-click on image
            const img = box.querySelector('img');
            img.addEventListener('dblclick', function(e) {
                e.stopPropagation();
                this.style.transition = 'filter 0.5s';
                this.style.filter = this.style.filter === 'sepia(100%)' ? '' : 'sepia(100%)';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageGalleryService();
});