import { useEffect, useState } from "react";

function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    })

    const [allMemes, setAllMemes] = useState([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> {
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(data => setAllMemes(data.data.memes))
    },[])

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMem => ({
            ...prevMem,
            [name]: value
        }))
    }

    function getMemeImage() {
        console.log('getMemeImage')
        let randomNumber = Math.floor(Math.random() * allMemes.length)
        let url = allMemes[randomNumber].url
        setMeme(prev => ({
            ...prev,
            randomImage: url
        }))
    }

    return ( 
        <main>
            <div className="form">
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Top Text"
                    name="topText" 
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Bottom Text"
                    name="bottomText" 
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="form-btn"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
                <div className="meme">
                    <img src={meme.randomImage} className="meme-image" alt=""/>
                    <h2 className="meme-text top">{meme.topText}</h2>
                    <h2 className="meme-text bottom">{meme.bottomText}</h2>
                </div>
            </div>
        </main>
     );
}

export default Meme;