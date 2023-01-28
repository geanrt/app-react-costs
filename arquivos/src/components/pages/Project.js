import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { parse, v4 as uuidv4} from 'uuid'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'

import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project(props) {

	const {id} = useParams();

	const [project, setProject] = useState([])
	const [showProjectForm, setShowProjectForm] = useState(false)
	const [showServiceForm, setShowServiceForm] = useState(false)
	const [message, setMessage] = useState()
	const [type, setType] = useState()
	const [quantservices, setQuantServices] = useState()
	const [services, setServices] = useState([])


	useEffect(()=>{
		setTimeout(()=>{
			fetch(`http://localhost:5000/projects/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type':'application/json',
			},
			})
			.then((resp) => resp.json())
			.then((data) => {
				setProject(data)
				setServices(data.services)
				
			})
			.catch((err) => console.log(err))
		}, 300)
	}, [id]) 

	function removeService(id, cost) {
		const servicesUpdated = project.services.filter((services) => services.id !== id)
		const projectUpdated = project
		projectUpdated.services = servicesUpdated
		projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

		fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
			method: 'PATCH',
			body: JSON.stringify(projectUpdated),
			headers : {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => resp.json())
		.then((data) => {
			setProject(projectUpdated)
			setServices(servicesUpdated)
			setMessage('Serviço excluido com sucesso')
			setType('sucess')
			setTimeout(()=>{setMessage()}, 3000)
		})
		.catch((err) => console.log(err))
	}

	function toggleProjectForm(){
		setShowProjectForm(!showProjectForm)
	}
	function toggleServiceForm(){
		setShowServiceForm(!showServiceForm)
	}

	// edita o projeto através do PATCH (que pega os dados e modifica somente os diferentes **atenção deve ter a mesma estrtura dependendo da forma que vc quer os dados)
	function editProject(project) {
		if (project.budget < project.cost) {
			setMessage('O orçamento não pode ser menor que o custo do projeto')
			setType('error')
			setTimeout(()=>{setMessage()}, 3000)
			return false
		}
		fetch(`http://localhost:5000/projects/${project.id}`, {
			method: 'PATCH',
			body: JSON.stringify(project),
			headers: {
				'Content-Type':'application/json'
			},
		})
		.then((resp) => resp.json())
		.then((data) => { 
			setProject(data) 
			setShowProjectForm(false) 
			setMessage('Projeto atualizado com sucesso')
			setType('sucess')
			setTimeout(()=>{setMessage()}, 3000)
		}).catch((err) => console.log(err))
	}

	function createService(project) {

		// fetch(``,{})
		// last service
		const lastService = project.services[project.services.length -1]

		lastService.id = uuidv4()

		const lastServiceCost = lastService.cost

		const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

		if (newCost > parseFloat(project.budget)) {
			setMessage('Orcamento ultrapassado, verifique o valor do serviço')
			setType('error')
			project.services.pop()
			setTimeout(()=>{setMessage()}, 3000)
			return false
		} else {
			setMessage(`Serviço "${lastService.name}" adicionado com sucesso`)
			setType('sucess')
			setShowServiceForm(false)
			setTimeout(()=>{setMessage()}, 3000)
		}

		// add cost update
		project.cost = newCost

		console.log(project.services)

		fetch(`http://localhost:5000/projects/${project.id}`, {
			method: 'PATCH',
			body: JSON.stringify(project),
			headers: {
				'Content-Type':'application/json'
			},
		})
		.then((resp) => resp.json())
		.then((data) => { 
			// setProject(data)
			setProject(project)
			// setShowProjectForm(false) 
			// setMessage('Projeto atualizado com sucesso')
			// setType('sucess')
			// setTimeout(()=>{setMessage()}, 3000)
		}).catch((err) => console.log(err))

		
	}

	return (<>
		{
		project.name?
		<div className={styles.projectDetails}>
			<Container customClass='column'>
				{message && <Message type={type} msg={message}/>}
				<div className={styles.detailsContainer}>
					<h1>{project.name}</h1>
					<button onClick={toggleProjectForm} className={styles.btn}>
						{!showProjectForm?'Editar projeto':'Fechar projeto'}
					</button>
					{!showProjectForm?
					(<div className={styles.projectInfo}>
						<p><span>Categoria: </span>{project.category.name}</p>
						<p><span>Orçamento: </span>R${project.budget}</p>
						<p><span>Total utilizado: </span>R${project.cost}</p>
					</div>):
					(<div className={styles.projectInfo}>
						<ProjectForm btnText='Salvar' handleSubmit={editProject} projectData={project} projectText='editado'/>
					</div>)
					}
				</div>
				<div className={styles.serviceFormContainer}>
					<h2>Adicione um serviço</h2>
					<button onClick={toggleServiceForm} className={styles.btn}>
						{!showServiceForm?'Adicionar serviço':'Cancelar'}
					</button>
					<div className={styles.projectInfo}>
						{showServiceForm && (
							<ServiceForm 
								handleSubmit={createService}
								textBtn = 'Adicionar o serviço'
								projectData = {project}
							/>
						)}
					</div>
				</div>
				<h2>Serviços</h2>
				<Container customClass='start'>
					{Object.keys(services).length? (
						services.map((item) => (
							<ServiceCard
								id={item.id}
								name={item.name}
								cost={item.cost}
								description={item.description}
								key={item.id}
								handleRemove={removeService}
							/>
						))): (<p>Adicione serviços para seu projeto</p>)
					}
				</Container>	
			</Container>
		</div>
		
		:(<Loading/>)
		}
	</>);
}

export default Project;

