# React File Base64
[React](http://facebook.github.io/react) Component for Converting Files to base64. It's based on [Dev Mozilla Website](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)

[DEMO](https://rawgit.com/BosNaufal/react-file-base64/master/index.html)


## Install
You can import [react-file-base64.js](./src/js/components/react-file-base64.js) to your react component file like [this](./src/js/components/app.js) and process it with your preprocessor.

You can install it via NPM
```bash
npm install react-file-base64
```


## Usage
```javascript

import React from 'react';
import ReactDOM from 'react-dom';

import FileBase64 from 'react-file-base64';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      files: []
    }
  }

  // Callback~
  getFiles(files){
    this.setState({ files: files })
  }

  render() {
    return (
      <FileBase64
        multiple={ true }
        onDone={ this.getFiles.bind(this) } />
    )
  }

}


ReactDOM.render(<App />, document.getElementById("app"))

```

## Props
##### multiple (Boolean)
Does your component support multiple files?

##### inputStyle (Object)
Style to be used by <input type="file"

##### resize (Object)
Will the input be images that you want resized? (resizing keeps the current aspect ratio and fits it with in the max width and max height. If the max width and max height are larger than the image, then it enlarges the image, else it shrinks the image.
The expected format is: 
```javascript
{sizeName:{maxwidth:int, maxheight:int},...} 
```
ex:
```javascript
{standard:{maxwidth:1024,maxheight:768},thumb:{maxwidth:300,maxheight:200}}
```
Output will now include a sizes section.
ex:
```javascript
[ 
	{
		name: superTest.jpg,
		type: image/jpeg,
		size: 200kB,
		base64: data:image/jpeg;base64,asdffoobar
		file: {}
		sizes: {
			standard: {
				size: 200kB,
				base64: data:image/jpeg;base64,asdffoobar12345678
			},
			thumb: {
				size: 100kB,
				base64: data:image/jpeg;base64,asdffoobar
			}
		}
	}
]
```

##### onDone (Function)
Callback function when all files have been processed


## Thank You for Making this useful~

## Let's talk about some projects with me
Just Contact Me At:
- Email: [bosnaufalemail@gmail.com](mailto:bosnaufalemail@gmail.com)
- Skype Id: bosnaufal254
- twitter: [@BosNaufal](https://twitter.com/BosNaufal)

## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2016 - forever Naufal Rabbani
