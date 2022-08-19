import useResize from '../../../hooks/useResize'
import Card from '../../Card/Card'
import Header from '../../Header/Header'
import TaskForm from '../../TaskForm/TaskForm'
import { cardsData } from './data'
import './Tasks.styles.css'

const Tasks = () => {
  const isPhone = useResize()

  const limitString = (str) => {
    if (str.length > 170)
      return {
        string: str.slice(0, 167).concat('...'),
        addButton: true,
      }
    else return { string: str, addButton: false }
  }
  function renderAllCards() {
    return cardsData.map((card) => (
      <Card
        key={card.id}
        {...card}
        description={limitString(card.description).string}
      />
    ))
  }
  return (
    <>
      <Header />

      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>

          {isPhone ? (
            <div className="list phone">{renderAllCards()}</div>
          ) : (
            <div className="list_group">
              <div className="list">
                <h4>Nuevas</h4>
                <div className="card">
                  <div className="close">X</div>
                  <h3>Tarea 1</h3>
                  <h6>24/1/2022 10:40hs.</h6>
                  <h5>German Hornus</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>Descripción fake</p>
                </div>
              </div>
              <div className="list">
                <h4>En proceso</h4>
                <div className="card">
                  <div className="close">X</div>
                  <h3>Tarea 1</h3>
                  <h6>24/1/2022 10:40hs.</h6>
                  <h5>German Hornus</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>Descripción fake</p>
                </div>
              </div>
              <div className="list">
                <h4>Terminadas</h4>
                <div className="card">
                  <div className="close">X</div>
                  <h3>Tarea 1</h3>
                  <h6>24/1/2022 10:40hs.</h6>
                  <h5>German Hornus</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>Descripción fake</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default Tasks
