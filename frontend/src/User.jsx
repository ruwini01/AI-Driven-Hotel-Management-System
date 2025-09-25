import React from 'react'

export default function User(props) {
  return (
    <h1 className='text-blue-500 text-3xl'>
        {props.name}
        {props.age}
    </h1>
  )
}
