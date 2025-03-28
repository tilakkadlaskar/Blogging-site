document.addEventListener('DOMContentLoaded', () => {
    // Share links functionality
    const shareLinks = document.querySelectorAll('.share-link');
    shareLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.textContent.split(' ')[2];
            const shareUrl = window.location.href;
            const shareText = document.querySelector('h1').textContent;

            // Placeholder for share functionality
            // In a real implementation, you'd use platform-specific share APIs
            console.log(`Sharing on ${platform}: ${shareText} - ${shareUrl}`);
        });
    });

    // Related post interactions
    const relatedPosts = document.querySelectorAll('.related-post');
    relatedPosts.forEach(post => {
        post.addEventListener('mouseenter', () => {
            post.style.transform = 'translateY(-5px)';
        });

        post.addEventListener('mouseleave', () => {
            post.style.transform = 'translateY(0)';
        });
    });

    // Reading progress indicator
    const progressBar = document.createElement('div');
    progressBar.classList.add('reading-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
});