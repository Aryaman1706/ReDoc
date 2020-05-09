import React from 'react'

const DocItem = (props) => {
    const { title, date } = props.doc
    const onClick = () => {
        localStorage.setItem('current',JSON.stringify(props.doc));
    };

    return (
            <div className='col s4' style={{backgroundColor:'black', margin: '15px'}}>
                <h4>{title}</h4>
                <p>{date}</p>
                <a 
                href='./doc' 
                onClick={onClick}
                >
                Open</a>
            </div>
    )
}

export default DocItem
