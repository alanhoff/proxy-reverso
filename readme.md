
## Exemplo de proxy reverso usando o Node.js

Este exemplo foi elaborado durante o [meetup][0] da comunidade
Node.js no dia 10/05/2014, qualquer dúvida encontrada você pode
entrar em contato pela lista oficial da [NodeBR][1] ou pelo canal
IRC na freenode.net [#nodebr][2].

### Descrição das pastas

* `proxy`: esta pasta contem o proxy reverso em si.
* `sitea`: um site simples representando o domínio sitea.com.
* `siteb`: outro site agora representando o domínio siteb.com.

### Configuração e instalação

Primeiramente devemos acrescentar os domínios `sitea.com` e `siteb.com`
ao arquivo de hosts do seu sistema, no Linux normalmente é encontrado
em `/etc/hosts` e no Windows em `%SystemRoot%\system32\drivers\etc\hosts`.
Assim o sistema saberá que esses domínios estão no computador local e
os exemplos funcionarão. O seu arquivo de hosts deverá ficar parecido
com este exemplo:

```
# Arquivo de host do sistem
127.0.0.1   sitea.com
127.0.0.1   siteb.com
```

Cada uma das pastas contém um `package.json`, então você deverá
entrar pela linha de comando em cada uma das pastas e executar 
o comando `npm install` para que as dependências de cada pasta
sejam instaladas.

Logo após instalar as dependências, você deverá novamente entrar em cada
uma das pastas e executar o comando `node app.js` para que cada exemplo
vá ao ar. Após este processo você poderá acessar `http://sitea.com` e 
`http://siteb.com`, assim como o `https` de cada um.

### Certificado

A pasta `proxy/cert` possui um certificado auto assinado gerado com os 
seguintes comandos:

```bash
$ openssl req -new > new.ssl.csr
$ openssl rsa -in privkey.pem -out new.cert.key
$ openssl x509 -in new.cert.csr -out new.cert.cert -req -signkey new.cert.key -days 365
```

Caso alguém queira gerar um novo certificado a partir do que está na pasta
a senha é `nodebr`.

[0]: http://meetup.com/Node-js-Sao-Paulo
[1]: http://groups.google.com/group/nodebr
[2]: http://webchat.freenode.net/?channels=#nodebr
