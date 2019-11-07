import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { student, plan } = data.registration;
    console.log('A fila executou');
    await Mail.sendMail({
      to: `${student.name}<${student.email}>`,
      subject: `Matricula realizada!`,
      text: `
      <h1>Seja bem vindo!</h1>        
      <h1>Plano:</h1><p>${plan.title}</p>
      <h1>Preco:</h1><p>${plan.price}</p>
      <h1>Duracao:</h1><p>${plan.duration}</p>            
      `,
    });
  }
}

export default new RegistrationMail();
