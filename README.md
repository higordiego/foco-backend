# Processo Seletivo 

    Candidate: Higor Diego

# Install dependencies

- Dependencies Application: ` npm i `


# Machine Local
### Technologies needed
- Nodejs 10.12 or superior
- Mysql 5.7

### Integration
- Mailgun 

### Start Application
`npm start`

### Access
- Api: *http://localhost:3000*

# Docker
### Tecnologies needed
- Docker 17.12.0
- Docker Compose 1.18.0

## Start Application
`docker-compose up`

### Access
- Api: *http://localhost:3000*



# Backend

## Descrição do Case
Uma organização está captando voluntários para uma determinada ação e seu objetivos é desenvolver uma aplicação onde os candidatos possam cadastrar seus dados, conferir as informações no documento de submissão (pré-formatado) e confirmar o envio dos dados para a organização, que receberá os dados via e-mail previamente cadastrado.
A aplicação deve possuir um formulário de configuração, onde a organização poderá cadastrar e alterar o e-mail ´para o qual as informações devem ser enviadas e um outro formulário onde a organização poderá alterar o conteúdo do documento de submissão (descrito abaixo).

### Informações Necessárias
Dados do candidato:
 - [x] Nome Completo (obrigatório)
 - [x] Data de Nascimento (obrigatório)
 - [x] CPF (obrigatório e válido)
 - [x] E-mail (obrigatório e válido)
 - [x] Telefone (obrigatório)
 - [x] Se Concorda (não concorda) ser contatado via e-mail
 
 
### Dados da organização:
 - [x] E-mail (obrigatório)
 - [x] Documento de submissão (formato abaixo)

### Documento de Submissão
Eu, @nome, nascido em @dataNascimento, inscrito no CPF No. @cpf, desejo me inscrever como voluntário nessa organização e me considero apto a executar as atividades indicadas no formulário de convocação.
Abaixo seguem os meus contatos:
@telefone
@email (só aparecer se estiver concordado no formulário de cadastro)

@dataEnvio

### Informações Técnicas
Não se preocupar com validação de acesso aos formulários.

Desenvolvedores Front-End não precisam se preocupar com as camadas de persistência. O que vai interessar é a organização das camadas de View e Controllers (Services). É ideal que use Angular (defender a escolha por outro framework) e fiquem a vontade para utilizar Ionic, Bootstrap ou qualquer outro da sua escolha.

Desenvolvedores Back-End não precisam se preocupar com as camadas de Front. Fiquem a vontade para usar qualquer BD e é ideal que usem Node, ficando livre para usar Express, Sails, Hapi ou qualquer outro.

É importante explicar a estruturação do projeto e a lógica utilizada para montá-lo.

Fiquem a vontade para definir qualquer premissa (apenas destaque-as).


