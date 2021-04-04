var Userdb = require('../model/model');

// criar e salvar um novo usuário 
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({ message: "O conteúdo não pode estar vazio!"});
        return;
    }

    // novo usuário
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // salvar usuário no banco de dados 
    user
        .save(user)
        .then(data => {
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Ocorreu algum erro ao criar uma operação de criação."
            });
        });
}

// recuperar e retornar todos os usuários / recuperar e retornar um único usuário 
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
          .then(data => {
              if(!data){
                  res.status(404).send({ message : "Usuário não encontrado com id=" + id })
              }else{
                  res.send(data)
              }
          })
          .catch(err => {
              res.status(500).send({ message: "Erro ao recuperar usuário com id=" + id})
          })
    }else{
        Userdb.find()
          .then(user => {
              res.send(user)
          })
          .catch(err => {
              res.status(500).send({ message : err.message || "Ocorreu um erro ao recuperar as informações do usuário."})
          })
    }

    
}

// Atualizar um novo usuário identificado por id de usuário
exports.update = (req, res) => {
    if(!req.body){
        return res
          .status(400)
          .send({ message : "Os dados a serem atualizados não podem estar vazios."})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
      .then(data => {
          if(!data){
              res.status(404).send({ message: `Não é possível atualizar o usuário com ${id}. Talvez o usuário não tenha sido encontrado!`})
          }else{
              res.send(data)
          }
      })
      .catch(err => {
          res.status(500).send({ message : "Erro ao atualizar as informações do usuário"})
      })
}

// Excluir um usuário com o ID de usuário especificado na solicitação
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
      .then(data => {
          if(!data){
              res.status(400).send({ message : `Não é possível excluir com id ${id}. Talvez id esteja errado!`})
          }else{
              res.send({
                  message : "O usuário foi excluído com sucesso!"
              })
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Não foi possível excluir o usuário com id=" + id
          });
      });
}