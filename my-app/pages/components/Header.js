
import React, {useState,useEffect} from 'react';
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
export default function Header({tokenIds,mint, maxTokenIds, loading}) {
    const  [tokenNumber, setTokenIdNumber] = useState(0)

    useEffect(() => {
          let tokenIdNumber = parseFloat(tokenIds)
        setTokenIdNumber(tokenIdNumber)

    })

    const returnLoading = () => { 
        if(loading) { 
            return <button className = {styles.btn}>Loading...</button>
        }else { 
            return <button onClick={mint} className = {styles.btn}>MINT</button>

        }
    }

    const openSection = () => { 
        if(tokenNumber >= 1) { 
            return ( 
                <div className = {styles.innerDiv}>
                    <div className = {`${styles.box } ${styles.boxColor}`}>
                        <Link href = "/Hiddensection"><h3 id = {styles.h3}>VIEW GEMS</h3></Link> 
                </div>

                    <div className = {styles.box}></div>
            </div>

            )
        }else { 
            return (
                <div className = {styles.innerDiv}>
                    <div className = {`${styles.box } ${styles.boxColor}`}>
                        <h3 id = {styles.h3}>GET NFT TO VIEW</h3>
                    </div>
                    <div className = {styles.box}></div>
            </div>
            )
        }

    }


    return ( 
        
        <header className = {styles.header}>
            <div>
                <h1>STEP INTO </h1>
                <h1>The</h1>
                <h1> METAVERSE</h1>
                {returnLoading()}
                <p>{tokenIds}/{maxTokenIds} available</p>
            </div>
            <div className = {styles.boxHeader}>
               {openSection()}
   
                <div className = {styles.innerDiv}>
                    <div className = {styles.box}><h3 id = {styles.h3}>WHO ARE WE</h3></div>
                    <div className = {`${styles.box } ${styles.boxColor}`}></div>
                </div>
               
            </div>
         
        </header>

    )

}