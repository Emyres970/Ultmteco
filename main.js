// main.js
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Helper Function to Handle Uploads ---
    async function handleUpload(fileInputId, buttonClass) {
        const fileInput = document.getElementById(fileInputId);
        const button = document.querySelector(buttonClass);
        
        // 1. Check if Supabase is actually loaded
        if (typeof supabaseClient === 'undefined') {
            alert('Error: Supabase is not connected. Please check the script tags in your HTML.');
            return;
        }

        // 2. Check if a file is selected
        if (!fileInput || !fileInput.files.length) {
            alert('Please select an image to upload first.');
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
            alert("Chat clicked! We will connect this to the contact form later.");
        });
    }
});
