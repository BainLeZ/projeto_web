document.addEventListener('DOMContentLoaded', () => {
    const gameIcons = document.querySelectorAll('.game-icon');
    const gameBanner = document.getElementById('game-banner');
    const gameName = document.getElementById('game-name');
    const gameDescription = document.getElementById('game-description');
    const lastSession = document.getElementById('last-session');
    const gameTime = document.getElementById('game-time');
    const achievements = document.getElementById('achievements');
    const playButton = document.getElementById('play-button');
    const moreInfoButton = document.getElementById('more-info-button');
    const extraImg1 = document.getElementById('game-image-1');
    const extraImg2 = document.getElementById('game-image-2');
    const extraImg3 = document.getElementById('game-image-3');

    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');

    let selectedGameId = null;

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = '/login/';
        });
    }

    if (registerButton) {
        registerButton.addEventListener('click', () => {
            window.location.href = '/register/';
        });
    }

    function selecionarJogo(icon) {
        gameBanner.style.backgroundImage = `url('${icon.dataset.banner}')`;
        gameName.textContent = icon.dataset.name;
        gameDescription.textContent = icon.dataset.description;
        lastSession.textContent = icon.dataset.last;
        gameTime.textContent = icon.dataset.time;
        achievements.textContent = icon.dataset.achievements;
        extraImg1.src = icon.dataset.img1;
        extraImg2.src = icon.dataset.img2;
        extraImg3.src = icon.dataset.img3;
        selectedGameId = icon.dataset.id;
    }

    gameIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            selecionarJogo(icon);
        });
    });

    // NOVO: Clique no nome do jogo
    const gameNames = document.querySelectorAll('.game-name');
    gameNames.forEach(name => {
        name.addEventListener('click', () => {
            const parentItem = name.closest('.game-item');
            const icon = parentItem.querySelector('.game-icon');
            selecionarJogo(icon);
        });
    });

    playButton.addEventListener('click', () => {
        alert(`Você está jogando ${gameName.textContent}`);
    });

    moreInfoButton.addEventListener('click', () => {
        if (selectedGameId) {
            const url = `/jogo/${selectedGameId}/`;
            window.location.href = url;
        } else {
            alert("Por favor, selecione um jogo primeiro.");
        }
    });

    // Seleciona automaticamente o primeiro jogo ao carregar a página
    if (gameIcons.length > 0) {
        gameIcons[0].click(); // Clique no primeiro jogo da lista automaticamente
    }

    // --------------------------
    // Filtro de busca por nome
    // --------------------------
    const searchInput = document.getElementById("search-bar");
    const gameItems = document.querySelectorAll(".game-item");

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        let foundMatch = false;

        gameItems.forEach(item => {
            const gameName = item.querySelector(".game-name").textContent.toLowerCase();

            if (gameName.includes(query)) {
                item.style.display = "flex"; // Ou "block", dependendo do seu CSS
                foundMatch = true;
            } else {
                item.style.display = "none";
            }
        });

        // Mensagem se nenhum jogo for encontrado
        const noResultMessageId = "no-results-message";
        let existingMessage = document.getElementById(noResultMessageId);

        if (!foundMatch) {
            if (!existingMessage) {
                const message = document.createElement("p");
                message.id = noResultMessageId;
                message.textContent = "Nenhum jogo encontrado.";
                message.style.color = "gray";
                message.style.textAlign = "center";
                message.style.marginTop = "10px";
                document.querySelector(".games").appendChild(message);
            }
        } else {
            if (existingMessage) {
                existingMessage.remove();
            }
        }
    });

    // Funcionalidade para ampliar a imagem
    const images = document.querySelectorAll('.game-image');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalImg = document.createElement('img');
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-btn');
    closeBtn.textContent = '×';
    const prevBtn = document.createElement('span');
    prevBtn.classList.add('prev-btn');
    prevBtn.textContent = '←';
    const nextBtn = document.createElement('span');
    nextBtn.classList.add('next-btn');
    nextBtn.textContent = '→';

    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    modal.appendChild(prevBtn);
    modal.appendChild(nextBtn);
    document.body.appendChild(modal);

    let currentIndex = 0;
    let imagesArray = [];

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = image.src;
            imagesArray = [extraImg1.src, extraImg2.src, extraImg3.src]; // Imagens extras
            currentIndex = index; // Atualiza o índice da imagem clicada
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
        modalImg.src = imagesArray[currentIndex];
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imagesArray.length;
        modalImg.src = imagesArray[currentIndex];
    });

    // --------------------------
    // Estilos da modal de ampliação
    // --------------------------
    const style = document.createElement('style');
    style.innerHTML = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.7);
            display: none;
            justify-content: center;
            align-items: center;
        }
        .modal img {
            max-width: 80%;
            max-height: 80%;
            object-fit: contain;
        }
        .close-btn, .prev-btn, .next-btn {
            position: absolute;
            top: 20px;
            font-size: 2em;
            color: white;
            cursor: pointer;
            z-index: 10;
        }
        .close-btn {
            right: 20px;
        }
        .prev-btn {
            left: 20px;
        }
        .next-btn {
            right: 60px;
        }
    `;
    document.head.appendChild(style);
});
