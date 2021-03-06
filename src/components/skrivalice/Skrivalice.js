import React from 'react'
import SlovaI from './SlovaI'
import SlovaS from "./SlovaS";
import bg1 from './skrivalice-bg-40.jpg'
import bg2 from './skrivalice-bg-41.jpg'
import PreloadImage from "react-preload-image";
class Skrivalice extends React.Component{
    state = {
        image: bg1,
        audio: "",
        slovoImg: "",
        slova: SlovaI,
        completearr: [],
        sc: false,
        complete: false
    }
    componentDidMount() {
        if(this.props.slide === "i"){
            this.setState({ image: bg1, audio:"07 sakrila se nasa nestasna slova pritisni svako slovo koje pronadjes.mp3", slovoImg: "radno-47.png", slova:SlovaI })
        }
        if(this.props.slide === "s"){
            this.setState({ image: bg2, audio:"18 nasa slova bas vole da se igraju zmurke pritisni svako slovo koje vidis.mp3", slovoImg: "radno-31.png", slova:SlovaS })
        }
    }

    click = (e) => {
        let s = e.target.attributes
        let Slova = this.state.slova

        if(Slova[s.id.value].found === false) {
            Slova[s.id.value].animation = "rotate-scale-up"
            Slova[s.id.value].found = true
            this.state.completearr.push(Slova[s.id.value])
            this.setState({slova: Slova})

            this.setState({ sc: true })
            setTimeout( () => {
                this.setState({sc: false})
            }, 1500 )
        }
        this.complete()
    };

    complete = () => {
        if(this.state.completearr.length === 3){
            this.setState({ complete: true })
        }
    }

    render() {
        return(
            <div className={"main"}>
                <PreloadImage
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100vh',
                        backgroundColor: '#222222'
                    }}
                    src={this.state.image}
                />
                {this.state.sc && !this.state.complete ? <audio
                    autoPlay
                    src={"./audio/BRAVO.mp3"}
                /> : null}
                {this.state.complete ? <audio
                    autoPlay
                    src={"./audio/TO JE BILO ODLICNO.mp3"}
                /> : null}
                {this.state.complete ? <img src={"./slides/button.png"} alt="btn" className="main-button"  onClick={this.props.nextSlide}/> : null}
                {this.state.slova.map( (slovo, i) => <img
                    key={i}
                    src={"./slides/" + this.state.slovoImg}
                    alt={"slovo"}
                    className={slovo.animation}
                    id={i}
                    style={{width:"7%", position:"absolute", marginTop:slovo.top, left:slovo.left}}
                    onClick={this.click}
                /> )}
                <audio
                    autoPlay
                    src={"./audio/" + this.state.audio}
                />
            </div>
        )
    }
}

export default Skrivalice
