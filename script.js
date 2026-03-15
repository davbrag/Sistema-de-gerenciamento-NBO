// Dados simulados para a tabela
const membros = [
    { nome: "Ricardo Santos", id: "#1024", status: "Ativo",pontuação:300 },
    { nome: "Ana Oliveira", id: "#1025", status: "Ativo",pontuação:250 },
    { nome: "Carlos Lima", id: "#1026", status: "Ativo",pontuação:200 },
    { nome: "Juliana Costa", id: "#1027",status: "Ativo",pontuação:150 }
];

// Função para carregar membros na tabela
function renderTable() {
    const tableBody = document.getElementById('members-table');
    
    tableBody.innerHTML = membros.map(m => `
        <tr>
            <td><strong>${m.nome}</strong></td>
            <td>${m.id}</td>
            <td>${m.plano}</td>
            <td><span class="status-badge active-status">${m.status}</span></td>
            <td><button style="border:none; background:none; cursor:pointer;"><i class="fas fa-ellipsis-v"></i></button></td>
        </tr>
    `).join('');
}

// Saudação dinâmica baseada na hora
function setGreeting() {
    const hour = new Date().getHours();
    const msgElement = document.getElementById('welcome-msg');
    let greeting = "";

    if (hour < 12) greeting = "Bom dia, Davi";
    else if (hour < 18) greeting = "Boa tarde, Davi";
    else greeting = "Boa noite, Davi";

    msgElement.innerText = greeting;
}

// Inicialização
window.onload = () => {
    renderTable();
    setGreeting();
};