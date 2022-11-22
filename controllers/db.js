const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'desafioInvertimentos',
  password: 'park22',
  port: 5432,
});

const insertInvestimentos = async (data) => {
  const { investimento, proprietario, dataCriacao, valorInicial } = data.body;
  try {
    pool.query('INSERT INTO "Investimentos" ("Investimento", "Proprietario", "DataCriacao", "ValorInicial", "Saldo") VALUES ' +
      '($1, $2, $3, $4, $5)', [investimento, proprietario, dataCriacao, valorInicial, valorInicial]);
    return 'Sucesso';
  } catch (error) {
    console.error(error)
    return error
  }
};


const getInvestimentosProprietario = async (proprietario, pagina) => {
  var deslocamento = (pagina - 1) * 10;
  try {
    const res = await pool.query('SELECT * FROM "Investimentos" WHERE "Proprietario" = $1' +
      ' ORDER BY "Id" LIMIT $2 OFFSET $3', [proprietario, 10, deslocamento]);
    return res.rows;
  } catch (error) {
    console.error(error)
    return error
  }
};

const getInvestimento = async (investimento) => {
  try {
    const res = await pool.query('SELECT * FROM "Investimentos" WHERE "Investimento" = $1', [investimento]);
    return res.rows;
  } catch (error) {
    console.error(error)
    return error
  }
};

const getInvestimentos = async () => {
  try {
    const res = await pool.query('SELECT * FROM "Investimentos"');
    return res.rows;
  } catch (error) {
    console.error(error)
    return error
  }
};

const updateInvestimentos = async (saldo, investimento) => {
  try {
    await pool.query('UPDATE "Investimentos" SET "Saldo" =  $1 WHERE "Investimento" = $2 ',
      [saldo, investimento]);
  } catch (error) {
    console.error(error)
    return error
  }
};

module.exports = {
  insertInvestimentos,
  getInvestimentosProprietario,
  getInvestimento,
  updateInvestimentos,
  getInvestimentos
};

