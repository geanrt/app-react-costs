import {FaFacebook, FaInstagram, FaTelegram} from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer(props) {

  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li><FaTelegram/></li>
        <li><FaInstagram/></li>
        <li><FaFacebook/></li>
      </ul>
      <p className={styles.copy_right}><span>Gean Rt</span> &copy; 2023</p>
    </footer>
  
  );
}

export default Footer;