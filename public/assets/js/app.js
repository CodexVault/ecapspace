// ecapspace — minimal interactions

// Copy prompt to clipboard
function copyPrompt(button) {
    const promptCard = button.closest('.prompt-card');
    const promptText = promptCard.querySelector('.prompt-text p').textContent;
    
    navigator.clipboard.writeText(promptText).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#2d7a3e';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        button.textContent = 'Failed to copy';
        setTimeout(() => {
            button.textContent = 'Copy prompt';
        }, 2000);
    });
}

// Make copy buttons work
document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            copyPrompt(this);
        });
    });
});
