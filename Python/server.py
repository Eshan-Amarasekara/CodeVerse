from flask import Flask, request
import json
app = Flask(__name__)
def run():
    f = open('fullCode.json')
    data = json.load(f)
    return data['fullCode']

@app.route('/me')
def members():

    htmlCode ={"me":run()}
    # Execute your Python code here
    # result = "Python code executed successfully"
    # return {"result": result}
    return htmlCode

@app.route('/img', methods=['POST'])
def img():

    if 'image' in request.files:
        image_file = request.files['image']
        image_file.save('image.png')
        return 'Image uploaded successfully', 200
    else:
        return 'No image found in request', 400

if __name__=="__main__":
    app.run(debug=True, port=8000)

