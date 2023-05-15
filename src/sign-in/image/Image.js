import def from './default.jpg'
function Image(){
    return(
        <div>
            <span class="card" id="img-place">
            <img src={def} class="card-img-top" alt="..."></img>
        </span>
    
        <span class="input-group mb-3" id="upload-img">
            <button class="btn btn-outline-secondary" type="button" accept=".jpg,.jpeg,.jfif, .pjpeg,.pjp,.png,.svg,.webp">Choose file</button>
            <input class="form-control" aria-describedby="basic-addon2"></input>
        </span>
        </div> 
        )
}
export default Image;