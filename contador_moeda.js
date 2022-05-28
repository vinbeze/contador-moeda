'use strict';
var five = require("johnny-five");
const dotenv = require('dotenv');
const valores = require("./moedas");
const { v4: uuidv4 } = require('uuid');
const { QueueClient, QueueServiceClient } = require("@azure/storage-queue");

dotenv.config();
var board = new five.Board({port: "COM3"});
var numero = 0.0;

const clientQueue = {
    getClient() {
        const queueServiceClient = QueueServiceClient.fromConnectionString(process.env.AZURE_STRING_CONEXAO);
        const queueClient = queueServiceClient.getQueueClient(process.env.AZURE_NOME_FILA);
        return queueClient;
    }
}

board.on("ready", () => {

    var botao5Centavos = new five.Button({
        pin: 2,
        isPullup: true
    }); 

    var botao10Centavos = new five.Button({
        pin: 3,
        isPullup: true
    }); 

    var botao25Centavos = new five.Button({
        pin: 4,
        isPullup: true
    }); 

    var botao50Centavos = new five.Button({
        pin: 5,
        isPullup: true
    }); 

    var botao1Real = new five.Button({
        pin: 6,
        isPullup: true
    }); 

    var botaoCalcular = new five.Button({
        pin: 7,
        isPullup: true
    }); 

    botao5Centavos.on("down", function() {
          numero += valores.CINCOCENTAVOS;
          console.log(Number(numero).toFixed(2));
    });

    botao10Centavos.on("down", function() {
        numero += valores.DEZCENTAVOS;
        console.log(Number(numero).toFixed(2));
    });

    botao25Centavos.on("down", function() {
        numero += valores.VINTEECINCOCENTAVOS;
        console.log(Number(numero).toFixed(2));
    });

    botao50Centavos.on("down", function() {
        numero += valores.CINQUENTACENTAVOS;
        console.log(Number(numero).toFixed(2));
    });

    botao1Real.on("down", function() {
        numero += valores.UMREAL;
        console.log(Number(numero).toFixed(2));
    });

    botaoCalcular.on("down", function() {
        console.log("Gerando o voucher... ");

        const payload = {
            id_estabelecimento: process.env.ID_ESTABELECIMENTO,
            nome_estabelecimento: process.env.NOME_ESTABELECIMENTO,
            id_transacao: uuidv4(),
            data: new Date().toISOString(),
            valor: Number(numero).toFixed(2)
        }

        const client = clientQueue.getClient();
        client.sendMessage(JSON.stringify(payload));

        console.log(`Seu voucher é de: ${Number(numero).toFixed(2)}`);

        numero = 0.00;
    });
})
