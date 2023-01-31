**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regra de negócio -> tem haver com os requisitos funcionais de uma forma mais aprofundada

# Cadastro de Carros [ x ]
**RF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
* O usuário reponsável pelo cadastro deve ser um usuário administrador.

# Listagem de Carros [ x ]
**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todo os carros disponíveis pelo nome da categoria.
Deve ser possível listar todo os carros disponíveis pelo nome do carro.
Deve ser possível listar todo os carros disponíveis pela marca do carro.

**RN**
O usuário não precisa estar logado no sistema.

# Criação de Especificação no carro [ x ]
**RF**
Deve ser possível cadastrar uma especifiação para um carro.
Deve ser possível listar todas as especifiações.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro que não está cadastrado.
Não deve ser possível cadastrar uma especifiação já existente para o mesmo carro.
O usuário reponsável pelo cadastro deve ser administrador.

# Cadastro de imagens do carro [ x ]
**RF** 
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para o upload dos arquivos.

**RN**
O usuário poderá cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro [ x ]
**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível. 
Usuário deve estar logado.

# Devolução de carro
**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional 
aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
Usuário deve estar logado.

# Recuper Senha
**RF**
- Deve ser possível o usuário recuperar a senha informando o E-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas

