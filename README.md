# Teste de importação de planilha xlsx para controle financeiro

para subir o ambiente de desenvolvimento

```
ter o node instalado
ter serviço de mongo disponível para acesso

Executar os comandos abaixo na pasta do projeto
    npm install 
    set PORT={port}
    set NE_MONGOURI={mongodb://<dbuser>:<dbpassword>@<ip/dns>:<port>/<database>}
    npm start
```

O endpoint disponível para teste da importação é `post /import`.