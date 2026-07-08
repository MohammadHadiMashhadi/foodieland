const BASE_URL = 'https://foodieland-oq9b.onrender.com';

// ----------------------------------------------------
// 1. Create UI Components (Loading and Toast)
// ----------------------------------------------------
function initUIComponents() {
    if (!document.getElementById('globalLoader')) {
        const loaderHTML = `
            <div class="global-loader" id="globalLoader">
                <div class="spinner"></div>
                <div class="loader-text">Connecting to server...</div>
                <div class="loader-subtext">Due to free hosting, the server may take up to 60 seconds to wake up. Thank you for your patience!</div>
            </div>
        `;
        const toastHTML = `<div class="toast-msg" id="toastMessage"></div>`;
        
        document.body.insertAdjacentHTML('beforeend', loaderHTML);
        document.body.insertAdjacentHTML('beforeend', toastHTML);
    }
}

const showLoader = () => document.getElementById('globalLoader').classList.add('active');
const hideLoader = () => document.getElementById('globalLoader').classList.remove('active');

const showToast = (message, type = 'success') => {
    const toast = document.getElementById('toastMessage');
    toast.textContent = message;
    toast.className = `toast-msg show ${type}`;
    setTimeout(() => toast.classList.remove('show'), 5000);
};

// ----------------------------------------------------
// 3. Get Categories (Home Page)
// ----------------------------------------------------
async function getCategories() {
    const categoryContainer = document.querySelector('.category .row-content');
    if (!categoryContainer) return; 

    try {
        showLoader();
        const response = await fetch(`${BASE_URL}/api/categories`);
        if (!response.ok) throw new Error('Failed to connect to the server.');
        
        const rawData = await response.json();
        
        // Ensure data is parsed correctly regardless of wrapper object
        const data = Array.isArray(rawData) ? rawData : (rawData.data || rawData.categories || []);
        
        categoryContainer.innerHTML = ''; // Clear static data
        
        data.forEach((cat, index) => {
            const bgClass = `bg-${(index % 6) + 1}`;
            const shadowClass = `shadow-${(index % 6) + 1}`;
            const liHTML = `
                <li class="category-item">
                    <img src="${cat.icon || cat.image || ''}" class="${shadowClass}" alt="${cat.name || 'Category'}">
                    <h3>${cat.name || 'Category'}</h3>
                    <div class="bg ${bgClass}"></div>
                </li>
            `;
            categoryContainer.insertAdjacentHTML('beforeend', liHTML);
        });

    } catch (error) {
        console.error("Categories Error:", error);
        showToast('Error fetching categories!', 'error');
    } finally {
        hideLoader();
    }
}

// ----------------------------------------------------
// 4. Get Recipe Details (Recipe Details Page)
// ----------------------------------------------------
async function getRecipeDetails() {
    const nutritionContainer = document.querySelector('.details-list');
    const descriptionContainer = document.querySelector('.video-description');
    
    if (!nutritionContainer || !descriptionContainer) return; 

    try {
        showLoader();
        const response = await fetch(`${BASE_URL}/api/recipe-details/1`);
        if (!response.ok) throw new Error('Failed to connect to the server.');
        
        const data = await response.json();
        const details = data.data || data; // Extract data if wrapped

        nutritionContainer.innerHTML = `
            <li><h3>Calories</h3><h4>${details.nutrition?.calories || details.calories || 'N/A'}</h4></li>
            <li><h3>Total Fat</h3><h4>${details.nutrition?.totalFat || details.fat || 'N/A'}</h4></li>
            <li><h3>Protein</h3><h4>${details.nutrition?.protein || details.protein || 'N/A'}</h4></li>
            <li><h3>Carbohydrate</h3><h4>${details.nutrition?.carbohydrate || details.carbs || 'N/A'}</h4></li>
            <li><h3>Cholesterol</h3><h4>${details.nutrition?.cholesterol || details.cholesterol || 'N/A'}</h4></li>
        `;
        
        descriptionContainer.textContent = details.description || details.text || 'No description provided.';

    } catch (error) {
        console.error("Recipe Details Error:", error);
        showToast('Error fetching recipe details!', 'error');
    } finally {
        hideLoader();
    }
}

// ----------------------------------------------------
// 5. Newsletter Subscription
// ----------------------------------------------------
function setupNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.get-deta');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent page refresh
            
            const emailInput = form.querySelector('.email-input');
            const email = emailInput?.value.trim();
            
            if (!email) {
                showToast('Please enter your email.', 'error');
                return;
            }

            try {
                showLoader();
                const response = await fetch(`${BASE_URL}/api/subscribe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                if (!response.ok) throw new Error('Subscription error');

                showToast('Your email has been successfully registered!', 'success');
                emailInput.value = '';

            } catch (error) {
                console.error("Newsletter Error:", error);
                showToast('An error occurred while subscribing to the newsletter.', 'error');
            } finally {
                hideLoader();
            }
        });
    });
}

// ----------------------------------------------------
// 6. Contact Us Form
// ----------------------------------------------------
// ----------------------------------------------------
// 6. Contact Us Form
// ----------------------------------------------------
function setupContactForm() {
    const contactForm = document.querySelector('.contact-top-wrapper .right-wrapper');
    const submitBtn = document.querySelector('.contact-top-wrapper .send-btn');
    if (!contactForm || !submitBtn) return;

    const inputs = contactForm.querySelectorAll('input, select, textarea');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        // تغییر نام enquiry به enquiryType دقیقاً مطابق با خواسته سرور
        const payload = {
            name: inputs[0]?.value.trim(),
            email: inputs[1]?.value.trim(),
            subject: inputs[2]?.value.trim(),
            enquiryType: document.querySelector('#enquiry')?.value, 
            message: document.querySelector('#message')?.value.trim()
        };

        if (!payload.name || !payload.email || !payload.message || !payload.subject || !payload.enquiryType) {
            showToast('Please fill in the required fields.', 'error');
            return;
        }

        try {
            showLoader();
            const response = await fetch(`${BASE_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Error sending message');

            showToast('Your message has been sent successfully.', 'success');
            
            inputs.forEach(input => {
                if (input.tagName === 'SELECT') input.selectedIndex = 0;
                else input.value = '';
            });

        } catch (error) {
            console.error("Contact Form Error:", error);
            showToast('An error occurred while sending the message.', 'error');
        } finally {
            hideLoader();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initUIComponents();
    getCategories();
    getRecipeDetails();
    setupNewsletterForms();
    setupContactForm();
});