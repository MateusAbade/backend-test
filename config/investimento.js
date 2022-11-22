const nodeSchedule = require('node-schedule');
const { getInvestimentos, updateInvestimentos } = require('../controllers/db');


const job = nodeSchedule.scheduleJob('0 0 3 * * ?', () => {
    atualizaGanho();
});


const atualizaGanho = () => {
    getInvestimentos().then(result => {
        for (const key in result) {
            const dataCriacao = formatDate(result[key].DataCriacao);
            const dataHoje = formatDate();
            const diaCriacao = formatDate(result[key].DataCriacao);
            const diaHoje = formatDate();
            if ((diaCriacao == diaHoje) && (dataCriacao != dataHoje)) {
                atualiza(result[key])
            }
        };
    });

}

const atualiza = (investidor) => {
    const { Saldo, Investimento } = investidor;
    const saldoNovo = Saldo * 1.0052;
    updateInvestimentos(saldoNovo, Investimento);

}

const retirada = (data, investimento) => {
    const ganho = data.Saldo - data.ValorInicial;
    const saque = data.ValorInicial - tributacao(data, ganho);
    updateInvestimentos(0, investimento);
    return saque;
}

const tributacao = (data, ganho) => {
    const idadeInvestimento = formatYear() - formatYear(data.DataCriacao);
    if (idadeInvestimento < 1) {
        return (22.5 * ganho) / 100;
    } else if (idadeInvestimento >= 1 || idadeInvestimento <= 2) {
        return (18.5 * ganho) / 100;
    } else if (idadeInvestimento > 2) {
        return (15 * ganho) / 100;
    }
    return 0;
}

const formatDate = (data) => {
    if (data)
        return new Date(data).toLocaleString().slice(0, 10)
    else
        return new Date().toLocaleString().slice(0, 10);
}

const formatYear = (data) => {
    if (data)
        return new Date(data).getFullYear()
    else
        return new Date().getFullYear();
}

const formatDay = (data) => {
    if (data)
        return new Date(data).getDay()
    else
        return new Date().getDay();
}


module.exports = { job, retirada }