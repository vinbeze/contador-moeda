

<h1 align="center"> Contador de Moedas </a>  </h1>
 <p align="center"> Prototipo de um contador de moedas criado para o modulo "IOT Development" - FIAP - Grupo 1 <br> O Projeto tem como objetivo a criação de um contador de moedas que gere um voucher para utilização em estabelecimentos comerciais</p>

###  Integrantes do Grupo<Br>
341417 - LUCAS GOIANA MALICIA

340887 - VINICIUS BEZERRA LIMA

342194 - GABRIELA PINHEIRO DA SILVA

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

	ID_ESTABELECIMENTO=2543

	NOME_ESTABELECIMENTO="<NOME_DO_ESTABELECIMENTO>"

	AZURE_NOME_FILA="<NOME_DA_FILA>"
	


### Dependências
Para baixar as dependências e executar, executar o comando abaixo:

    npm install 

### Run
Após o download das depencias,  execute o comando abaixo para executar o telegramBot:

	node contador_moeda.js

### Circuito 

![contador de moeda](https://github.com/vinbeze/contador-moeda/blob/main/contador_moeda_circuito.png)


Para o bom funcionamento do codigó é crucial que siga o esquema acima.
