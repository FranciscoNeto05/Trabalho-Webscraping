document.getElementById('webScrapingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const model = document.getElementById('model').value;
    const price = parseFloat(document.getElementById('price').value);
    const range = parseFloat(document.getElementById('range').value);

    if (price < range) {
        alert("O preco não pode ser maior que o intervalo")
        return false;
    }
    sendFormData({name,email,model,price,range})
});

function sendFormData(data) {
    fetch('http://127.0.0.1:3000/notify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(async response => {
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Erro HTTP: ${response.status} ${response.statusText} - ${text}`);
        }
    
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        else {
            const text_1 = await response.text();
            throw new Error(`Resposta não JSON: ${text_1}`);
        }
    })
    .then(data => {
        alert("Formulario enviado com sucesso!")
    })
    .catch((error) => {
        alert(`Falha ao enviar o formulário\nErro: ${error}`)
    })
}