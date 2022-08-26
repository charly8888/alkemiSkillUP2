import { FormControlLabel, Switch } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import '../Auth.styles.css'
const { VITE_REACT_APP_API_ENDPOINT: API_ENDPOINT } = import.meta.env
const Register = () => {
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async function () {
      const response = await fetch(`${API_ENDPOINT}/auth/data`)
      const { result } = await response.json()
      setData(result)
    })()
  }, [])
  const initialValues = {
    userName: '',
    email: '',
    password: '',
    teamID: '',
    role: '',
    continent: '',
    region: '',
    switch: false,
  }
  const required = '* Campo obligatorio'
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, 'La cantidad mínima de caracteres es 4')
      .required(required),
    email: Yup.string().email('Debe ser un email válido').required(required),
    password: Yup.string().required(required),
    // teamID: Yup.string().required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  })

  function onSubmit() {
    const teamID = !values.teamID ? uuidv4() : values.teamID
    const { userName, password, email, role, region, continent } = values
    fetch(`${API_ENDPOINT}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          userName,
          password,
          email,
          teamID,
          role,
          continent,
          region,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        navigate('/registered/' + data?.result?.user?.teamID, { replace: true })
      )
  }
  function handleChangeContinent(value) {
    if (value !== 'America') setFieldValue('region', 'Otro')
    setFieldValue('continent', value)
  }
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  // console.log(values)
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? 'error' : ''}
          />
          {errors.userName && touched.userName && (
            <span className="error-message">{errors.userName}</span>
          )}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className={errors.password && touched.password ? 'error' : ''}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            className={errors.email && touched.email ? 'error' : ''}
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              name="switch"
              color="secondary"
              onChange={() => setFieldValue('switch', !values.switch)}
            />
          }
          label="Pertenecés a un equipo ya creado"
        />
        {values.switch && (
          <div>
            <label>Por favor, introduce el identificador de equipo</label>
            <input
              type="text"
              name="teamID"
              value={values.teamID}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label>Rol</label>
          <select
            name="role"
            value={values.role}
            onBlur={handleBlur}
            onChange={handleChange}
            className={errors.role && touched.role ? 'error' : ''}
          >
            <option value="">Seleccionar rol...</option>
            {data?.Rol?.map((option, i) => (
              <option value={option} key={`a${i}`}>
                {option}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            value={values.continent}
            onChange={(event) =>
              handleChangeContinent(event.currentTarget.value)
            }
            onBlur={handleBlur}
            className={errors.continent && touched.continent ? 'error' : ''}
          >
            <option value="">Seleccionar continente...</option>
            {data?.continente?.map((option, i) => (
              <option value={option} key={`b${i}`}>
                {option}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <span className="error-message">{errors.continent}</span>
          )}
        </div>
        {values.continent === 'America' && (
          <div>
            <label>Región</label>
            <select
              name="region"
              value={values.region}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.region && touched.region ? 'error' : ''}
            >
              <option value="">Seleccionar región...</option>
              {data?.region.map((option, i) => (
                <option value={option} key={`c${i}`}>
                  {option}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <span className="error-message">{errors.region}</span>
            )}
          </div>
        )}
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
