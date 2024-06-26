window.addEventListener("scroll", function () {
    var header = this.document.querySelector('#header')
    header.classList.toggle('rolagem', this.window.scrollY > 0)
})
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a[href^='#']");

    for (const link of links) {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    }
});

function smoothScrollTo(targetElement) {
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    const duration = 1000; // adjust this value to change the scrolling speed
    let startTimestamp = null;

    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const timeElapsed = timestamp - startTimestamp;
        const scrollProgress = Math.min(timeElapsed / duration, 1);
        const easing = easeInOutQuad(scrollProgress);
        window.scrollTo(0, startPosition + distance * easing);

        if (timeElapsed < duration) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Easing function for smooth scrolling
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
document.addEventListener("DOMContentLoaded", function () {
    const carrinhoIcon = document.querySelector('.carrinho a');
    const carrinhoModal = new bootstrap.Modal(document.getElementById('carrinhoModal'));
    const carrinhoItens = document.getElementById('carrinhoItens');
    const badge = document.getElementById('carrinhoBadge');

    // Função para carregar o carrinho do localStorage
    function carregarCarrinho() {
        const carrinhoSalvo = localStorage.getItem('carrinho');
        return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
    }

    // Função para salvar o carrinho no localStorage
    function salvarCarrinho(carrinho) {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    function calcularTotal() {
        let total = 0;
        carrinho.forEach(item => {
            total += parseFloat(item.preco);
        });
        return total.toFixed(2);
    }

    // Inicializa o carrinho a partir do localStorage
    let carrinho = carregarCarrinho();

    function atualizarCarrinho() {
        carrinhoItens.innerHTML = '';
        carrinho.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            li.textContent = `${item.item} - ${item.preco}`;

            const button = document.createElement('button');
            button.classList.add('btn', 'btn-danger', 'btn-sm');
            button.textContent = 'Remover';
            button.onclick = () => {
                removerDoCarrinho(index);
            };

            li.appendChild(button);
            carrinhoItens.appendChild(li);
        });

        badge.textContent = carrinho.length;
        badge.style.display = carrinho.length > 0 ? 'inline-block' : 'none';

        const totalSpan = document.querySelector('.h4:last-child');
        totalSpan.textContent = `$ ${calcularTotal()}`;

        // Salva o estado atual do carrinho no localStorage
        salvarCarrinho(carrinho);
    }

    function adicionarAoCarrinho(item, preco) {
        carrinho.push({ item, preco });
        atualizarCarrinho();
    }

    function removerDoCarrinho(index) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }

    // Adicionar evento para abrir o modal do carrinho
    if (carrinhoIcon) {
        carrinhoIcon.addEventListener('click', function (event) {
            event.preventDefault();
            carrinhoModal.show();
        });
    }

    // Adicionar evento aos botões de adicionar ao carrinho (verificar se existem na página)
    document.querySelectorAll('.btn-carrinho').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const item = this.closest('.section').querySelector('.card-title').textContent;
            const preco = this.closest('.section').querySelector('.preco').textContent;
            adicionarAoCarrinho(item, preco);
        });
    });

    // Carregar o carrinho ao iniciar a página
    atualizarCarrinho();
});

function compraRealizada() {
    // Verifica se o elemento com ID 'comprar' existe na página
    var comprarButton = document.getElementById("comprar");

    // Exibe um alerta de confirmação da compra
    alert("Compra realizada com sucesso!");

    // Redireciona o usuário para a página index.html
    window.location.href = "index.html";
}


// Função para iniciar o contador regressivo
function startCountdown(duration, display) {
    let timer = duration;
    let interval = setInterval(function () {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.querySelector('#minutes').textContent = minutes;
        display.querySelector('#seconds').textContent = seconds;

        if (--timer < 0) {
            clearInterval(interval); // Para o intervalo quando o contador chegar a zero
            alert("O QR Code expirou. Por favor, gere um novo clicando em Finalizar a compra com PIX.");
            location.reload(); // Recarrega a página após o usuário clicar em OK no alerta
        }
    }, 1000);
}

// Tempo inicial em segundos (2 minutos)
let countdownDuration = 2 * 60;

// Seleciona o elemento onde o contador será exibido
let countdownDisplay = document.querySelector('.countdown');

// Inicia o contador
startCountdown(countdownDuration, countdownDisplay);

// passageiros incluir e retirar 
function incrementar() {
    var input = document.getElementById('quantidade');
    var valor = parseInt(input.value);
    input.value = valor + 1;
}

function decrementar() {
    var input = document.getElementById('quantidade');
    var valor = parseInt(input.value);
    if (valor > 1) {
        input.value = valor - 1;
    }
}

