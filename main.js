// main.js
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Snackbar Function ---
    function showSnackbar(message, type = 'success') {
        const snackbar = document.getElementById('snackbar');
        snackbar.innerText = message;
        snackbar.className = `snackbar show ${type}`;
        
        // Hide after 4 seconds
        setTimeout(() => {
            snackbar.className = 'snackbar';
        }, 4000);
    }

    // --- Sidebar Menu Logic ---
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const dropdownToggle = document.getElementById('dropdownToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');

    function openMenu() {
        sidebarMenu.classList.add('active');
        menuOverlay.classList.add('active');
    }

    function closeMenu() {
        sidebarMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
    }

    openMenuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Dropdown Toggle
    dropdownToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('active');
        // Rotate chevron icon
        const icon = dropdownToggle.querySelector('i');
        if (dropdownMenu.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });

    // --- Helper Function to Handle Uploads ---
    async function handleUpload(fileInputId, buttonClass) {
        const fileInput = document.getElementById(fileInputId);
        const button = document.querySelector(buttonClass);
        
        // 1. Check if Supabase is actually loaded
        if (typeof supabaseClient === 'undefined') {
            showSnackbar('Error: Supabase is not connected.', 'error');
            return;
        }

        // 2. Check if a file is selected
        if (!fileInput || !fileInput.files.length) {
            showSnackbar('Please select an image to upload first.', 'error');
            return;
        }

        const file = fileInput.files[0];
        const fileName = `${Date.now()}_${file.name}`;
        
        // Disable button during upload
        const originalText = button.innerText;
        button.innerText = 'Uploading...';
        button.disabled = true;

        try {
            // 3. Upload to Supabase
            const { data, error } = await supabaseClient
                .storage
                .from(BUCKET_NAME)
                .upload(fileName, file);

            if (error) {
                throw error;
            }

            // Success
            console.log('Upload successful:', data);
            showSnackbar('File uploaded successfully!', 'success');
            fileInput.value = ''; // Clear the input

        } catch (error) {
            console.error('Upload error:', error);
            showSnackbar('Upload failed: ' + error.message, 'error');
        } finally {
            // Restore button state
            button.innerText = originalText;
            button.disabled = false;
        }
    }

    // --- Wire up Option 1 ---
    const submitBtn1 = document.querySelector('.option-container:nth-of-type(1) .submit-btn');
    if (submitBtn1) {
        submitBtn1.addEventListener('click', (e) => {
            e.preventDefault();
            handleUpload('image-upload-1', '.option-container:nth-of-type(1) .submit-btn');
        });
    }

    // --- Wire up Option 2 ---
    const submitBtn2 = document.querySelector('.option-container:nth-of-type(2) .submit-btn');
    if (submitBtn2) {
        submitBtn2.addEventListener('click', (e) => {
            e.preventDefault();
            handleUpload('image-upload-2', '.option-container:nth-of-type(2) .submit-btn');
        });
    }

    // --- Chat Button ---
    const chatBtn = document.querySelector('.floating-chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            showSnackbar('Chat feature coming soon!', 'success');
        });
    }
});
