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
    };

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
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().when('oldPassword',
        (oldPassword, field) => oldPassword ? field.required().min(6) : field
      ),
      confirmPassword: Yup.string().when('password',
        (password, field) => password ? field.required().min(6).oneOf([Yup.ref('password')]) : field
      ),
    })

    if(!(await schema.isValid(req.body))){
      return res.status(401).json({ 
        message: 'Falha na validação'
      })
    }

    // console.log(req.userEmail)

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId)
    console.log('email informado no banco', user.email)
    console.log('email informado no body', email)

    if(email !== user.email){
      const userExists = await User.findOne({ where: { email }})
      // retorno
      if(userExists){
        return res.status(400).json({ message: 'Verifique o email informado'})
      }
      return res.status(400).json({ message: 'Email não confere'})
    }

    if(oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(400).json({ message: 'Senha não confere'})
    }

    const { id, name, employee} = await user.update(req.body);

    return res.status(200).json({
      id, 
      name, 
      employee
    });
  };
}

export default new UserController();