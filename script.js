document.getElementById('consultarBtn').addEventListener('click', () => {
    const ddd = document.getElementById('dddInput').value.trim();
    if (!ddd || isNaN(ddd)) {
        alert("Por favor, insira um DDD válido.");
        return;
    }

    const url = `https://brasilapi.com.br/api/ddd/v1/${ddd}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na consulta. DDD pode não existir.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            if (data && data.state) {
                document.getElementById('resultado').innerHTML = `
                    <p><strong>DDD:</strong> ${ddd}</p>
                    <p><strong>Cidades:</strong> ${data.cities.join(', ') || 'Não disponível'}</p>
                    <p><strong>Estado:</strong> ${data.state || 'Não disponível'}</p>
                `;
            } else {
                document.getElementById('resultado').innerHTML = `
                    <p>Não foram encontrados dados para o DDD informado.</p>
                `;
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('resultado').innerHTML = `
                <p>Ocorreu um erro ao consultar o DDD. Tente novamente mais tarde.</p>
            `;
        });
});