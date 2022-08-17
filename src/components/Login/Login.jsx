import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function handleChange(e) {
    switch (e.currentTarget.name) {
      case 'email':
        setEmail(e.currentTarget.value)
        break
      case 'password':
        setPassword(e.currentTarget.value)
        break
      default:
        break
    }
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      alert(
        'Es induspensable para que aprendas cosas interesantes que completes'
      )
    } else {
      window.location = 'https://cybermap.kaspersky.com'
    }
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Enviar</button>
        </div>
      </form>
    </div>
  )
}

export default Login
