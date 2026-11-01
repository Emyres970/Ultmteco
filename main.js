// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    const menuBtn = document.querySelector('.menu-btn');
    const chatBtn = document.querySelector('.floating-chat-btn');

    menuBtn.addEventListener('click', () => {
        alert("Menu clicked! We will wire this up to a real mobile nav later.");
    });

    chatBtn.addEventListener('click', () => {
        alert("Chat clicked! We will connect this to the contact form later.");
    });

});
