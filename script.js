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
document.addEventListener('DOMContentLoaded', function () {
    const carrinho = [];
    const carrinhoIcon = document.querySelector('.carrinho a');
    const carrinhoModal = new bootstrap.Modal(document.getElementById('carrinhoModal'));
    const carrinhoItens = document.getElementById('carrinhoItens');
    const badge = document.getElementById('carrinhoBadge');

    function atualizarCarrinho() {
        carrinhoItens.innerHTML = '';
        carrinho.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            // Aqui você pode ajustar para exibir o item e o preço corretamente
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
    carrinhoIcon.addEventListener('click', function (event) {
        event.preventDefault();
        carrinhoModal.show();
    });

    // Verificação: Verifique se os botões estão sendo selecionados corretamente
    console.log(document.querySelectorAll('.btn-carrinho'));

    // Exemplo de como adicionar itens ao carrinho (você deve substituir isso pela lógica real de adicionar produtos)
    document.querySelectorAll('.btn-carrinho').forEach(button => {
        console.log(button); // Verifique se o botão está sendo selecionado corretamente
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const item = this.closest('.section').querySelector('.card-title').textContent;
            const preco = this.closest('.section').querySelector('.preco').textContent;
            console.log(item); // Verifique se o título do produto está sendo capturado corretamente
            console.log(preco); // Verifique se o preço do produto está sendo capturado corretamente
            adicionarAoCarrinho(item, preco);
        });
    });
});

