def sectionBreak():

    #import open cv
    import cv2
    import easyocr
    #import trained data set
    from roboflow import Roboflow
    rf = Roboflow(api_key="m9FUSKdsX7mKElmIOqn8")
    project = rf.workspace("university-of-westminster-snot2").project("object-detection-meopq")
    model = project.version(12).model
    # infer on a local image
    locationDic= (model.predict("image.png", confidence=40, overlap=30).json())

    locationList = locationDic["predictions"]
    # visualize your prediction
    model.predict("image.png", confidence=40, overlap=30).save("prediction.jpg")



    image = cv2.imread("image.png")
    sectionList=[]
    for i in range((len(locationList))):
        Dictionary =locationList[i]
        x1 = Dictionary["x"] - Dictionary["width"] / 2
        x2 = Dictionary["x"] + Dictionary["width"] / 2
        y1 = Dictionary['y'] - Dictionary["height"] / 2
        y2 = Dictionary['y'] + Dictionary['height'] / 2


        sectionDictionary={"x1":x1,"x2":x2,"y1":y1,"y2":y2,"class":Dictionary["class"],"width":Dictionary["width"],"height":Dictionary["height"]}
        sectionList.append(sectionDictionary)

    # print(sorted(sectionList, key=itemgetter('y1')))

    sortedList=(sorted(sectionList, key=lambda k: (k['y1'], k['x1'])))
    for i in range(len(sortedList)):
        Dictionary=sortedList[i]
        roi = image[int(Dictionary["y1"]):int(Dictionary["y2"]), int(Dictionary["x1"]):int(Dictionary["x2"])]
        reader = easyocr.Reader(['en'])
        text_ = reader.readtext(roi,detail=0, paragraph=True)
        if len(text_)==0 :
            Dictionary["text"] = "no"
        else:
            Dictionary["text"]=text_

        file= open("all.txt", "a+")
        file.write(str(Dictionary) + "\n")
        file.close()
        cv2.waitKey(0)
        cv2.destroyAllWindows()

def imageHeight():
    import cv2
    image = cv2.imread("image.png")
    height=image.shape[0]
    return height

def imageWidth():
    import cv2
    image = cv2.imread("image.png")
    width=image.shape[1]
    return width