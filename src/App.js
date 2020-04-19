import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkform';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';


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


const initialState = {
      input:'',
      imageURL:'',
      boxes:[],
      route:'signin',
      user: {
        id:'',
        name:'',
        email:'',
        entries:'',
        joined: ''
      },
      checked: false
    }
  

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = data =>{
    this.setState(initialState);
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined: data.joined
    }})
  }

  onInputChange = event =>{
    this.setState({input:event.target.value});
  }

  onRouteChange = route =>{
    this.setState({route})
  }

  CalculateFaceLocation = data =>{
    let image = document.querySelector('#image');
   let width = Number(image.width);
   let height = Number(image.height);
   return [`${data.region_info.bounding_box.top_row * height-3}px`,`${width - data.region_info.bounding_box.right_col * width-3}px`,`${height - data.region_info.bounding_box.bottom_row * height-3}px`,`${data.region_info.bounding_box.left_col * width-3}px`]
  }

  DisplayFaceLocation = box =>{
    this.setState({
      boxes : this.state.boxes.concat([box])
    });
  }
  
  onButtonSubmit = event =>{
    event.preventDefault();
    const { input } = this.state;
    if(this.state.checked){
      this.setState({boxes:[]})
    }

    if(this.url !== input ){
    this.setState({imageURL:input});

   fetch('https://agile-atoll-33348.herokuapp.com/imageDetection',{
     method:'put',
     headers: {'Content-Type':'application/json'},
     body : JSON.stringify({
       imageURL : input
     })
   })
   .then(response => response.json())
    .then( response=> { 
      response.rawData.outputs[0].data.regions.forEach( region => {
        this.DisplayFaceLocation(this.CalculateFaceLocation(region))
      })
    })
    .then( res => {
      let count = 0
      let bounds = document.getElementsByClassName('bounding-box');
      
      for(let i = 0;bounds[0];i++) 
      bounds[0].parentNode.removeChild(bounds[0]);
    
      this.state.boxes.forEach(box=>{
        const colorArr = ['#54ddee','#f0de10','#830ff0','#510fef','#ff0ea0','#ffaaaf']
        let div = document.createElement('div');
      div.setAttribute('class','bounding-box');
      div.setAttribute('style',`
      top: ${box[0]};
      right: ${box[1]};
      bottom: ${box[2]};
      left: ${box[3]};
      box-shadow: 0 0 0 3px ${colorArr[count]};
      `)
      document.querySelector('.image-container').appendChild(div)
      ++count;
      })
  
    })
    .catch(err=>{console.log(err);})
   
   
    fetch('https://agile-atoll-33348.herokuapp.com/image',{
      method:'put',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        id : this.state.user.id
      })
  })
  .then(response => response.json())
  .then(data => {
    this.setState(Object.assign(this.state.user,{ entries: data}));
    this.setState({ checked : true});
  })
  }
  
 this.url = this.state.input;
 
  }
  
  render() {
      return (
          <div className="App">
            <Particles className='particles' params={particleParams} />
            <Navigation onRouteChange={this.onRouteChange} route={this.state.route}/>

            { 
              this.state.route === 'signin' 
           
            ? <SignIn 
            loadUser = { this.loadUser} 
            onRouteChange={this.onRouteChange}/>
            
            : (
               this.state.route === 'register'
                
              ? <Register 
              loadUser = { this.loadUser}
              onRouteChange={this.onRouteChange}/>
                
              : <div>
                    <Logo />
                    <Rank user = {this.state.user} />
                    <div className='form-image-container'>
                    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                    <FaceRecognition boxes={this.state.boxes} imageURL={this.state.imageURL}/> 
                    </div>
                </div>
            )
            }
          </div>
       );
}
}

export default App;
