document.addEventListener('DOMContentLoaded', () => {
    // API Base URL
    const API_BASE_URL = '/api/v1';

    // DOM Element Selection
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const postForm = document.getElementById('post-form');

    const registerNameInput = document.getElementById('register-name');
    const registerEmailInput = document.getElementById('register-email');
    const registerPasswordInput = document.getElementById('register-password');

    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');

    const postTitleInput = document.getElementById('post-title');
    const postContentInput = document.getElementById('post-content');

    const authFormsSection = document.getElementById('auth-forms');
    const createPostFormSection = document.getElementById('create-post-form');
    const postsSection = document.getElementById('posts-section');
    const postsContainer = document.getElementById('posts-container');
    const logoutButton = document.getElementById('logout-button');

    // --- Helper Functions ---
    function displayMessage(message, type = 'info') {
        // For simplicity, using alert. In a real app, use a dedicated UI element.
        alert(`[${type.toUpperCase()}] ${message}`);
    }

    // --- API Interaction Functions ---

    // 7. Fetch Posts Logic
    async function fetchPosts() {
        try {
            const response = await fetch(`${API_BASE_URL}/posts`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();

            postsContainer.innerHTML = ''; // Clear current posts

            if (posts.length === 0) {
                postsContainer.innerHTML = '<p>No posts yet. Be the first to create one!</p>';
                return;
            }

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post'; // Add class for styling
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content.replace(/\n/g, '<br>')}</p>
                    ${post.author_name ? `<small>By: ${post.author_name} (ID: ${post.author_id})</small><br>` : ''}
                    <small>Created: ${new Date(post.created_at).toLocaleString()}</small>
                `;
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
            postsContainer.innerHTML = `<p style="color: red;">Error fetching posts: ${error.message}</p>`;
        }
    }

    // --- Authentication State Management ---

    // 9. Initial State / Page Load
    function checkLoginState() {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            authFormsSection.style.display = 'none';
            createPostFormSection.style.display = 'block';
            logoutButton.style.display = 'block';
            postsSection.style.display = 'block'; // Ensure posts section is visible
            fetchPosts();
        } else {
            authFormsSection.style.display = 'block';
            createPostFormSection.style.display = 'none';
            logoutButton.style.display = 'none';
            postsSection.style.display = 'block'; // Posts can be public, so always show
            fetchPosts(); // Fetch posts even if not logged in (if they are public)
        }
    }

    // --- Event Listeners ---

    // 4. Registration Logic
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = registerNameInput.value.trim();
            const email = registerEmailInput.value.trim();
            const password = registerPasswordInput.value.trim();

            if (!name || !email || !password) {
                displayMessage('All fields are required for registration.', 'error');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password }),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || `HTTP error! status: ${response.status}`);
                }
                displayMessage('Registration successful! Please login.', 'success');
                registerForm.reset();
            } catch (error) {
                console.error('Registration error:', error);
                displayMessage(`Registration failed: ${error.message}`, 'error');
            }
        });
    }

    // 5. Login Logic
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = loginEmailInput.value.trim();
            const password = loginPasswordInput.value.trim();

            if (!email || !password) {
                displayMessage('Email and password are required for login.', 'error');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || `HTTP error! status: ${response.status}`);
                }

                if (data.token) {
                    localStorage.setItem('jwtToken', data.token);
                    displayMessage('Login successful!', 'success');
                    loginForm.reset();
                    checkLoginState(); // Update UI and fetch posts
                } else {
                    throw new Error('Login failed: No token received.');
                }
            } catch (error) {
                console.error('Login error:', error);
                displayMessage(`Login failed: ${error.message}`, 'error');
            }
        });
    }

    // 6. Logout Logic
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('jwtToken');
            displayMessage('Logged out successfully.', 'info');
            postsContainer.innerHTML = ''; // Clear posts
            checkLoginState(); // Update UI
        });
    }

    // 8. Create Post Logic
    if (postForm) {
        postForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const title = postTitleInput.value.trim();
            const content = postContentInput.value.trim();
            const token = localStorage.getItem('jwtToken');

            if (!title || !content) {
                displayMessage('Title and content are required to create a post.', 'error');
                return;
            }
            if (!token) {
                displayMessage('You must be logged in to create a post.', 'error');
                checkLoginState(); // Re-check login state, might redirect to login
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ title, content }),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || `HTTP error! status: ${response.status}`);
                }
                displayMessage('Post created successfully!', 'success');
                postForm.reset();
                fetchPosts(); // Refresh the post list
            } catch (error) {
                console.error('Create post error:', error);
                displayMessage(`Error creating post: ${error.message}`, 'error');
            }
        });
    }

    // Initial check
    checkLoginState();
});
