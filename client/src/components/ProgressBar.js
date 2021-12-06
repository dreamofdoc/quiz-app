import React from "react";
import '../App.css';

const ProgressBar = ({ bgcolor, completed }) => {
    const fillerStyles = {
        color: '#FFA0C8',
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    return (
        <div className="container-styles">
            <div style={fillerStyles}>
                <span className="label-styles">{`${completed}%`}</span>
            </div>
        </div>
    );
}

export default ProgressBar;