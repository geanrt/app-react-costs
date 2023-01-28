import styles from './Newproject.module.css'
import ProjectForm from '../project/ProjectForm'

function Newproject(props) {


  // cria um novo projeto através do POST, achei mais fácil, fica guardado no banco de dados
  function createPost(project) {

    project.cost = 0
    project.services = []

    fetch('http://localhost:5000/projects', {
        method: 'POST',
        body: JSON.stringify(project),
        headers: {
          'Content-Type':'application/json'
        },
    })
    .then((resp) => resp.json())
    .then((data) => { 
      console.log(`Projeto "${project.name}" criado com sucesso!`)
      //Redirecionar
     
      
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className={styles.newprojectcontainer}>
        <h1>Criar Projeto</h1>
        <p>Crie seu projeto para depois adicionar os serviços</p>
        <ProjectForm handleSubmit={createPost} btnText="Criar projeto" projectText='criado'/>
    </div>
  
    );
}

export default Newproject;