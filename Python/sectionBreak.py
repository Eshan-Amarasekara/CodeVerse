import time


def sectionBreak(img):

    import json
    from msrest.authentication import CognitiveServicesCredentials
    from azure.cognitiveservices.vision.computervision import ComputerVisionClient
    from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes,VisualFeatureTypes
    import requests
    from PIL import Image ,ImageDraw,ImageFont
    import cv2

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



    image = cv2.imread(img)
    sectionList=[]
    for i in range((len(locationList))):
        Dictionary =locationList[i]
        x1 = Dictionary["x"] - Dictionary["width"] / 2
        x2 = Dictionary["x"] + Dictionary["width"] / 2
        y1 = Dictionary['y'] - Dictionary["height"] / 2
        y2 = Dictionary['y'] + Dictionary['height'] / 2


        sectionDictionary={"x1":x1,"x2":x2,"y1":y1,"y2":y2,"class":Dictionary["class"],"width":Dictionary["width"],"height":Dictionary["height"]}
        sectionList.append(sectionDictionary)



    sortedList=(sorted(sectionList, key=lambda k: (k['y1'], k['x1'])))
    for i in range(len(sortedList)):
         Dictionary=sortedList[i]
         roi = image[int(Dictionary["y1"]):int(Dictionary["y2"]), int(Dictionary["x1"]):int(Dictionary["x2"])]
         cv2.imwrite('face.png', roi)
         image2 = 'face.png'
         API = json.load(open("api.json"))
         API_KEY = API['API_KEY']
         ENDPOINT = API['ENDPOINT']

         cv_client = ComputerVisionClient(ENDPOINT, CognitiveServicesCredentials(API_KEY))

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
                         Dictionary["text0"] = line.text
         else:
             Dictionary["text0"] = ""

         file= open("all.txt", "a+")
         file.write(str(Dictionary) + "\n")
         file.close()
         cv2.destroyAllWindows()

def imageHeight():
    import cv2
    image = cv2.imread("Uimage.png")
    height=image.shape[0]
    return height

def imageWidth():
    import cv2
    image = cv2.imread("Uimage.png")
    width=image.shape[1]
    return width

# sectionBreak()