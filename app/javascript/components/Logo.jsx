import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'

const Logo = ({color})=>{
    
    return(<h2 style={{color: color}}><FontAwesomeIcon icon={ faKey } /> Chamber of Secrets</h2>)}

export default Logo