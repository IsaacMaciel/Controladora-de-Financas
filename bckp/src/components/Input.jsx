import React from 'react'

export default function Input({label,type,value,col,id}) {
    return (
        <div className={`input-field col ${col}`}>
        <input id={id} value={value} type={type} className="validate" />
        <label className="active"  htmlFor={id}>{label}</label>
      </div>
    )
}
