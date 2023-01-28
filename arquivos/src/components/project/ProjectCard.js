import styles from './ProjectCard.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

import { Link } from 'react-router-dom'

function ProjectCard({id, name, budget, category, handleRemove}) {

	const remove = (e) => {
		e.preventDefault()
		handleRemove(id, name)
	}

	return (
		<div className={styles.projectcard}>
  			{/*projeto:
  			<p>{name}</p>
  			<p>{budget}</p>
  			<p>{category}</p>
  			<p>{id}</p>*/}
			<h4>{name}</h4>
			<p><span>Orçamento:</span> R${budget}</p>
			<p className={styles.categorytext}>
				<span className={`${styles[category.toLowerCase()]}`}></span> {category}
			</p>
			<div className={styles.projectcardactions}>
				<Link to={`/project/${id}`}>
					<BsPencil/>Editar
				</Link>
				<button onClick={remove}>
					<BsFillTrashFill/> Deletar
				</button>
			</div>

		</div>
  
  	);
}

export default ProjectCard;