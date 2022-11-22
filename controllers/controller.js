const { insertInvestimentos,
    getInvestimentosProprietario,
    getInvestimento,
} = require('./db');
const {retirada} = require('../config/investimento');


const criaIventimentos = async (req, res) => {
    const { dataCriacao, saldo, investimento } = req.body;
    if (dataCriacao <= new Date().toLocaleString().substring(0, 10) || saldo >= 0) {
        getInvestimento(investimento).then(result => {
            if (result[0]) {
                res.json({ erro: 'Investimento já existe!' });
            } else {
                insertInvestimentos(req).then(result => {
                    res.json({ retorno: result });
                });
            }
        });

    } else {
        res.json({
            erro: 'Não foi possível criar o invertimento,verifique se a data de criação' +
                'é superior do que a data atual ou se o saldo informado é negativo!'
        });
    }
}
const visualizaIventimento = (req, res) => {
    getInvestimento(req.body.investimento).then(result => {
        res.json({ retorno: result });
    })
}

const listaIventimentos = (req, res) => {
    const proprietario  = req.body.proprietario;
    var pagina =  req.params.page;
    if (isNaN(pagina) || pagina < 1) { 
        pagina = 1; 
      }
    getInvestimentosProprietario(proprietario, pagina).then(result => {
        res.json({ retorno: result });
    })

}

const retiraInvestimentos = (req, res) => {
    const {investimento} = req.body;
    getInvestimento(investimento).then(result => {
        if (result[0]) {
           const saque = retirada(result[0], investimento);
            res.json({ saque:  saque});
        } else {
            res.json({ erro: 'Investimento não existe!' });
        }
    });

}

module.exports = { visualizaIventimento, listaIventimentos, criaIventimentos, retiraInvestimentos };
