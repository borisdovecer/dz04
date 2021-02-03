import React from 'react'
import KarteI from "./KarteI"
import KarteS from "./KarteS"

class Karte extends React.Component{
    state = {
        karte: [],
        audio: "",
        back: "",
        a: "",
        m: "",
        u: "",
        n: "",
        i: "",
        s: "",
        t: "",
        arr: [],
        err: false,
        sc: false,
        complete: false,
        completearr: []
    }

    componentDidMount() {
        let arrI = KarteI
        let arrS = KarteS

        if(this.props.slide === "i"){
            this.setState({
                karte: arrI.sort(() => Math.random() - 0.5),
                audio: "06 sada cemo da igramo igru memorije pronadji dva ista slova.mp3",
                back:"karta-back-oranz.png",
                u: "karta-front-u.png",
                m: "karta-front-m.png",
                s: "karta-front-s.png",
                t: "karta-front-t.png",
                i: "karta-front-i.png"
            })
        }
        if(this.props.slide === "s"){
            this.setState({
                karte: arrS.sort(() => Math.random() - 0.5),
                audio: "17 opet igramo igru memorije pronadji dva ista slova.mp3",
                back:"karta-back-pink.png",
                u: "karta-front-u.png",
                n: "karta-front-n.png",
                s: "karta-front-s.png",
                a: "karta-front-a.png",
                m: "karta-front-m.png"
            })
        }
    }

    flip = (e) => {
        let id = e.target.attributes.id.value
        let card = this.state.karte
        let arr = this.state.arr
        if(!card[id].ck && arr.length<2 ){
            card[id].animation = "flip-vertical-right"
            if(card[id].name === "a"){
                card[id].image = this.state.a
                card[id].ck = true
                arr.push(card[id])
                this.setState( {karte: card, arr: arr} )
            }
            if(card[id].name === "m"){
                card[id].image = this.state.m
                card[id].ck = true
                arr.push(card[id])
                this.setState( {karte: card, arr: arr} )
            }
            if(card[id].name === "t"){
                card[id].image = this.state.t
                card[id].ck = true
                arr.push(card[id])
                this.setState( {karte: card, arr: arr} )
            }
            if(card[id].name === "u"){
                card[id].image = this.state.u
                card[id].ck = true
                arr.push(card[id])
                this.setState( {karte: card, arr: arr} )
            }
            if(card[id].name === "i"){
                card[id].image = this.state.i
                card[id].ck = true
                arr.push(card[id])
                this.setState( {karte: card, arr: arr} )
            }
            if(card[id].name === "s"){
                card[id].image = this.state.s
                card[id].ck = true
                arr.push(card[id])
                this.setState( {karte: card, arr: arr} )
            }
            if(card[id].name === "n"){
                card[id].image = this.state.n
                card[id].ck = true
                arr.push(card[id])
                this.setState( {karte: card, arr: arr} )
            }
            this.compare()
        }
    }

    compare = () => {
        let card = this.state.karte
        let arr = this.state.arr
        let bakimg = this.state.back

        if(arr.length === 2){
            if(arr[0].name === arr[1].name){

                card.forEach( function (crd){
                    if(crd.name === arr[0].name){
                        crd.animation = "pulsate-bck"
                        crd.found = true
                    }
                })
                this.setState({arr:[]})
                this.setState({ sc: true })
                setTimeout( () => {
                    this.setState({sc: false})
                }, 1500 )
            }else{
                this.setState({ err: true })
                setTimeout( () => {
                card.forEach( function (crd){
                    if(!crd.found){
                        crd.image = bakimg
                        crd.ck = false
                        crd.animation = ""
                    }
                })
                this.setState({arr:[], err: false})
                }, 2500 )
            }
        }
        this.complete()
    }

    complete = () => {
        let arr = []
        this.state.karte.forEach( crd => {
            if(crd.found){
                arr.push(true)
            }
        })

        if(arr.length === 10){
            this.setState({ complete: true })
        }
    }

    render() {
        return(
            <div className={"main color-change-2x"} style={{height:"100vh"}}>
                <audio
                    autoPlay
                    src={"./audio/" + this.state.audio}
                />
                {this.state.err ? <audio
                    autoPlay
                    src={"./audio/HAJDE PROBAJ JOS JEDNOM.mp3"}
                /> : null}
                {this.state.sc && !this.state.complete ? <audio
                    autoPlay
                    src={"./audio/BRAVO.mp3"}
                /> : null}
                {this.state.complete ? <audio
                    autoPlay
                    src={"./audio/FENOMENALNO.mp3"}
                /> : null}
                {this.state.complete ? <img src={"./slides/button.png"} alt="btn" className="main-button" style={{marginTop: "35%"}} onClick={this.props.nextSlide}/> : null}
                <div className="row text-center justify-content-center"  style={{marginLeft: 0, marginRight: 0}} >
                        {this.state.karte.map( (card, i) =>
                            <div key={i} className={"col-lg-3 col-md-3 col-sm-3"} style={{marginTop: "3%"}}>
                                <img
                                     id={i}
                                     name={card.name}
                                     src={'./slides/' + card.image}
                                     alt={'card'}
                                     className={card.animation}
                                     style={{width:"45%"}}
                                     onClick={this.flip}
                                />
                            </div>
                        )}
                </div>
            </div>
            )
    }
}

export default Karte
