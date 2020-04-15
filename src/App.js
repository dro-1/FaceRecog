import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkform';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: 'dfda414ff75c4e2cabe409b1021ba3a2'
 });

const particleParams = {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#56b5e8"
    },
    "shape": {
      "type": "triangle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 4,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "bubble"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
      imageURL:'',
      box:{}
    }
  }

  onInputChange = event =>{
    this.setState({input:event.target.value});
  }
  CalculateFaceLocation = data =>{
    let image = document.querySelector('#image');
   let width = Number(image.width);
   let height = Number(image.height);
   return `${data[0].region_info.bounding_box.top_row * height-3}px ${width - data[0].region_info.bounding_box.right_col * width-3}px ${height - data[0].region_info.bounding_box.bottom_row * height-3}px ${data[0].region_info.bounding_box.left_col * width-3}px`
  }

  DisplayFaceLocation = box =>{
    this.setState({box})
  }

  onButtonSubmit = event =>{
    this.setState({imageURL:this.state.input});
    app.models.predict("a403429f2ddf4b49b307e318f00e528b",this.state.input)
    .then( response=> { this.DisplayFaceLocation(this.CalculateFaceLocation(response.rawData.outputs[0].data.regions))
    }).catch(err=>{console.log(err);})
    return false;
  }
  
  render() {
      return (
          <div className="App">
            <Particles className='particles' params={particleParams} />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/> 
          </div>
       );
}
}

export default App;
