// JavaScript Section
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const menuBtn = document.querySelector('.menu-btn');
    const fab = document.getElementById('fab');
    const addModal = document.getElementById('addModal');
    const closeModal = document.getElementById('closeModal');
    const typeBtns = document.querySelectorAll('.type-btn');
    const toggleMenu = document.querySelector('.toggle-menu');
    const submitButton = document.querySelector('.btn-primary');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
    })

    // Toggle Mobile Menu
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        toggleMenu.classList.toggle('hidden');
        if (!toggleMenu.classList.contains('hidden')){
            fab.classList.toggle('hidden');
        } else {
            fab.classList.remove('hidden');
        }
    });

    // Show Add Transaction Modal
    fab.addEventListener('click', () => {
        addModal.style.display = 'flex';
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        addModal.style.display = 'none';
    });

    // Handle Type Selection
    typeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            typeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (e.target.classList.contains('income-selector')){
                submitButton.textContent = `Add income`;
                submitButton.style.color = '#ffffff'
                submitButton.style.backgroundColor = '#4caf50'
            } else if (e.target.classList.contains('expense-selector')){
                submitButton.textContent = `Add expense`;
                submitButton.style.color = '#ffffff'
                submitButton.style.backgroundColor = '#d84f4f'
            } else{
                submitButton.textContent = `Add Saving`;
                submitButton.style.color = '#ffffff'
                submitButton.style.backgroundColor = '#6e00b8'
            }
        });
    });
    // Close Modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === addModal) {
            addModal.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const tutorialModal = document.getElementById('tutorial-modal');
    const title = document.getElementById('tutorial-step-title');
    const description = document.getElementById('tutorial-step-description');
    const continueButton = document.getElementById('continue-button');

    const tutorialSteps = [
        {
            title: 'Welcome to PurpleTrack',
            description: "Your website to manage your money, let's get started!",
            highlight: null
        },
        {
            title: 'Your Income',
            description: 'Here you can see your income.',
            highlight: 'income-box'
        },
        {
            title: 'Your Expenses',
            description: 'Here you can see your expenses.',
            highlight: 'expense-box'
        },
        {
            title: 'Your Savings',
            description: 'Here you can see your savings and the total.',
            highlight: 'total-box'
        },
        {
            title: 'Filled transactions',
            description: 'The information you fill out will be displayed here.',
            highlight: 'transactionsList'
        },
        {
            title: 'Add Transactions',
            description: 'Press the + to add your transactions.',
            highlight: 'fab'
        }
    ];

    let currentStep = 0;

    function showStep(step) {
        if (step.highlight) {
            const highlightedElement = document.getElementById(step.highlight);
            if (highlightedElement && highlightedElement.classList.contains('fab')) {
                highlightedElement.classList.add('highlight');
                highlightedElement.classList.add('increased');
            } else if (highlightedElement){
                highlightedElement.classList.add('highlight');
            }
        }

        title.innerText = step.title;
        description.innerText = step.description;
        tutorialModal.classList.remove('hidden');
    }

    continueButton.addEventListener('click', () => {
        if (currentStep < tutorialSteps.length) {
            if (tutorialSteps[currentStep].highlight) {
                const highlightedElement = document.getElementById(tutorialSteps[currentStep].highlight);
                if (highlightedElement) {
                    highlightedElement.classList.remove('highlight');
                    highlightedElement.classList.remove('increased');
                }
            }
            currentStep++;
            if (currentStep < tutorialSteps.length) {
                showStep(tutorialSteps[currentStep]);
            } else {
                tutorialModal.classList.add('hidden');
                localStorage.setItem('tutorial', 'completed')
            }
        }
    });
    // Mostrar el primer paso del tutorial al cargar la página
    if (!localStorage.getItem('tutorial')) {
        showStep(tutorialSteps[currentStep]);
    } else {
        tutorialModal.classList.add('hidden');
    }
});