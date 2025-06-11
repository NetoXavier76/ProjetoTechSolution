
const btnTopo = document.getElementById("btnTopo");

window.onscroll = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
};

btnTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];


document.addEventListener("DOMContentLoaded", () => {
    const botoesCarrinho = document.querySelectorAll('.btn-carrinho');

    botoesCarrinho.forEach(botao => {
        botao.addEventListener('click', function (evento) {
            evento.preventDefault();

            const id = botao.getAttribute('data-id');
            const nome = botao.getAttribute('data-nome');
            const preco = parseFloat(botao.getAttribute('data-preco'));

            if (!id || !nome || isNaN(preco)) {
                alert("Erro ao adicionar o produto. Verifique os dados.");
                return;
            }

            const produtoExistente = carrinho.find(item => item.id === id);

            if (produtoExistente) {
                produtoExistente.quantidade += 1;
            } else {
                carrinho.push({
                    id,
                    nome,
                    preco,
                    quantidade: 1
                });
            }

            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            alert(`${nome} foi adicionado ao carrinho.`);
        });
    });


    if (document.getElementById("cart-container")) {
        renderizarCarrinho();
    }
});


function renderizarCarrinho() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    if (carrinho.length > 0) {
        carrinho.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");

            itemDiv.innerHTML = `
                <h3>${item.nome}</h3>
                <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                <p>Quantidade: ${item.quantidade}</p>
                <p>Total: R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
                <button class="remover" data-id="${item.id}">Remover</button>
            `;

            cartContainer.appendChild(itemDiv);
        });

        const totalPrice = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
        document.getElementById("total-price").textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
    } else {
        cartContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
        document.getElementById("total-price").textContent = "";
    }


    const removerButtons = document.querySelectorAll('.remover');
    removerButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = button.getAttribute('data-id');
            carrinho = carrinho.filter(item => item.id !== id);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderizarCarrinho();
        });
    });
}
