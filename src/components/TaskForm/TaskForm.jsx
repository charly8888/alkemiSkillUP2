import { useFormik } from 'formik'
import * as Yup from 'yup'
import './TaskForm.styles.css'
const TaskForm = () => {
  const initialValues = { title: '', status: '', priority: '', description: '' }

  function onSubmit() {
    alert('ok')
    // localStorage.setItem('logged', 'yes')
    // navigate('/', { replace: true })
  }
  const required = '* Campo obligatorio'
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, 'La cantidad mínima de caracteres es 6')
      .required(required),
    status: Yup.string().required(required),
    priority: Yup.string().required(required),
  })

  const { handleSubmit, handleChange, errors, touched, handleBlur } = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit,
    }
  )

  return (
    <section className="task-form">
      <h2>Crear tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              name="title"
              placeholder="Título"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.title && touched.title ? 'error' : ''}
            />
            {errors.title && touched.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>
          <div>
            <select
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.status && touched.status ? 'error' : ''}
            >
              <option value="">Seleccionar un estado</option>
              <option value="new">Nueva</option>
              <option value="inProcess">En proceso</option>
              <option value="finished">Terminada</option>
            </select>
            {errors.status && touched.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>
          <div>
            <select
              name="priority"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.priority && touched.priority ? 'error' : ''}
            >
              <option value="">Seleccionar una prioridad</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            {errors.priority && touched.priority && (
              <span className="error-message">{errors.priority}</span>
            )}
          </div>
        </div>
        <div>
          <textarea onChange={handleChange} />
        </div>
        <button name="description" placeholder="Descripción" type="submit">
          Crear
        </button>
      </form>
    </section>
  )
}

export default TaskForm
