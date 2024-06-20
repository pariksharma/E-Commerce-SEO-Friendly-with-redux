import React from "react"
import './buttonForTop.css'

const ButtonForTop = ({GoTop}) => {
    return (<>
        <div className='btnTop' onClick={GoTop}>
            <button className='btn btn-outline-dark rounded-circle py-2 btnFixed' >
                <i className='fa fa-chevron-up'></i>
            </button>
        </div>
    </>)
}

export default ButtonForTop