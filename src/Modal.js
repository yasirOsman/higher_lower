import React from "react";
import "./Modal.css"


const Modal = props => {
  return (
    <div className="modal-box">
      <div className="box">
        <h2>You have {props.result} the game, would you like to play again?</h2>

        <button class="yesButton" onClick={() => window.location.reload(false)}>Yes</button>
        <button class="noButton" onClick={() => {window.open("about:blank", "_self"); window.close()}}>No</button>
      </div>
    </div>
  );
};
 
export default Modal;