import styles from '../project/ProjectForm.module.css'

import {useState} from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import Message from '../layout/Message'

function ServiceForm({handleSubmit, textBtn, projectData}) {

	const [service, setService]= useState({})
	const [messageErroValues, setMessageErroValues] = useState(false)

	function submit(e) {
		e.preventDefault()

		var keyservice, countservice = 0;
		for(keyservice in service) {
  			if(service.hasOwnProperty(keyservice)) {
   				countservice++;
  			}
		}
		if (countservice >= 3){
			projectData.services.push(service)
			handleSubmit(projectData)
		} else {
			setMessageErroValues(true)
			setTimeout(()=>{setMessageErroValues(false)}, 3000)
		}
			
	}
	function handleChange(e) {
		setService({ ...service, [e.target.name]: e.target.value})
	}

	return (
		<form onSubmit={submit} className={styles.form}>
			<Input type='text' text="Nome do serviço" name="name" placeholder="Insira o nome do serviço" handleOnChange={handleChange} />
			<Input type='number' text="Custo do serviço" name="cost" placeholder="Insira o valor do serviço" handleOnChange={handleChange} />
			<Input type='text' text="Descrição do serviço" name="description" placeholder="Descreva o serviço" handleOnChange={handleChange} />
			<SubmitButton text={textBtn}/>
			{messageErroValues &&
				<Message type="error" msg="Complete todas as informações" />
			}
		</form>
  
  	);
}

export default ServiceForm;