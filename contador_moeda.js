'use strict';
var five = require("johnny-five");
const dotenv = require('dotenv');
const valores = require("./moedas");
const { v4: uuidv4 } = require('uuid');
const { ServiceBusClient } = require("@azure/service-bus");

dotenv.config();



var board = new five.Board({port: "COM3"});
var numero = 0.0;

async function sendMessage(payload)
{

    const sbClient = new ServiceBusClient(process.env.AZURE_STRING_CONEXAO);
    const sender  = sbClient.createSender(process.env.AZURE_NOME_FILA);

    const messages = [
        { body: payload }
     ];

    try {
        let batch = await sender.createMessageBatch(); 
        for (let i = 0; i < messages.length; i++) {
			// for each message in the array			

			// try to add the message to the batch
			if (!batch.tryAddMessage(messages[i])) {			
				// if it fails to add the message to the current batch
				// send the current batch as it is full
				await sender.sendMessages(batch);

				// then, create a new batch 
				batch = await sender.createMessageBatch();

				// now, add the message failed to be added to the previous batch to this batch
				if (!batch.tryAddMessage(messages[i])) {
					// if it still can't be added to the batch, the message is probably too big to fit in a batch
					throw new Error("Message too big to fit in a batch");
				}
			}
            await sender.sendMessages(batch);
            await sender.close();
		}
    } finally{
        await sbClient.close();
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

        sendMessage(payload);

        console.log(`Seu voucher é de: ${Number(numero).toFixed(2)}`);

        numero = 0.00;
    });
})
