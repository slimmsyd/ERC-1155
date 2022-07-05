
import styles from '../../styles/Home.module.css';


export default function Nav({connect, isConnected, accountAddress}) {

    const accountButton = () => { 
        if(!isConnected) {
            return ( 
                <button onClick={connect} className = {styles.connectBtn}>Connect Wallet</button>
            )
        }else { 
            return <button className = {styles.connectBtn}>{accountAddress}</button>

        }

    }
    return ( 
        <nav className = {styles.nav}>
            <h3>
                META3D
            </h3>
            {accountButton()}  
        


        </nav>
    )


}