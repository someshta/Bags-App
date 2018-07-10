import React from 'react';
import Styles from './SavedStoreCard.css';
import MyStores from '../../pages/MyStores';

const SavedStoreCard = props => {
    console.log(props.saved)

    return(
        <div className="container">
            {props.saved.map(store => (
                <div className="row savedStoreRow" >
                    <div className="col-sm already-saved-info">
                        <h3>{store.name}</h3>
                    </div>
                    <div className="col-sm already-saved-info">
                        <p>{store.address}</p>
                    </div>
                    <div className="col-sm">
                        <button id="deleteBtn" key={store._id} type="button" onClick={() => props.deletestore(store._id)}>Delete</button>  
                    </div>
                </div>

            ))}       
        </div>
    );
}

export default SavedStoreCard;
