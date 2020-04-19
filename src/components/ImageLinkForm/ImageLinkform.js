import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange,onButtonSubmit }) => {
        return(
            <div className='form-container'>
                <p> I am the Face God. Bring any image before me and I shall show you the faces present in it. Mua Ha Ha Ha :)</p>
                <form>
                    <input className='f4 pa2' type='text' onChange={ onInputChange }></input>
                    <button className='grow f4 link ph3 pv2 dib white bg-light-purple' type='button' onClick={ onButtonSubmit }>Detect</button>
                </form>
            </div>
        )
}

export default ImageLinkForm;