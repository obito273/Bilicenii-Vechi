function mobileMenu() {
    var x = document.getElementsByTagName("navbar")[0];
    if (x.className === "") {
        x.className += "mobile";
    } else {
        x.className = "";
    }
}

// Funcție pentru a schimba imaginile automat (Panoramă/Slideshow)
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    
    // Ascunde toate imaginile
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // Treci la imaginea următoare
    slideIndex++;
    
    // Resetează la prima imagine dacă am ajuns la final
    if (slideIndex > slides.length) {slideIndex = 1}    
    
    // Afișează imaginea curentă
    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";  
    }
    
    // Programează următoarea schimbare peste 3000 de milisecunde (3 secunde)
    setTimeout(showSlides, 3000); 
}

let selectedRating = 0;

// Funcția care colorează stelele când dai click pe ele
function setRating(n) {
    selectedRating = n;
    const stars = document.querySelectorAll(".star");
    
    stars.forEach((star, index) => {
        if (index < n) {
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }
    });
    
    document.getElementById("current-stars").innerText = n;
}

// Funcția care adaugă recenzia
function addReview() {
    const nameInput = document.getElementById("rev-name");
    const textInput = document.getElementById("rev-text");
    const container = document.getElementById("reviews-container");

    if (nameInput.value.trim() === "" || textInput.value.trim() === "" || selectedRating === 0) {
        alert("Te rugăm să completezi numele, mesajul și să alegi un număr de stele!");
        return;
    }

    // Creăm șirul de stele (ex: ★★★☆☆)
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= selectedRating) {
            starsHtml += "★";
        } else {
            starsHtml += "☆";
        }
    }

    const newReview = document.createElement("div");
    newReview.className = "review-card";
    
    newReview.innerHTML = `
        <span class="review-stars">${starsHtml}</span>
        <p>"${textInput.value}"</p>
        <span>- ${nameInput.value}</span>
    `;

    container.appendChild(newReview);

    // Resetăm totul după postare
    nameInput.value = "";
    textInput.value = "";
    setRating(0); // Resetăm stelele la gri
}

// Verificăm la încărcarea paginii dacă utilizatorul a votat deja
window.onload = function() {
    if (localStorage.getItem("a_votat") === "true") {
        blocheazaFormularul();
    }
    // Dacă ai și alte funcții care pornesc la încărcare (ex: data curentă), pune-le aici
    if (typeof afiseazaAnul === "function") afiseazaAnul();
};

function addReview() {
    // Verificăm din nou (siguranță)
    if (localStorage.getItem("a_votat") === "true") {
        alert("Ai trimis deja o recenzie! Mulțumim pentru feedback.");
        return;
    }

    const nameInput = document.getElementById("rev-name");
    const textInput = document.getElementById("rev-text");
    const container = document.getElementById("reviews-container");

    if (nameInput.value.trim() === "" || textInput.value.trim() === "" || selectedRating === 0) {
        alert("Te rugăm să completezi toate câmpurile!");
        return;
    }

    // Crearea și afișarea recenziei (codul tău anterior)
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
        starsHtml += (i <= selectedRating) ? "★" : "☆";
    }

    const newReview = document.createElement("div");
    newReview.className = "review-card";
    newReview.innerHTML = `
        <span class="review-stars">${starsHtml}</span>
        <p>"${textInput.value}"</p>
        <span>- ${nameInput.value}</span>
    `;
    container.appendChild(newReview);

    // --- LOGICA DE BLOCARE ---
    // Salvăm în browser faptul că acest utilizator a trimis o recenzie
    localStorage.setItem("a_votat", "true");
    
    // Blocăm formularul imediat
    blocheazaFormularul();
    alert("Recenzia ta a fost postată! Nu mai poți adăuga altele.");
}

function blocheazaFormularul() {
    const zonaAdaugare = document.querySelector(".add-review");
    if (zonaAdaugare) {
        zonaAdaugare.innerHTML = `
            <div style="padding: 20px; color: #2c3e50; background: #ecf0f1; border-radius: 10px; text-align: center;">
                <h3>Mulțumim!</h3>
                <p>Ai trimis deja o recenzie de pe acest dispozitiv.</p>
            </div>
        `;
    }
}