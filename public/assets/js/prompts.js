// Load and display prompts from JSON

let allPrompts = [];
let currentFilter = 'all';

// Load prompts on page load
async function loadPrompts() {
    try {
        const response = await fetch('/data/prompts.json');
        const data = await response.json();
        allPrompts = data.prompts;
        displayPrompts(allPrompts);
        setupFilters();
    } catch (error) {
        console.error('Failed to load prompts:', error);
        document.getElementById('prompts-container').innerHTML = 
            '<p class="error">Failed to load prompts. Please refresh the page.</p>';
    }
}

// Display prompts
function displayPrompts(prompts) {
    const container = document.getElementById('prompts-container');
    
    if (prompts.length === 0) {
        container.innerHTML = '<p class="no-results">No prompts found for this category.</p>';
        return;
    }
    
    container.innerHTML = prompts.map(prompt => `
        <div class="prompt-card" data-category="${prompt.category}" data-id="${prompt.id}">
            <h3>${prompt.title}</h3>
            <p class="context">${prompt.context}</p>
            <div class="prompt-text">
                <p>"${prompt.text}"</p>
            </div>
            <button class="copy-btn" onclick="copyPrompt(this)">Copy prompt</button>
            <p class="usage-note">${prompt.usage_notes}</p>
            <div class="models">
                ${prompt.models.map(model => `<span class="model-tag">${formatModelName(model)}</span>`).join('')}
            </div>
            ${prompt.effectiveness ? `<span class="effectiveness ${prompt.effectiveness}">${prompt.effectiveness} effectiveness</span>` : ''}
        </div>
    `).join('');
}

// Format model names
function formatModelName(model) {
    const names = {
        'claude': 'Claude',
        'gpt': 'ChatGPT',
        'gemini': 'Gemini'
    };
    return names[model] || model;
}

// Setup filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter prompts
            const category = button.dataset.category;
            currentFilter = category;
            
            if (category === 'all') {
                displayPrompts(allPrompts);
            } else {
                const filtered = allPrompts.filter(p => p.category === category);
                displayPrompts(filtered);
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPrompts();
});
