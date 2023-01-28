import styles from '../project/ProjectCard.module.css'
import { BsFillTrashFill } from 'react-icons/bs'

function ServiceCard({id, name, cost, description, handleRemove}) {

	const remove = (e) => {
		e.preventDefault()
		handleRemove(id, cost)
	}

	return (
		<div className={styles.projectcard}>
  			<h4>{name}</h4>
  			<p><span>Custo total: </span>R${cost}</p>
  			<section>{description}</section>
  			<div className={styles.projectcardactions}>
  				<button onClick={remove}>
  					<BsFillTrashFill/> 
  					Excluir
  				</button>
  			</div>
		</div>
	);
}

export default ServiceCard;