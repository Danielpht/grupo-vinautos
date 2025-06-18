// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Scroll Animation
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// Counter Animation
const stats = document.querySelectorAll('.stat-number');

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Adjust speed here
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 40);
}

function checkCounter() {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const elementTop = stat.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            animateCounter(stat, target);
            stat.classList.add('counted');
        }
    });
}

window.addEventListener('scroll', () => {
    stats.forEach(stat => {
        if (!stat.classList.contains('counted')) {
            checkCounter();
        }
    });
});

// VIN Search Functionality
const vinInput = document.getElementById('vin-input');
const buscarVin = document.getElementById('buscar-vin');
const resultadoVin = document.getElementById('resultado-vin');

async function searchVIN(vin) {
    try {
        const response = await fetch('vehiculos.json');
        const data = await response.json();
        
        const vehiculo = data.find(v => v.vin === vin.toUpperCase());
        
        if (vehiculo) {
            resultadoVin.innerHTML = `
                <h3>Información del Vehículo</h3>
                <div class="vin-details">
                    <p><strong>Marca:</strong> ${vehiculo.marca}</p>
                    <p><strong>Modelo:</strong> ${vehiculo.modelo}</p>
                    <p><strong>Año:</strong> ${vehiculo.año}</p>
                    <p><strong>Color:</strong> ${vehiculo.color}</p>
                    <p><strong>Número de Motor:</strong> ${vehiculo.numero_motor}</p>
                    <p><strong>Observaciones:</strong> ${vehiculo.observaciones}</p>
                </div>
            `;
            resultadoVin.style.display = 'block';
        } else {
            resultadoVin.innerHTML = `
                <div class="error-message">
                    <p>No se encontró información para el VIN proporcionado.</p>
                    <p>Por favor, verifique el número e intente nuevamente.</p>
                </div>
            `;
            resultadoVin.style.display = 'block';
        }
    } catch (error) {
        console.error('Error al buscar el VIN:', error);
        resultadoVin.innerHTML = `
            <div class="error-message">
                <p>Error al procesar la solicitud.</p>
                <p>Por favor, intente nuevamente más tarde.</p>
            </div>
        `;
        resultadoVin.style.display = 'block';
    }
}

buscarVin.addEventListener('click', () => {
    const vin = vinInput.value.trim();
    if (vin) {
        searchVIN(vin);
    } else {
        resultadoVin.innerHTML = `
            <div class="error-message">
                <p>Por favor, ingrese un número VIN válido.</p>
            </div>
        `;
        resultadoVin.style.display = 'block';
    }
});

vinInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarVin.click();
    }
});

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav a[href*=${sectionId}]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav a[href*=${sectionId}]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink); 