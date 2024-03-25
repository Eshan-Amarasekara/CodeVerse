import os
import time


def sectionBreak(img):

    import json
    from json.decoder import JSONDecodeError
    from msrest.authentication import CognitiveServicesCredentials
    from azure.cognitiveservices.vision.computervision import ComputerVisionClient
    from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes,VisualFeatureTypes
    import requests
    from PIL import Image ,ImageDraw,ImageFont
    import cv2
    #Chack fullcode hson file is null
    def fullcodeFile():
        try:
            with open("fullCode.json", 'r') as f:
                data = f.read()
                if not data.strip():  # Check if the file is empty
                    return True  # Return True if file is empty
        except JSONDecodeError as e:
            if e.msg == "Expecting value" and e.doc == "":
                return True  # Return True if JSONDecodeError due to empty file

    # Check if csscode JSON file is empty or does not exist
    def csscodeFile():
        try:
            with open("cssCode.json", 'r') as f:
                data = f.read()
                if not data.strip():  # Check if the file is empty
                    return True  # Return True if file is empty
        except JSONDecodeError as e:
            if e.msg == "Expecting value" and e.doc == "":
                return True  # Return True if JSONDecodeError due to empty file

    # Check if alltxt file is empty
    def alltxt():
        return os.stat("all.txt").st_size == 0  # Return True if file size is 0

    Fullcode = fullcodeFile()  # Check if fullCode.json is empty
    Csscode = csscodeFile()  # Check if cssCode.json is empty
    Alltxt = alltxt()  # Check if all.txt is empty

    # If any of the files are not empty, clear their contents
    if not (Fullcode and Csscode and Alltxt):
        # Clear contents of the files
        open('fullCode.json', 'w').close()
        open('cssCode.json', 'w').close()
        open('all.txt', 'w').close()  # Close all.txt


    # #import trained data set
    from roboflow import Roboflow
    rf = Roboflow(api_key="m9FUSKdsX7mKElmIOqn8")
    project = rf.workspace("university-of-westminster-snot2").project("object-detection-meopq")
    model = project.version(12).model
    # infer on a local image
    locationDic= (model.predict(img, confidence=40, overlap=30).json())

    locationList = locationDic["predictions"]
    # visualize your prediction
    model.predict(img, confidence=40, overlap=30).save("prediction.jpg")

    # Read the image using OpenCV
    image = cv2.imread(img)
    # Initialize an empty list to store section dictionaries
    sectionList=[]
    # Loop through each location dictionary in locationList
    for i in range((len(locationList))):
        # Retrieve the current dictionary
        Dictionary =locationList[i]
        # Calculate the coordinates of the bounding box
        x1 = Dictionary["x"] - Dictionary["width"] / 2
        x2 = Dictionary["x"] + Dictionary["width"] / 2
        y1 = Dictionary['y'] - Dictionary["height"] / 2
        y2 = Dictionary['y'] + Dictionary['height'] / 2

        # Create a dictionary for the current section
        sectionDictionary={"x1":x1,"x2":x2,"y1":y1,"y2":y2,"class":Dictionary["class"],"width":Dictionary["width"],"height":Dictionary["height"]}
        # Append the section dictionary to sectionList
        sectionList.append(sectionDictionary)

    # Sort the sectionList based on y1 and x1 coordinates
    sortedList=(sorted(sectionList, key=lambda k: (k['y1'], k['x1'])))
    # Iterate over each dictionary in the sorted list
    for i in range(len(sortedList)):
         Dictionary=sortedList[i]
         # Extract region of interest (roi) from the image based on dictionary coordinates
         roi = image[int(Dictionary["y1"]):int(Dictionary["y2"]), int(Dictionary["x1"]):int(Dictionary["x2"])]
         # Save the extracted region as 'face.png'
         cv2.imwrite('face.png', roi)
         image2 = 'face.png'
         # Load API credentials from 'api.json' file
         API = json.load(open("api.json"))
         API_KEY = API['API_KEY']
         ENDPOINT = API['ENDPOINT']

         # Initialize Computer Vision client with API credentials
         cv_client = ComputerVisionClient(ENDPOINT, CognitiveServicesCredentials(API_KEY))

         # If the class of the dictionary is not "Card", perform OCR using the Computer Vision API
         if Dictionary["class"] != "Card":
             response = cv_client.read_in_stream(open(image2,'rb'),language='en', raw=True)


             operationLocation = response.headers["Operation-Location"]
             operation_id: object = operationLocation.split('/')[-1]
             time.sleep(5)
             result = cv_client.get_read_result(operation_id)


             if result.status == OperationStatusCodes.succeeded:
                 read_results = result.analyze_result.read_results
                 for analysed_result in read_results:
                     for line in analysed_result.lines:

                        #  print(line.text)
                        # Add the extracted text to the dictionary
                         Dictionary["text0"] = line.text
         else:
             # If the class of the dictionary is "Card", set the text as empty string
             Dictionary["text0"] = ""

         # Write the dictionary to 'all.txt' file
         file= open("all.txt", "a+",encoding="utf-8")
         file.write(str(Dictionary) + "\n")
         file.close()


def imageHeight():
    # Import the OpenCV library
    import cv2
    # Read the image using OpenCV
    image = cv2.imread("Uimage.png")
    # Get the height of the image (number of rows)
    height=image.shape[0]
    # Return the height of the image
    return height

def imageWidth():
    import cv2
    image = cv2.imread("Uimage.png")
    # Get the width of the image (number of columns)
    width=image.shape[1]
    # Return the width of the image
    return width

# sectionBreak()