import {React,useState,useEffect} from 'react'
import FlashMessage from 'react-flash-message'


const Caution = ({cautions})=>{
    
    const [showCautions,setCaution] = useState(false)
    const [text, setText] = useState('This recipe has the following Cautions: ')
    const displayCaution = ()=>{
        let allCaution = 'Allergen Info: '
        cautions.forEach(caution => {
            console.log()
        allCaution += `${caution}, `
        });
        setText(allCaution)
        setCaution(true)
    }

    return(

        <div>
            <i class="bi bi-exclamation-triangle warning"
            onMouseEnter={()=>{
                displayCaution()
            }}
            onMouseLeave={() => setCaution(false)}
            ></i>

            {showCautions &&  (
                <div class = "alert alert-danger" role="alert" >
                    {text}
                </div>

            )}  

        </div>

    )



}

export default Caution