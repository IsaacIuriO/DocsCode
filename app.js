const sequelize = require('./database/dbconfig');
const server = require("./server");

async function run()
{
    const port = 1000;

    try
    {
        await sequelize.authenticate();
        console.log('Conexão com o banco realizada com sucesso!');

        await sequelize.sync({ force: true });
        console.log('Modelos Sincronizados!');

        server.port = port;
        server.listen();
    } 
    
    catch (error)
    {
        console.error('Erro ao iniciar a aplicação...', error);
    }
}

run();
