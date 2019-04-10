/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* React File Base64 - Version@1.0.0
*
*/

import React from 'react';

export default class FileBase64 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  //Resize images
  resize = (file, maxheight, maxwidth, callback) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = event => {
		const img = new Image();
		img.src = event.target.result;
		img.onload = () => {
			//Determine the new image ratios, keeping the same aspect ratio
			let widthRatio = maxwidth/img.width;
			let heightRatio = maxheight/img.height;
			let newImageRatio = widthRatio;
			//Use the smaller of the two ratios, so the image fits inside the dimensions requested
			if (heightRatio < widthRatio) {
				newImageRatio = heightRatio;
			}

			//Determine the new image sizes starting with the image being reduced
			let newWidth = img.width * newImageRatio;
			let newHeight = img.height * newImageRatio;

			//The image is smaller than the requested size, so enlarge the image
			if (maxwidth > img.width || maxheight > img.height) {
				newWidth = img.width / newImageRatio;
				newHeight = img.height / newImageRatio;
			}

			//Create a canvas at the new size
			const element = document.createElement('canvas');
			element.width = newWidth;
			element.height = newHeight;

			//Write the image to the canvas
			const context2d = element.getContext('2d');
			context2d.drawImage(img, 0, 0, newWidth, newHeight);

			//Get the base64 encoding, and send it to the callback
			let base64 = context2d.canvas.toDataURL();
			callback({
				size: Math.round(base64.length / 1000) + ' kB',
				base64: base64
			});
		}
	}
  }
  
  //Get the original image base64
  base = (file, callback) => {
	
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = event => {
		const img = new Image();
		img.src = event.target.result;
		img.onload = () => {
			callback(reader.result);
		}
    }
  }

  handleChange(e) {

    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

		if (!this.props.resize) {

			let file = files[i];

			// Make new FileReader
			let reader = new FileReader();

			// Convert the file to base64 text
			reader.readAsDataURL(file);

			// on reader load somthing...
			reader.onload = () => {

				// Make a fileInfo Object
				let fileInfo = {
					name: file.name,
					type: file.type,
					size: Math.round(file.size / 1000) + ' kB',
					base64: reader.result,
					file: file,
				};

				// Push it to the state
				allFiles.push(fileInfo);


			} // reader.onload

		} else { //Atempt to resize expecting properties of {sizeName:{maxheight:123,maxwidth:123}}

/*				example:
 *				input property
 *				
 *				{
 *					large: {
 *						maxheight:1024,
 *						maxwidth:1280
 *					},
 *					standard: {
 *						maxheight:600,
 *						maxwidth:800
 *					},
 *					thumb: {
 *						maxheight:200,
 *						maxwidth:300
 *					}
 *					
 *				}
 *				
 *				output object
 *				[ 
 *					{
 *						name: superTest.jpg,
 *						type: image/jpeg,
 *						size: 200kB,
 *						base64: data:image/jpeg;base64,asdffoobar
 *						file: {}
 *						sizes: {
 *							thumb: {
 *								size: 100kB,
 *								base64: data:image/jpeg;base64,asdffoobar
 *							},
 *							standard: {
 *								size: 200kB,
 *								base64: data:image/jpeg;base64,asdffoobar12345678
 *							},
 *							large: {
 *								size: 300kB,
 *								base64: data:image/jpeg;base64,asdffoobar123456789123456789
 *							}
 *						}
 *					},
 *					{
 *						name: superTest2.jpg,
 *						type: image/jpeg,
 *						size: 200kB,
 *						base64: data:image/jpeg;base64,asdffoobar
 *						file: {}
 *						sizes: {
 *							thumb: {
 *								size: 100kB,
 *								base64: data:image/jpeg;base64,asdffoobar
 *							},
 *							standard: {
 *								size: 200kB,
 *								base64: data:image/jpeg;base64,asdffoobar12345678
 *							},
 *							large: {
 *								size: 300kB,
 *								base64: data:image/jpeg;base64,asdffoobar123456789123456789
 *							},
 *						}
 *					}, *					
 *				]
			*/
			let file = files[i];

			//Create the un-resized information
			let fileInfo = {
				name: file.name,
				type: file.type,
				size: Math.round(file.size / 1000) + ' kB',
				file: file
			};
			this.base(file, (base64) => {fileInfo["base64"] = base64;});

			//resize
			let sizes = {};
			Object.keys(this.props.resize).forEach((sizeName) => {
				let dimensions = this.props.resize[sizeName];
				this.resize(file, dimensions.maxheight, dimensions.maxwidth, (output) => {
						sizes[sizeName] = output;
					}
				);
			});
			fileInfo["sizes"] = sizes;
			// Push it to the state
			allFiles.push(fileInfo);
		}
		// If all files have been proceed
		if (allFiles.length === files.length) {
			// Apply Callback function
			if (this.props.multiple) this.props.onDone(allFiles);
			else this.props.onDone(allFiles[0]);
		}
	} // for
  }

  render() {
    return (
      <input
        type="file"
		style={ this.props.inputStyle }
        onChange={ this.handleChange.bind(this) }
        multiple={ this.props.multiple } />
    );
  }
}

FileBase64.defaultProps = {
  multiple: false,
	style: {},
};
