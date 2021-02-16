import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const OpenPortsBox = (props) => {
    
    return (
        <div className="monitor-box-div">
            <Link className="disguised-a" to="/open-ports">
                <div className="monitor-box-div-card">
                    <h3>Open Ports</h3>
                </div>
            </Link>
        </div>
    );  
};
  
export default OpenPortsBox