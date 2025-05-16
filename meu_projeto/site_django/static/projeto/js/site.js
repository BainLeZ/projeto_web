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
        gameIcons[0].click();
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
});
