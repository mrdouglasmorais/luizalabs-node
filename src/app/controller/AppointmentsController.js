import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns'
import User from '../models/User';
import Appointment from '../models/Appointment';

class AppointsController{
  async index(req, res){
    return res.status(200).json({ message: 'Tudo okay'});
  };
  async store(req, res){
    const schema = Yup.object().shape({
      employee_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ message: 'Dados são inválidos'})
    };

    const { employee_id, date} = req.body;

    const isEmployee = await User.findOne({ 
      where: { id: employee_id, employee: true }
    });

    if(!isEmployee){
      return res.status(401).json({ message: 'Este usuário não é um colaborador'});
    };
    
    const startHour = startOfHour(parseISO(date));

    if(isBefore(startHour, new Date())){
      return res.status(400).json({ 
        message: 'Horário não disponível'
      })
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      employee_id,
      date: startHour,
    })

    return res.status(200).json(appointment);
  };
}

export default new AppointsController();