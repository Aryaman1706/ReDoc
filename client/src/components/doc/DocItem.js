import React from 'react'

const DocItem = (props) => {
    const { title, date } = props.doc
    const onClick = () => {
        localStorage.setItem('current',JSON.stringify(props.doc));
    };

    return (
        <div className='row'>
            <div className='col s3' style={{backgroundColor:'black'}}>
                <h4>{title}</h4>
                <p>{date}</p>
                <a 
                href='./doc' 
                className='btn blue' 
                onclick={onClick}
                >
                Open</a>
            </div>
        </div>
    )
}

export default DocItem
