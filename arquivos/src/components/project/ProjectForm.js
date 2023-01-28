import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import Message from '../layout/Message'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProjectForm(props) {

	const [categories, setCategories] = useState()
	const [project, setProject] = useState(props.projectData || [])
	const [show, setShow ] = useState(false)
	const navigate = useNavigate()
	// 
	useEffect(() => {
		fetch('http://localhost:5000/categories', {
			method: 'GET',
			headers: {
				'Content-Type':'application/json'
			},
		}).then((resp) => resp.json()).then((data) => { setCategories(data) }).catch((err) => console.log(err))
	}, [])

	// envia os dados para função de outro componente que está linkado com o handleSubmit e faz as modificações, edições, postagem etc
	const submit = (e) => {
		// faz com que os dados sejam retidos e não perdidos
		e.preventDefault()

		// faz a contagem de dados do objeto
		var keyproject, countproject = 0;
		for(keyproject in project) {
  			if(project.hasOwnProperty(keyproject)) {
   				countproject++;
  			}
		}

		// mesnsagens de erro na criação em /newproject e msg sucesso em /projects e no editproject é opcional
		
		if (props.projectText == "criado") {
			countproject >= 3 ? props.handleSubmit(project) : setShow(true)
			countproject >= 3 && navigate('/projects', { state: { message: `Projeto "${project.name}" criado com sucesso` } })
			countproject >= 3 && setTimeout(() => {navigate('/projects', { state: { message: '' } })}, 3000)
			
			setTimeout(() => {setShow(false)}, 3000)
		} else{
			countproject >= 3 && props.handleSubmit(project)
			 // : setShow(true)
			// countproject >= 3 && navigate('/projects', { state: { message: `Projeto "${project.name}" criado com sucesso` } })
			// countproject >= 3 && setTimeout(() => {navigate('/projects', { state: { message: '' } })}, 3000)
			
			// setTimeout(() => {setShow(false)}, 3000)
		}

	}

	// modifica valor conforme escrevo no input
	function handleChange(e) { 
		setProject({ ...project, [e.target.name]: e.target.value })
	}
	// modifica valor conforme escolho no select
	function handleSelect(e) { 
		setProject({ ...project, category:{
			id: e.target.selectedIndex,
			name: e.target.options[e.target.selectedIndex].text,
		}, })
	}

	return (
		<form onSubmit={submit} className={styles.form}>
			<Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto" handleOnChange={handleChange} value={project.name?project.name:''}/>
			<Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o orçamento total" handleOnChange={handleChange} value={project.budget?project.budget:''}/>
			<Select name="category_id" text="Selecione a categoria" options={categories} handleOnChange={handleSelect} value={project.category ? project.category.id : '' }/>
			<SubmitButton text={props.btnText} />
			<br/>
			{show && <Message type="error" msg="Complete as informações"/>}
		</form>
  
  	);
}

export default ProjectForm;