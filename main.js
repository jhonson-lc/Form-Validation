const expReg = {
  username: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};
let id = id => document.getElementById(id);
let classes = clas => document.querySelectorAll(clas);
let cl = clas => document.querySelector(clas);
const form = document.getElementById('form');

let username = id('username'),
  email = id('email'),
  password = id('password'),
  submit = id('submit'),
  mensajeExito = id('mensajeExito'),
  btn_cerrar = id('mensajeExito-btn'),
  excla = classes('.fa-circle-exclamation'),
  input = classes('.v_input'),
  check = classes('.fa-circle-check');

let errorName = cl('.errorName'),
  errorEmail = cl('.errorEmail'),
  errorPassword = cl('.errorPassword');

document.addEventListener('click', e => {
  if (e.target.matches('#username')) {
    errorName.textContent = '';
    excla[0].style.opacity = '0';
  }

  if (e.target.matches('#email')) {
    errorEmail.textContent = '';
    excla[1].style.opacity = '0';
  }
  if (e.target.matches('#password')) {
    errorPassword.textContent = '';
    excla[2].style.opacity = '0';
  }
  if (e.target.matches('#mensajeExito-btn')) {
    mensajeExito.style.display = 'none';
  }
  e.stopPropagation();
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const errores = [];

  if (!expReg.username.test(username.value) || !username.value.trim()) {
    errores.push({
      tipo: errorName,
      msg: 'Formato no válido, ingrese más de 4 caracteres y solo letras!',
      icon: excla[0],
      iconcheck: check[0],
    });
    username.style.border = '2px solid red';
  } else {
    excla[0].style.opacity = '0';
  }
  if (!expReg.correo.test(email.value) || !email.value.trim()) {
    errores.push({
      tipo: errorEmail,
      msg: 'Ingrese un correo válido!',
      icon: excla[1],
      iconcheck: check[1],
    });
    email.style.border = '2px solid red';
  } else {
    excla[1].style.opacity = '0';
  }
  if (!expReg.password.test(password.value) || !password.value.trim()) {
    errores.push({
      tipo: errorPassword,
      msg: 'Ingrese una contraseña válida!',
      icon: excla[2],
      iconcheck: check[2],
    });
    password.style.border = '2px solid red';
  } else {
    excla[2].style.opacity = '0';
  }

  if (errores.length !== 0) {
    mostrarMensajesError(errores);
    return;
  }

  mostrarMensajeExito();
  limpiarFormulario();
});

const mostrarMensajesError = errores => {
  errores.forEach(item => {
    item.tipo.textContent = item.msg;
    item.icon.style.opacity = '1';
    item.iconcheck.style.opacity = '0';
  });
};

input.forEach(e => {
  e.addEventListener('keyup', () => {
    if (!expReg.username.test(username.value) || !username.value.trim()) {
      username.style.border = '2px solid #c4c4c4';
      check[0].style.opacity = '0';
    } else {
      excla[0].style.opacity = '0';
      username.style.border = '2px solid green';
      check[0].style.opacity = '1';
    }
    if (!expReg.correo.test(email.value) || !email.value.trim()) {
      email.style.border = '2px solid #c4c4c4';
      check[1].style.opacity = '0';
    } else {
      excla[1].style.opacity = '0';
      email.style.border = '2px solid green';
      check[1].style.opacity = '1';
    }
    if (!expReg.password.test(password.value) || !password.value.trim()) {
      password.style.border = '2px solid #c4c4c4';
      check[2].style.opacity = '0';
    } else {
      excla[2].style.opacity = '0';
      password.style.border = '2px solid green';
      check[2].style.opacity = '1';
    }
  });
});

const limpiarFormulario = () => {
  input.forEach(inp => {
    inp.value = '';
    inp.style.border = '2px solid #c4c4c4';
  });
  check.forEach(c => (c.style.opacity = '0'));
};

const mostrarMensajeExito = () => {
  mensajeExito.style.display = 'block';
};
