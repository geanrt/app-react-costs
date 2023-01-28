import {Link} from 'react-router-dom'
import Logo from '../../img/costs_logo.png'
import Container from './Container'
import styles from './Navbar.module.css'

function Navbar() {

  return (
    <nav className={styles.navbar}>
     	<Container customClass="ocupar">
     		<Link to="/">
     		<img src={Logo} alt="Logo Costs" className={styles.logo}/>
     		</Link>
     		<ul className={styles.list}>
					<li className={styles.item}><Link to="/">Home</Link></li> 
					<li className={styles.item}><Link to="/projects">Projetos</Link></li> 
					<li className={styles.item}><Link to="/company">Empresa</Link></li>
					<li className={styles.item}><Link to="/contact">Contatos</Link></li>
				</ul>
      </Container>
    </nav>
  
  );
}

export default Navbar;