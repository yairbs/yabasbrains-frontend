import './App.css';
import React, {Component} from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'


const particlesParams = {
  particles: {
    line_linked: {
      shadow: {
      enable: true,
      color: "#CA9D1",
      blur: 5
      }
    }
  }
}

const initialState = {
  input: '',
  imageurl: '',
  boxes: [],
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''

  }
}

class App extends Component {
  
  constructor() {
    super()
    this.state = initialState;
    }


  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaceArray = data.outputs[0].data.regions
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    let faceLocations = []
    for (const region of clarifaiFaceArray) {
      let clarifaiFace = region.region_info.bounding_box;
      faceLocations.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: (1-clarifaiFace.right_col) * width,
        bottomRow:  (1-clarifaiFace.bottom_row) * height,
      });
    }
    return faceLocations;
  }

  displayFaceBox = (boxes) => {
      this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onSubmit = (event) => {
    this.setState({imageurl: this.state.input});
      fetch('https://radiant-ridge-92342.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input,
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://radiant-ridge-92342.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id,
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}));
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesParams} />
        <Navigation onRouteChange={this.onRouteChange} route = {this.state.route}/>
        {
        this.state.route === 'home' 
        ? <div>
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm 
        onInputChange={this.onInputChange}
        onButtonSubmit = {this.onSubmit}/>
        <FaceRecognition boxes = {this.state.boxes} imageurl = {this.state.imageurl}/>
        </div>
        : (
          (this.state.route === 'signin' || this.state.route === 'signout')
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
        )
        
        }

      </div>
    );
  }

}

export default App;
