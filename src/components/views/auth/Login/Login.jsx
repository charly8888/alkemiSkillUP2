import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import '../Auth.styles.css'

const Login = () => {
  const navigate = useNavigate()
  const initialValues = { email: '', password: '' }
  const validate = (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = 'El email es requerido'
    }
    if (!values.password) {
      errors.password = 'La contraseña es requerida'
    }
    return errors
  }
  function onSubmit() {
    localStorage.setItem('logged', 'yes')
    navigate('/', { replace: true })
  }
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validate,
    onSubmit,
  })

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/register">Registrarme</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
