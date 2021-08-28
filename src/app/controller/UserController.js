import * as Yup from 'yup';
import User from '../models/User'

class UserController{
  async store(req, res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(401).json({ message: 'Ooops dados inválidos' })
    }

    const userExists = await User.findOne({
       where: { 
         email: req.body.email 
        }
      });

    if(userExists){
      return res.status(401).json({ message: 'Usuário já cadastrado em nossa base' })
    }

    const { id, name, email } = await User.create(req.body);
    return res.json({id, name, email});
  };

  async index(req, res){
    const person = {
      name: "Nome da Pessoa",
      age: 21
    }
    return res.status(200).json(person);
  };
  async delete(req, res){
    return res.status(200).json({ message: 'Isso aí psiti!'});
  };
  async update(req, res){
    return res.status(200).json({ message: 'Isso aí psiti!'});
  };
}

export default new UserController();