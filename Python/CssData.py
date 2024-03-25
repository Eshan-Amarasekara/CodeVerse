
import json
import sectionBreak
import ast


open('cssCode.json', 'w').close()

def list  ():
    repeatList = []
    return repeatList

def classList ():
    repeatClass = []
    return repeatClass
def mustData():
    allList = []
    file = open("all.txt", "r")
    for i in file:
        allList.append(i)
    return allList
def imageWidth():
    width = sectionBreak.imageWidth()
    return width

def imageHeight():
    height = sectionBreak.imageHeight()
    return height


def count(Class, y1,x1):
    newList=mustData()
    Count = 1
    for next in range(1, len(newList)):
        Dict3 = ast.literal_eval(newList[next])
        if (Class == Dict3["class"]) and (y1 >= Dict3['y1']):
            if (y1==Dict3["y1"]):
                if (x1==Dict3["x1"]):
                    break
                else:
                    Count = Count + 1
            else:
                Count = Count + 1
    return Count


def crateCss():
    classCss = []
    rList = list()
    clist = classList()
    newList = mustData()

    for i in range(0, len(newList)):
        dictionary = ast.literal_eval(newList[i])
        for j in range(0, len(newList)):
            Dict1 = ast.literal_eval(newList[j])
            Class = Dict1["class"]
            y1 = (Dict1['y1'])
            x1 = Dict1['x1']
            count1 = count(Class, y1,x1)
            if dictionary["x1"] < Dict1["x1"] < dictionary["x2"] and dictionary["y1"] < Dict1["y1"] < dictionary["y2"]:

                    clist.append(Dict1)
                    Dict = {
                        Dict1["class"]+str(count1):
                            {
                            "width:":str(((((Dict1["width"]) /imageWidth()) * 100)/6)*16)+"%",
                            "height:":str(((((Dict1["height"]) /imageHeight()) * 100)/6)*16)+"%",
                            "left:": str(((Dict1["x1"]) / imageWidth()) * 100)+"%",
                            "top:": str(((Dict1["y1"]) / imageHeight()) * 100)+"%"
                            }
                        }
                    classCss.append(Dict)

    for a in range(0,len(clist)):
        clist[a]=str(clist[a])+"\n"
    for j in range(0, len(newList)):
        Dict1 = ast.literal_eval(newList[j])
        Class = Dict1["class"]
        y1 = (Dict1['y1'])
        x1 = Dict1['x1']
        count1 = count(Class, y1, x1)
        rList=str(newList[j])
        if rList in clist:
            continue
        else:

            Dict = {
                Dict1["class"] + str(count1):
                    {
                        "border:": "1px solid black",
                        "position:": "fixed",
                        "width:": str(((Dict1["width"]) / imageWidth()) * 100)+"%",
                        "height:": str(((Dict1["height"]) / imageHeight()) * 100)+"%",
                        "left:": str(((Dict1["x1"]) / imageWidth()) * 100)+"%",
                        "top:": str(((Dict1["y1"]) / imageHeight()) * 100)+"%"
                    }
            }
            classCss.append(Dict)


    json_object = json.dumps(classCss,indent=4)
    with open("cssCode.json", "a") as outfile:
        outfile.write(json_object)


def convertTuple(tup):
    Str = ''.join(tup)
    return Str
def printCss():
    cssCodeList = []
    f = open('cssCode.json')
    data = json.load(f)

    for i in range(0,len(data)):
        for key in data[i].keys():
            cssCodeList.append("."+key+"{")
            for key2 in data[i][key].keys():
                code="     "+key2,data[i][key][key2]+";"
                newCode=convertTuple(code)
                cssCodeList.append(newCode)
            cssCodeList.append("}")
    f.close()

    return cssCodeList
