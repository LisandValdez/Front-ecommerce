import { useState } from "react"

export default function ProductImages({images}) {
    const [activeImage,setActiveImage] = useState(images?.[0]);
    
    return (
        <>
            <div className="Big-image-div">
                <img className="Big-image" src={activeImage} />
            </div>
            <div className="Image-buttons">
                {images.map(image => (
                    <div 
                    key={image}
                    className={`image-button ${image === activeImage ? 'active' : ''}`} 
                    active={image===activeImage}
                    onClick={() =>setActiveImage(image)}>
                    <img className="Big-image" src={image}/>
                    </div>
                ))}
            </div>
        </>
    )
}