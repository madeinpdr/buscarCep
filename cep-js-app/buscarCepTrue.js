// codigo funcionando com API, basta usar esse comando: (node buscarCepFetch.js 01001000) 

// ==> (const url = https://viacep.com.br/ws/${cepClean}/json/)

// SEM ESSE CODIGO MUDADO ELE VAI DAR ERRO POR NÃO SER UMA PAGE REAL, MAS RETORNAR (ERRO 404)!!!!!!

// ==> CODIGO ABAIXO FUNCIONANDO <==

const { argv } = require('process');

function normalizeCep(raw) {
  return ('' + raw).replace(/\D/g, '');
}

async function buscarCep(cep) {
  const cepClean = normalizeCep(cep);
  if (!/^\d{8}$/.test(cepClean)) {
    throw new Error('CEP inválido: informe 8 dígitos numéricos.');
  }

  // ✅ Agora usando API real:
  const url = `https://viacep.com.br/ws/${cepClean}/json/`;

  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) {
    throw new Error(`Erro HTTP: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (data.erro) {
    throw new Error('CEP não encontrado.');
  }

  return data;
}

(async () => {
  const cep = argv[2];
  if (!cep) {
    console.log('Uso: node buscarCepFetch.js <CEP>');
    process.exit(1);
  }

  try {
    console.log('Buscando CEP:', cep);
    const info = await buscarCep(cep);
    console.log('Resultado:');
    console.log(JSON.stringify(info, null, 2));
  } catch (err) {
    console.error('Erro:', err.message);
  }
})();
