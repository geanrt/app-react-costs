import Message from '../layout/Message'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import Loading from '../layout/Loading'

import { useLocation } from 'react-router-dom'

import styles from './Projects.module.css'

import ProjectCard from '../project/ProjectCard'

import { useState, useEffect } from 'react'

function Projects() {

  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location =  useLocation()
  let message = ''
  if (location.state){
    message = location.state.message
  }

  useEffect(() => {

    setTimeout(()=>{fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      },
    })
    .then((resp) => resp.json())
    .then((data) => { 
      // console.log(data)
      setProjects(data)
      setRemoveLoading(true)
    })
    .catch((err) => console.log(err))}, 300)
  
  }, [])

  // remove os dados (no caso o projeto), através do DELETE
  const removeProject = (id, name) => {
    fetch(`http://localhost:5000/projects/${id}`,
      {
        method: 'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
      })
      .then((resp) => resp.json())
      .then((data) => {
          setProjects(projects.filter((project) => project.id !== id))
          // mensagem de remocão
          setProjectMessage(`Projeto "${name}" removido com sucesso`)
          setTimeout(() => {setProjectMessage('')}, 3000)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={styles.projectcontainer}>
      <div className={styles.titlecontainer}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar novo projeto" />
      </div>
      {message && <Message type="sucess" msg={message}/>}
      {projectMessage && <Message type="sucess" msg={projectMessage}/>}
      <Container customClass='start'>

        {projects &&
          projects.map((projeto) => (
            <ProjectCard key={projeto.id} id={projeto.id} name={projeto.name} budget={projeto.budget} category={projeto.category.name} handleRemove={removeProject}/>
          ))
        }
        {!removeLoading && <Loading/>}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos no momento! Clique em criar novo e bons negócios ;)</p>
        )}
      </Container>
    </div>
  
  );
}

export default Projects;