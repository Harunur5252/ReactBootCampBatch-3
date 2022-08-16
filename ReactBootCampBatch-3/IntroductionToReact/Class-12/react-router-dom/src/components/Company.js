import React from 'react'
import {useParams} from 'react-router-dom'

function Company() {
  const params = useParams()
  return (
    <div>Company {params.name}</div>
  )
}

export default Company