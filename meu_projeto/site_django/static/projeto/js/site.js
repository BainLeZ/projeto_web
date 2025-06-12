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

    const selectMessage = document.getElementById('select-message');
    const gameContent = document.getElementById('game-content');

    let selectedGameId = null;

    function showGameContent() {
        selectMessage.style.display = 'none';
        gameContent.style.display = 'block';
    }

    function aplicarBlurSuave(imgElement, newSrc) {
        imgElement.style.transition = 'none';
        imgElement.style.filter = 'blur(8px)';
        imgElement.style.opacity = '0.7';

        requestAnimationFrame(() => {
            imgElement.src = newSrc;

            setTimeout(() => {
                imgElement.style.transition = 'filter 0.4s ease, opacity 0.4s ease';
                imgElement.style.filter = 'blur(0)';
                imgElement.style.opacity = '1';
            }, 100);
        });
    }

    function selecionarJogo(icon) {
        if (!icon) return;

        showGameContent();

        gameBanner.style.transition = 'none';
        gameBanner.style.filter = 'blur(8px)';
        gameBanner.style.opacity = '0.7';

        requestAnimationFrame(() => {
            gameBanner.style.backgroundImage = `url('${icon.dataset.banner}')`;

            setTimeout(() => {
                gameBanner.style.transition = 'filter 0.4s ease, opacity 0.4s ease';
                gameBanner.style.filter = 'blur(0)';
                gameBanner.style.opacity = '1';
            }, 100);
        });

        gameName.textContent = icon.dataset.name;
        gameDescription.textContent = icon.dataset.description;
        lastSession.textContent = icon.dataset.last;
        gameTime.textContent = icon.dataset.time;
        achievements.textContent = icon.dataset.achievements;

        aplicarBlurSuave(extraImg1, icon.dataset.img1);
        aplicarBlurSuave(extraImg2, icon.dataset.img2);
        aplicarBlurSuave(extraImg3, icon.dataset.img3);

        selectedGameId = icon.dataset.id;
    }

    gameIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            selecionarJogo(icon);
        });
    });

    const gameNames = document.querySelectorAll('.game-name');
    gameNames.forEach(name => {
        name.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentItem = name.closest('.game-item');
            const icon = parentItem.querySelector('.game-icon');
            selecionarJogo(icon);
        });
    });

    const gameItems = document.querySelectorAll('.game-item');
    gameItems.forEach(item => {
        item.addEventListener('click', () => {
            const icon = item.querySelector('.game-icon');
            if (icon) {
                selecionarJogo(icon);
            }
        });
    });

    playButton.addEventListener('click', () => {
        if (selectedGameId) {
            alert(`Você está jogando ${gameName.textContent}`);
        } else {
            alert("Por favor, selecione um jogo primeiro.");
        }
    });

    moreInfoButton.addEventListener('click', () => {
        if (selectedGameId) {
            window.location.href = `/jogo/${selectedGameId}/`;
        } else {
            alert("Por favor, selecione um jogo primeiro.");
        }
    });

    const searchInput = document.getElementById("search-bar");
    const allGameItems = document.querySelectorAll(".game-item");

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        let foundMatch = false;

        allGameItems.forEach(item => {
            const name = item.querySelector(".game-name").textContent.toLowerCase();
            if (name.includes(query)) {
                item.style.display = "flex";
                foundMatch = true;
            } else {
                item.style.display = "none";
            }
        });

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

    // Modal de imagem
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
            imagesArray = [extraImg1.src, extraImg2.src, extraImg3.src];
            currentIndex = index;
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

    // 🚀 Navegação por teclado
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') {
            if (event.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
                modalImg.src = imagesArray[currentIndex];
            } else if (event.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % imagesArray.length;
                modalImg.src = imagesArray[currentIndex];
            } else if (event.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
});