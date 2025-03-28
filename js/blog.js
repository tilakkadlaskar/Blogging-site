document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to top functionality
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Pagination interaction
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Navigated to: ${link.textContent}`);
            // Optional: Add pagination logic here
        });
    });

    // Blog post preview hover effects
    const blogPreviews = document.querySelectorAll('.blog-post-preview');
    blogPreviews.forEach(preview => {
        preview.addEventListener('mouseenter', () => {
            preview.style.transform = 'translateY(-5px)';
        });

        preview.addEventListener('mouseleave', () => {
            preview.style.transform = 'translateY(0)';
        });
    });

    // Read more link interactions
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const postTitle = link.closest('.blog-post-preview').querySelector('h2').textContent;
            console.log(`Clicked read more for: ${postTitle}`);
        });
    });

    // Simple search/filter functionality (optional)
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Search blog posts...');
    searchInput.classList.add('blog-search-input');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const posts = document.querySelectorAll('.blog-post-preview');

        posts.forEach(post => {
            const title = post.querySelector('h2').textContent.toLowerCase();
            const excerpt = post.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });

    // Append search input to blog posts container
    const blogPostsContainer = document.querySelector('.blog-posts-container');
    blogPostsContainer.insertBefore(searchInput, blogPostsContainer.firstChild);
});