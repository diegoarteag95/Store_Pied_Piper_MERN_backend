import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //INFORMACION EMAIL
  const info = await transport.sendMail({
    from: '"Tienda Pied-Piper - Administracion" <cuentas@pied-piper.com>',
    to: email,
    subject: "Tienda Pied-Piper - Coprueba tu cuenta",
    text: "Comprueba tu cuenta en Tienda Pied-Piper",
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en Tienda Pied-Piper.</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    </p>

    <p>Si tu no creaste esta cuenta, puedes ignorar el correo</p>
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //INFORMACION EMAIL
  const info = await transport.sendMail({
    from: '"Tienda Pied-Piper - Administracion" <cuentas@pied-piper.com>',
    to: email,
    subject: "Tienda Pied-Piper - Restablece tu Contraseña",
    text: "Restablece tu Contraseña para Tienda Pied-Piper",
    html: `<p>Hola: ${nombre} has solicitado Restablecer tu Contraseña.</p>
    <p>Sigue el siguiente enlace para generar una nueva contraseña: 
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablece Contraseña</a>
    </p>

    <p>Si tu no solicitaste este correo, puedes ignorar el correo</p>
    `,
  });
};
