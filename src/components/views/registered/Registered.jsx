import { useParams } from 'react-router-dom'

const Registerd = () => {
  const { teamID } = useParams()
  return <div className="container">Registered {teamID}</div>
}

export default Registerd
