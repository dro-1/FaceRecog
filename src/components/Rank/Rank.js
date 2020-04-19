import React from 'react';
import './Rank.css';

const Rank = ({ user }) => {
    return(
        <div className='rank-info'>
            <p> {` ${user.name}, your current entry count is ...`}</p>
            <p> {`#${user.entries}`}</p>
        </div>
    );
}

export default Rank