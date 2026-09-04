const API_URL = "http://localhost:3000";

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];
let usuario = localStorage.getItem("usuario");

if (produtos.length == 0) {
    produtos = [
        {
            id: 1,
            nome: "MDF Branco",
            descricao: "Chapa MDF branca",
            estoque: 30,
            minimo: 10
        },
        {
            id: 2,
            nome: "MDF Carvalho",
            descricao: "Chapa MDF padrão carvalho",
            estoque: 20,
            minimo: 8
        },
        {
            id: 3,
            nome: "MDF Preto",
            descricao: "Chapa MDF preta",
            estoque: 15,
            minimo: 5
        }
    ];

    localStorage.setItem("produtos", JSON.stringify(produtos));
}

const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const systemPage = document.getElementById("systemPage");
const loginMensagem = document.getElementById("loginMensagem");
const productModal = document.getElementById("productModal");
const productForm = document.getElementById("productForm");
const movementForm = document.getElementById("movementForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;

        if (email == "" || senha == "") {
            loginMensagem.textContent = "Preencha o e-mail e a senha.";
            return;
        }

        if (email == "admin@jit.com" && senha == "123456") {
            localStorage.setItem("usuario", email);
            usuario = email;

            loginPage.classList.add("hidden");
            systemPage.classList.remove("hidden");

            document.getElementById("userName").textContent = usuario;
            atualizarTudo();
    
            } else {
            loginMensagem.textContent = "E-mail ou senha incorretos.";
        }
    });
}

    if (usuario) {
    loginPage.classList.add("hidden");
    systemPage.classList.remove("hidden");

    document.getElementById("userName").textContent = usuario;
    atualizarTudo();
}

document.getElementById("logoutButton").addEventListener("click", function() {
    localStorage.removeItem("usuario");
    usuario = null;

    systemPage.classList.add("hidden");
    loginPage.classList.remove("hidden");

    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    loginMensagem.textContent = "";
});

let botoes = document.querySelectorAll(".side-button");
let paginas = document.querySelectorAll(".page");

botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {

        paginas.forEach(function(pagina) {
            pagina.classList.add("hidden");
        });

        let pagina = document.getElementById(botao.getAttribute("data-page"));

        if (pagina) {
            pagina.classList.remove("hidden");
        }

        botoes.forEach(function(item) {
            item.classList.remove("active");
        });

        botao.classList.add("active");

        atualizarTudo();
    });
});

document.getElementById("newProductButton").addEventListener("click", function() {
    document.getElementById("modalTitle").textContent = "Novo produto";

    document.getElementById("productId").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("productStock").value = "";
    document.getElementById("productMinimum").value = "";

    productModal.classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", function() {
    productModal.classList.add("hidden");
});

document.getElementById("cancelProduct").addEventListener("click", function() {
    productModal.classList.add("hidden");
});

productModal.addEventListener("click", function(event) {
    if (event.target == productModal) {
        productModal.classList.add("hidden");
    }
});

productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let id = document.getElementById("productId").value;
    let nome = document.getElementById("productName").value.trim();
    let descricao = document.getElementById("productDescription").value.trim();
    let estoque = Number(document.getElementById("productStock").value);
    let minimo = Number(document.getElementById("productMinimum").value);

    if (nome == "") {
        alert("Informe o nome do produto.");
        return;
    }

    if (descricao == "") {
        alert("Informe a descrição do produto.");
        return;
    }

    if (document.getElementById("productStock").value == "" || estoque < 0) {
        alert("Informe um estoque válido.");
        return;
    }

    if (document.getElementById("productMinimum").value == "" || minimo < 0) {
        alert("Informe um estoque mínimo válido.");
        return;
    }

    if (id == "") {
        produtos.push({
            id: Date.now(),
            nome: nome,
            descricao: descricao,
            estoque: estoque,
            minimo: minimo
        });

        alert("Produto cadastrado com sucesso.");
    } else {
        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id == Number(id)) {
                produtos[i].nome = nome;
                produtos[i].descricao = descricao;
                produtos[i].estoque = estoque;
                produtos[i].minimo = minimo;

                alert("Produto alterado com sucesso.");
                break;
            }
        }
    }

    localStorage.setItem("produtos", JSON.stringify(produtos));
    productModal.classList.add("hidden");
    atualizarTudo();
});

function listarProdutos() {
    let tabela = document.getElementById("productsTable");
    let pesquisa = document.getElementById("searchProduct").value.toLowerCase();
    tabela.innerHTML = "";

    let encontrados = [];

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].nome.toLowerCase().includes(pesquisa)) {
            encontrados.push(produtos[i]);
        }
    }

    if (encontrados.length == 0) {
        tabela.innerHTML = "<tr><td colspan='5'>Nenhum produto encontrado.</td></tr>";
        return;
    }

    for (let i = 0; i < encontrados.length; i++) {
        let produto = encontrados[i];
        let classe = "";

        if (produto.estoque <= produto.minimo) {
            classe = "stock-low";
        }

        tabela.innerHTML += `
            <tr>
                <td><strong>${produto.nome}</strong></td>
                <td>${produto.descricao}</td>
                <td class="${classe}">${produto.estoque}</td>
                <td>${produto.minimo}</td>
                <td>
                    <button class="edit-button" onclick="editarProduto(${produto.id})">Editar</button>
                    <button class="delete-button" onclick="excluirProduto(${produto.id})">Excluir</button>
                </td>
            </tr>
        `;
    }
}

