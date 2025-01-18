const username = 'ibedestudio';

async function fetchGitHubRepos() {
    try {
        // Menggunakan header untuk meningkatkan rate limit
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        // Fetch repository data
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
            { headers }
        );
        const repos = await response.json();
        
        const reposContainer = document.getElementById('github-repos');
        reposContainer.innerHTML = '';

        for (const repo of repos) {
            if (!repo.fork) {
                // Fetch detailed repo data untuk mendapatkan watchers count yang akurat
                const detailResponse = await fetch(
                    `https://api.github.com/repos/${username}/${repo.name}`,
                    { headers }
                );
                const detailData = await detailResponse.json();

                const repoElement = document.createElement('div');
                repoElement.className = 'portfolio-item';
                
                const updatedAt = new Date(repo.updated_at);
                const timeAgo = getTimeAgo(updatedAt);

                repoElement.innerHTML = `
                    <h3 class="portfolio-title">${repo.name}</h3>
                    <p class="portfolio-description">
                        ${repo.description || 'No description available'}
                    </p>
                    <div class="repo-meta">
                        <span class="update-time">
                            <i class="far fa-clock"></i>
                            Updated ${timeAgo}
                        </span>
                        ${repo.language ? `
                            <span class="main-language">
                                <span class="language-dot" style="background-color: ${getLanguageColor(repo.language)}"></span>
                                ${repo.language}
                            </span>
                        ` : ''}
                    </div>
                    <div class="github-stats">
                        <div class="github-stat" title="Stars">
                            <i class="fas fa-star"></i>
                            <span>${detailData.stargazers_count.toLocaleString()}</span>
                        </div>
                        <div class="github-stat" title="Forks">
                            <i class="fas fa-code-branch"></i>
                            <span>${detailData.forks_count.toLocaleString()}</span>
                        </div>
                        <div class="github-stat" title="Watchers">
                            <i class="fas fa-eye"></i>
                            <span>${detailData.subscribers_count.toLocaleString()}</span>
                        </div>
                    </div>
                    <a href="${repo.html_url}" class="repo-link" target="_blank">
                        <i class="fab fa-github"></i>
                        View Repository
                    </a>
                `;
                
                reposContainer.appendChild(repoElement);
            }
        }
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        document.getElementById('github-repos').innerHTML = `
            <div class="error-message">
                Failed to load repositories. Please try again later.
            </div>
        `;
    }
}

// Helper function to get relative time
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
}

// Helper function to get language color
function getLanguageColor(language) {
    const colors = {
        // Bahasa Pemrograman Populer
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'PHP': '#4F5D95',
        'TypeScript': '#2b7489',
        'C++': '#f34b7d',
        'C#': '#178600',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Rust': '#dea584',
        
        // Framework dan Library
        'Vue': '#41b883',
        'React': '#61dafb',
        'Angular': '#dd1b16',
        'Svelte': '#ff3e00',
        'Next.js': '#000000',
        'Node.js': '#68a063',
        
        // Database
        'SQL': '#e38c00',
        'PostgreSQL': '#336791',
        'MongoDB': '#13aa52',
        'Redis': '#d82c20',
        
        // Markup & Style
        'Markdown': '#083fa1',
        'SCSS': '#c6538c',
        'SASS': '#a53b70',
        'Less': '#1d365d',
        'XML': '#0060ac',
        
        // Shell & Configuration
        'Shell': '#89e051',
        'PowerShell': '#012456',
        'Bash': '#4eaa25',
        'YAML': '#cb171e',
        'Docker': '#384d54',
        'Dockerfile': '#384d54',
        
        // Mobile Development
        'Dart': '#00B4AB',
        'Flutter': '#02569B',
        'React Native': '#61dafb',
        
        // Other Languages
        'R': '#198CE7',
        'Lua': '#000080',
        'Perl': '#0298c3',
        'Haskell': '#5e5086',
        'Elixir': '#6e4a7e',
        'Julia': '#a270ba',
        'Scala': '#c22d40',
        'Groovy': '#4298b8',
        'Assembly': '#6E4C13',
        
        // Web Assembly
        'WebAssembly': '#654ff0',
        
        // Game Development
        'Unity': '#222c37',
        'Unreal Engine': '#313131',
        
        // AI/ML
        'Jupyter Notebook': '#DA5B0B',
        'TensorFlow': '#ff6f00',
        'PyTorch': '#ee4c2c'
    };
    
    return colors[language] || '#858585';
}

// Load repositories when page loads
fetchGitHubRepos(); 