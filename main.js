// main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Helper Function to Handle Uploads ---
    async function handleUpload(fileInputId, buttonClass) {
        const fileInput = document.getElementById(fileInputId);
        const button = document.querySelector(buttonClass);
        
        // Check if a file is selected
        if (!fileInput || !fileInput.files.length) {
            alert('Please select an image to upload first.');
            return;
        }

        const file = fileInput.files[0];
        
        // Generate a unique filename: timestamp_originalname
        // This prevents overwriting files with the same name
        const fileName = `${Date.now()}_${file.name}`;
        
        // Disable button during upload to prevent double-clicks
        const originalText = button.innerText;
        button.innerText = 'Uploading...';
        button.disabled = true;

        try {
            // Upload to Supabase
            const { data, error } = await supabaseClient
                .storage
                .from(BUCKET_NAME) // BUCKET_NAME is defined in supabase-config.js
                .upload(fileName, file);

            if (error) {
                throw error;
            }

            // Success
            console.log('Upload successful:', data);
            alert('File uploaded successfully!');
            fileInput.value = ''; // Clear the input

        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed: ' + error.message);
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
            e.preventDefault(); // Prevent any default form submission
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

    // --- Existing Chat/Menu Alerts (Keep these if you still want them) ---
    const chatBtn = document.querySelector('.floating-chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            alert("Chat clicked! We will connect this to the contact form later.");
        });
    }
});
