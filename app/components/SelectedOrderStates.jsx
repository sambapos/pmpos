import React from 'react';

export const SelectedOrderStates = ({orderStates}) => {
    return (
        <div style={{'fontSize':'0.75em'}}>
            {orderStates.map(({stateName, state}) => <span key={stateName + state}>{state} </span>)}
        </div>
    );
}
