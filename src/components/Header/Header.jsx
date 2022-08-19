import { useNavigate } from 'react-router-dom'
import './Header.styles.css'
const Header = () => {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('logged')
    navigate('/login', { replace: true })
  }
  return (
    <header>
      <img alt="scrum" src="https://grupoconsitel.com/resources/scrum.png" />
      <div onClick={handleLogout}>X</div>
    </header>
  )
}

export default Header
