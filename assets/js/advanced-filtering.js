document.addEventListener('DOMContentLoaded', () => {
    const initFiltering = (config) => {
        const {
            containerSelector,
            itemSelector,
            filterSelectors = {},
            searchSelector = null,
            noResultsSelector = '.no-results'
        } = config;

        const container = document.querySelector(containerSelector);
        if (!container) return;

        const items = container.querySelectorAll(itemSelector);
        const filters = {};

        Object.entries(filterSelectors).forEach(([key, selector]) => {
            const element = document.querySelector(selector);
            if (element) {
                filters[key] = element;
            }
        });

        const searchInput = searchSelector ? document.querySelector(searchSelector) : null;
        const noResults = document.querySelector(noResultsSelector);

        const applyFilters = () => {
            const filterValues = {};
            Object.entries(filters).forEach(([key, element]) => {
                filterValues[key] = element.value.toLowerCase();
            });

            const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

            let visibleCount = 0;

            items.forEach(item => {
                let shouldShow = true;

                Object.entries(filterValues).forEach(([key, value]) => {
                    if (value && value !== 'all') {
                        const itemValue = item.dataset[key];
                        if (!itemValue || !itemValue.toLowerCase().includes(value)) {
                            shouldShow = false;
                        }
                    }
                });

                if (searchQuery && shouldShow) {
                    const title = item.querySelector('h3, h2, .project-title, .publication-title')?.textContent.toLowerCase() || '';
                    const description = item.querySelector('p, .description, .project-description, .publication-abstract')?.textContent.toLowerCase() || '';
                    const authors = item.querySelector('.publication-authors, .authors')?.textContent.toLowerCase() || '';
                    const tags = item.querySelector('.publication-tags, .project-tech')?.textContent.toLowerCase() || '';

                    const searchableContent = `${title} ${description} ${authors} ${tags}`;
                    shouldShow = searchableContent.includes(searchQuery);
                }

                if (shouldShow) {
                    item.style.display = '';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                    visibleCount++;
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }

            return visibleCount;
        };

        Object.values(filters).forEach(filter => {
            filter.addEventListener('change', applyFilters);
        });

        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', () => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(applyFilters, 300);
            });

            const clearSearch = document.querySelector('.clear-search');
            if (clearSearch) {
                clearSearch.addEventListener('click', () => {
                    searchInput.value = '';
                    applyFilters();
                    searchInput.focus();
                });
            }
        }

        const resetButton = document.querySelector('.reset-filters');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                Object.values(filters).forEach(filter => {
                    filter.value = '';
                });
                if (searchInput) {
                    searchInput.value = '';
                }
                applyFilters();
            });
        }

        items.forEach(item => {
            item.style.transition = 'opacity 0.3s ease';
        });

        return { applyFilters, filters, searchInput };
    };

    if (document.querySelector('.publications-grid')) {
        initFiltering({
            containerSelector: '.publications-grid',
            itemSelector: '.publication-card',
            filterSelectors: {
                year: '#year-filter',
                category: '#category-filter'
            },
            searchSelector: '#search-input'
        });
    }

    if (document.querySelector('.projects-grid')) {
        initFiltering({
            containerSelector: '.projects-grid',
            itemSelector: '.project-card',
            filterSelectors: {
                tech: '#tech-filter',
                type: '#type-filter'
            },
            searchSelector: '#project-search'
        });
    }

    const sortSelect = document.querySelector('#sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const container = document.querySelector('.publications-grid, .projects-grid');
            if (!container) return;

            const items = Array.from(container.querySelectorAll('.publication-card, .project-card'));
            const sortValue = e.target.value;

            items.sort((a, b) => {
                const aYear = parseInt(a.dataset.year) || 0;
                const bYear = parseInt(b.dataset.year) || 0;

                if (sortValue === 'year-desc') {
                    return bYear - aYear;
                } else if (sortValue === 'year-asc') {
                    return aYear - bYear;
                }
                return 0;
            });

            items.forEach(item => container.appendChild(item));
        });
    }
});