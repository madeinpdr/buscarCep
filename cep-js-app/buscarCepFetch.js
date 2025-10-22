// codigo não funcional sem API, basta usar esse comando para testes: (node buscarCepFetch.js 01001000) 

// ELE VAI DAR ERRO POR NÃO SER UMA PAGE REAL, MAS RETORNAR (ERRO 404)!!!!!!

// ==> CODIGO ABAIXO DANDO (ERRO 404) <==

// Requer Node 18+ (fetch nativo)

const { argv } = require('process');

function normalizeCep(raw) {
  return ('' + raw).replace(/\D/g, '');
}

async function buscarCep(cep) {
  const cepClean = normalizeCep(cep);
  if (!/^\d{8}$/.test(cepClean)) {
    throw new Error('CEP inválido: informe 8 dígitos numéricos.');
  }

  const url = `http://buscacep.com.br/ceps/${cepClean}`;

  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) {
    throw new Error(`Erro HTTP: ${res.status} ${res.statusText}`);
  }

  // tenta converter para JSON
  const data = await res.json();
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
