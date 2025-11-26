function initPublicationCards() {
    const readMoreLinks = document.querySelectorAll('.read-more');

    readMoreLinks.forEach(link => {
        link.addEventListener('click', function() {
            const abstract = this.previousElementSibling;

            if (abstract.classList.contains('expanded')) {
                abstract.classList.remove('expanded');
                this.textContent = 'Read more →';
            } else {
                abstract.classList.add('expanded');
                this.textContent = 'Read less ←';
            }
        });
    });
}

function filterPublications(filterType, filterValue) {
    const cards = document.querySelectorAll('.publication-card');

    cards.forEach(card => {
        const cardValue = card.getAttribute(`data-${filterType}`);

        if (!filterValue || filterValue === 'all') {
            card.style.display = 'block';
            return;
        }

        if (filterType === 'category') {
            const categories = cardValue.split(',');
            if (categories.includes(filterValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        } else if (filterType === 'year') {
            if (cardValue === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

function sortPublications(sortBy) {
    const grid = document.querySelector('.publications-grid');
    const cards = Array.from(document.querySelectorAll('.publication-card'));

    cards.sort((a, b) => {
        if (sortBy === 'year-desc') {
            return parseInt(b.getAttribute('data-year')) - parseInt(a.getAttribute('data-year'));
        } else if (sortBy === 'year-asc') {
            return parseInt(a.getAttribute('data-year')) - parseInt(b.getAttribute('data-year'));
        }
        return 0;
    });

    cards.forEach(card => grid.appendChild(card));
}

document.addEventListener('DOMContentLoaded', initPublicationCards);
