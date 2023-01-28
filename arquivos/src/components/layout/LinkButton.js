import styles from './LinkButton.module.css'
import { Link } from 'react-router-dom'

function LinkButton(props) {
	return (
		<Link to={props.to} className={styles.btn}>
			{props.text}
		</Link>
  
  	);
}

export default LinkButton;
