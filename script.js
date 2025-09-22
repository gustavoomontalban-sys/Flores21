// Array global para almacenar posiciones activas
const existingPositions = [];

function createFlower() {
  const flowerContainer = document.querySelector(".flower-container");

  // Número máximo de flores en pantalla
  const maxFlowersOnScreen = 15;
  if (document.querySelectorAll(".flower").length >= maxFlowersOnScreen) return;

  // Cantidad de flores a crear en esta tanda (entre 1 y 5)
  const maxFlowers = Math.ceil(Math.random() * 5);
  const flowerSize = 100; // tamaño de flor
  const minDistance = 120; // distancia mínima entre flores

  for (let j = 0; j < maxFlowers; j++) {
    let positionValid = false;
    let randomX, randomY;

    // Generar posición válida que no se superponga
    while (!positionValid) {
      randomX = Math.random() * (window.innerWidth - flowerSize);
      randomY = Math.random() * (window.innerHeight - flowerSize);
      positionValid = true;

      for (const pos of existingPositions) {
        const distance = Math.hypot(pos.x - randomX, pos.y - randomY);
        if (distance < minDistance) {
          positionValid = false;
          break;
        }
      }
    }

    // Guardar posición
    existingPositions.push({ x: randomX, y: randomY });

    // Crear flor
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.style.left = `${randomX}px`;
    flower.style.top = `${randomY}px`;
    flower.style.position = "fixed";
    flower.style.animation = "fadeInFlower 0.8s ease-in-out both";

    // Crear pétalos
    for (let i = 0; i < 10; i++) {
      const petal = document.createElement("div");
      petal.classList.add("petal");
      petal.style.transform = `translate(-50%, -50%) rotate(${i * 36}deg)`;
      petal.style.animationDelay = `${i * 0.1}s`;
      flower.appendChild(petal);
    }

    // Crear centro
    const center = document.createElement("div");
    center.classList.add("center");
    flower.appendChild(center);

    flowerContainer.appendChild(flower);

    // Tiempo de vida de la flor (2–5s)
    const lifespan = Math.random() * 3000 + 2000;

    setTimeout(() => {
      flower.remove();
      const index = existingPositions.findIndex(pos => pos.x === randomX && pos.y === randomY);
      if (index !== -1) existingPositions.splice(index, 1);
    }, lifespan);
  }
}

// Crear flores cada 3 segundos
setInterval(createFlower, 3000);