document.getElementById("searchProduct").addEventListener("input", function() {
    listarProdutos();
});

function editarProduto(id) {
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id == id) {
            document.getElementById("modalTitle").textContent = "Editar produto";
            document.getElementById("productId").value = produtos[i].id;
            document.getElementById("productName").value = produtos[i].nome;
            document.getElementById("productDescription").value = produtos[i].descricao;
            document.getElementById("productStock").value = produtos[i].estoque;
            document.getElementById("productMinimum").value = produtos[i].minimo;

            productModal.classList.remove("hidden");
            break;
        }
    }
}

function excluirProduto(id) {
    let nome = "";
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id == id) {
            nome = produtos[i].nome;
            break;
        }
    }

    if (confirm("Deseja realmente excluir o produto " + nome + "?")) {
        let novaLista = [];
        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id != id) {
                novaLista.push(produtos[i]);
            }
        }

        produtos = novaLista;
        localStorage.setItem("produtos", JSON.stringify(produtos));
        atualizarTudo();
    }
}

function ordenarProdutos(lista) {
    let copia = lista.slice();
    for (let i = 0; i < copia.length; i++) {
        for (let j = 0; j < copia.length - 1; j++) {

            if (copia[j].nome.toLowerCase() > copia[j + 1].nome.toLowerCase()) {
                let aux = copia[j];
                copia[j] = copia[j + 1];
                copia[j + 1] = aux;
            }
        }
    }

    return copia;
}

function listarProdutosProducao() {
    let select = document.getElementById("movementProduct");
    let area = document.getElementById("productionProducts");
    select.innerHTML = "<option value=''>Selecione um produto</option>";
    area.innerHTML = "";

    let lista = ordenarProdutos(produtos);

    for (let i = 0; i < lista.length; i++) {
        let produto = lista[i];

        select.innerHTML += `
            <option value="${produto.id}">${produto.nome}</option>
        `;

        let classe = "stock-item";

        if (produto.estoque <= produto.minimo) {
            classe += " stock-low";
        }

        area.innerHTML += `
            <div class="${classe}">
                <strong>${produto.nome}</strong>
                <span>Estoque atual: ${produto.estoque}</span>
            </div>
        `;
    }
}

movementForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let produtoId = Number(document.getElementById("movementProduct").value);
    let tipo = document.getElementById("movementType").value;
    let quantidade = Number(document.getElementById("movementQuantity").value);
    let data = document.getElementById("movementDate").value;

    if (!produtoId) {
        alert("Selecione um produto.");
        return;
    }

    if (tipo == "") {
        alert("Selecione o tipo da movimentação.");
        return;
    }

    if (quantidade <= 0) {
        alert("Informe uma quantidade válida.");
        return;
    }

    if (data == "") {
        alert("Informe a data.");
        return;
    }

    let produto;

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id == produtoId) {
            produto = produtos[i];
            break;
        }
    }

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    if (tipo == "pedido") {

        if (quantidade > produto.estoque) {
            alert("Não é possível realizar o pedido. A quantidade é maior que o estoque disponível.");
            return;
        }

        produto.estoque -= quantidade;

        if (produto.estoque <= produto.minimo) {
            alert("Atenção! O estoque de " + produto.nome + " está abaixo ou igual ao mínimo.");
        }
    }

    if (tipo == "fabricado") {
        produto.estoque += quantidade;
    }

    movimentacoes.push({
        id: Date.now(),
        produtoId: produto.id,
        produto: produto.nome,
        tipo: tipo,
        quantidade: quantidade,
        data: data
    });

    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));

    movementForm.reset();

    alert("Movimentação registrada com sucesso.");

    atualizarTudo();
});

function listarMovimentacoes() {
    let tabela = document.getElementById("movementsTable");

    tabela.innerHTML = "";

    if (movimentacoes.length == 0) {
        tabela.innerHTML = "<tr><td colspan='4'>Nenhuma movimentação registrada.</td></tr>";
        return;
    }

    for (let i = movimentacoes.length - 1; i >= 0; i--) {
        let movimento = movimentacoes[i];

        let data = movimento.data.split("-").reverse().join("/");
        let tipo = movimento.tipo == "fabricado" ? "Fabricado" : "Pedido";
        let classe = movimento.tipo == "fabricado"
            ? "badge badge-fabricado"
            : "badge badge-pedido";

        tabela.innerHTML += `
            <tr>
                <td>${data}</td>
                <td><strong>${movimento.produto}</strong></td>
                <td><span class="${classe}">${tipo}</span></td>
                <td>${movimento.quantidade}</td>
            </tr>
        `;
    }
}

function atualizarDashboard() {
    document.getElementById("totalProducts").textContent = produtos.length;

    let baixo = 0;

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].estoque <= produtos[i].minimo) {
            baixo++;
        }
    }

    document.getElementById("lowStock").textContent = baixo;
    document.getElementById("totalMovements").textContent = movimentacoes.length;
}

function atualizarTudo() {
    listarProdutos();
    listarProdutosProducao();
    listarMovimentacoes();
    atualizarDashboard();
}

