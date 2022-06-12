


<h1 align="center"> Contador de Moedas </a>  </h1>
 <p align="center"> Prototipo de um contador de moedas criado para o modulo "IOT Development" - FIAP - Grupo 1 <br> O Projeto tem como objetivo a criação de um contador de moedas que gere um voucher para utilização em estabelecimentos comerciais</p>

###  Integrantes do Grupo<Br>
341417 - LUCAS GOIANA MALICIA

340887 - VINICIUS BEZERRA LIMA

342194 - GABRIELA PINHEIRO DA SILVA

# Projeto
Construimos esse prototipo de contador de moedas no intuito de sanar a dificuldade que estabelecimentos comerciais vem enfrentando com falta de moedas para o troco no ato do pagamento.

O projeto consiste em ter um contador de moedas em cada estabelecimento, onde cada cliente possa realizar de maneira autônoma a troca de moedas por voucher e descontos no local.


# Solução
![desenho solucao](https://github.com/vinbeze/contador-moeda/blob/main/contador_moeda.jpg)



## IOT - Contador

### Circuito 

![contador de moeda](https://github.com/vinbeze/contador-moeda/blob/main/contador_moeda_circuito.png)

Criamos um contador utilizando push buttons, podemos observar a existencia de 6 deles, cada qual representa uma moeda brasileira sendo elas `R$ 0,05`, `R$ 0,10`, `R$ 0,25`, `R$ 0,50`, `R$ 1,00` e o ultimo representa a finalização da contagem e da geração do voucher.

Utilizamos o protocolo firmata no arduino para criar um canal de comunicação via serial port com o backend que é o responsavel pelas leituras dos acionamentos dos butões.

## Backend

Construimos o backend em Node JS e utilizamos a biblioteca johnny-five para leitura dos push buttons, realização da logica de contagem de moedas e comunicação com serviços externos.

Logo após a finalização da contagem das moedas, nosso backend envia o valor total mais as informações do estabelecimento para uma fila no Azure, a mesma é processada por uma action function e salva os dados em um MongoDb.

Para a consulta do total de moedas arrecadadas pelo estabelecimento por dia, disponibilizamos um endpoint que tambem utiliza-se de azure functions. esse endpoint consulta nosso banco de dados e retorna o total da contagem de moedas para o estabelecimento.
As functions encontram-se nesse repositorio: [contador-functions](https://github.com/vinbeze/contador-functions)


# Como utilizar o backend

### Pré-requisitos

 - Node 16.15
 - NPM
 
 <p> Clone ou Extraia o projeto em um diretório de sua preferência:</p>
 
    "diretório de sua preferencia"
    git clone <projeto>
    
ou

	"diretório de sua preferencia"
	unzip file.zip

    
### Configuração
renomeie o arquivo `.env.example` para  `.env` e altere os token com suas respectivas informações


	#String Connection

	AZURE_STRING_CONEXAO="DefaultEndpointsProtocol=https;AccountName={accountName};AccountKey={accountKey};EndpointSuffix=core.windows.net"

	ID_ESTABELECIMENTO=<ID_ESTABELECIMENTO:number>

	NOME_ESTABELECIMENTO="<NOME_DO_ESTABELECIMENTO:string>"

	AZURE_NOME_FILA="<NOME_DA_FILA:string>"
	


### Dependências
Para baixar as dependências e executar, executar o comando abaixo:

    npm install 

### Run
Após o download das depencias,  execute o comando abaixo para executar o contador de moedas:

	node contador_moeda.js



