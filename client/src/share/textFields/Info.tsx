import React from 'react';

interface InfoProps {
    header: string;
    value: string | number;
}

const Info = (props: InfoProps) => {
    return (
        <p className="book-info">
            <span className="secondary-text">{props.header}: </span>
            {props.value}
        </p>
    );
};

export default Info;
