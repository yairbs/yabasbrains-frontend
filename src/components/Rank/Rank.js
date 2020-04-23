import React from 'react';
// import './ImageLinkForm.css'

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='white f2 b'>

                {`${name}, your current rank is...`}
            </div> 
            <div className='white b f1'>

                {`#${entries}`}
            </div>
        </div> 
    )
}

export default Rank;