import pandas as pd
import ast
import sectionBreak
import CssData
import json
class CodeGen:
    open('fullCode.json', 'w').close()

    def __init__(self,img):
        self.img = img

    def generateCode(self):


        excel_file_path = 'HTML TAGS DATASET.xlsx'

        # Read the Excel file into a DataFrame
        df = pd.read_excel(excel_file_path)
        sectionBreak.sectionBreak(self.img)
        file = open("all.txt", "r")
        allList = []
        repeatList = []
        htmlCodeList=[]
        for i in file:
            allList.append(i)

        def basic_html_code_start():
            htmlCode='''<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>My First HTML Page</title> <style>'''
            htmlCodeList.append(htmlCode)


        def basic_html_code_end():
            htmlCode ='''</body> </html>'''
            htmlCodeList.append(htmlCode)


        def generate_tag(Class):
            element_to_generate = Class  # Replace with the actual index you want

            row_index = \
                df.index[df.apply(lambda row: row.astype(str).str.contains(element_to_generate).any(), axis=1)].tolist()[0]

            open_tag = df.loc[row_index, df.columns[1]]

            return open_tag


        def close_tag(Class):
            element_to_generate = Class  # Replace with the actual index you want

            row_index = \
                df.index[df.apply(lambda row: row.astype(str).str.contains(element_to_generate).any(), axis=1)].tolist()[0]

            close_tag = df.loc[row_index, df.columns[4]]

            return close_tag


        def Inner_Open_Tag(Class):
            element_to_generate = Class
            row_index = \
                df.index[df.apply(lambda row: row.astype(str).str.contains(element_to_generate).any(), axis=1)].tolist()[0]

            Inner_Tag = df.loc[row_index, df.columns[2]]
            return Inner_Tag


        def Inner_Close_Tag(Class):
            element_to_generate = Class
            row_index = \
                df.index[df.apply(lambda row: row.astype(str).str.contains(element_to_generate).any(), axis=1)].tolist()[0]

            Inner_C_Tag = df.loc[row_index, df.columns[3]]
            return Inner_C_Tag

        def count(Class, y1,x1):
            Count = 1
            for next in range(1, len(allList)):
                Dict3 = ast.literal_eval(allList[next])
                if (Class == Dict3["class"]) and (y1 >= Dict3['y1']):
                    if (y1 == Dict3["y1"]):
                        if (x1 == Dict3["x1"]):
                            break
                        else:
                            Count = Count + 1
                    else:
                        Count = Count + 1
            return Count

        def inside(Dict):
            for after in range(1, len(allList)):
                Dict4 = ast.literal_eval(allList[after])
                if Dict["x1"] < Dict4["x1"] < Dict["x2"] and Dict["y1"] < Dict4["y1"] < Dict["y2"]:
                    repeatList.append(Dict4)

            Boolean = True
            for i in range(len(repeatList)):
                if Dict == repeatList[i]:
                    Boolean = False
            return Boolean


        def responsive():
            for tag in range(0, len(allList)):
                Dictionary = ast.literal_eval(allList[tag])




        basic_html_code_start()


        for tag in range(0, len(allList)):
            dictionary = ast.literal_eval(allList[tag])
            Class1 = dictionary['class']
            y1 = dictionary["y1"]
            x1 = dictionary["x1"]
            tagNumber = count(Class1, y1,x1)
            echo = inside(dictionary)

        CssData.mustData()
        CssData.crateCss()
        css=CssData.printCss()
        print (len(css))

        for i in range(0,len(css)):
            htmlCodeList.append(css[i])

        print(htmlCodeList)

        htmlCodeList.append("</style>")
        htmlCodeList.append("</head>")
        htmlCodeList.append("<body>")

        for i in range(0, len(allList)):
            Dict = ast.literal_eval(allList[i])
            Class1 = Dict['class']
            y1 = Dict["y1"]
            x1 = Dict["x1"]
            tagNumber = count(Class1, y1,x1)
            echo = inside(Dict)
            if echo == False:
                continue

            if Class1 == "Navigation Bar":
                Nav_text = Dict["text0"]
                htmlCodeList.append("         " + generate_tag(Class1) + " class = " +"NavigationBar" + str(tagNumber) + ">")
                for text in range(len(Nav_text)):
                    htmlCodeList.append("             " + Inner_Open_Tag(Class1)+">" + str(Nav_text))
                    htmlCodeList.append("             " + Inner_Close_Tag(Class1))
                htmlCodeList.append("         " + close_tag(Class1))
                print(htmlCodeList)
            else:

                htmlCodeList.append("         " + generate_tag(Class1) + " class = " + Class1 + str(tagNumber) + ">" + str(Dict["text0"]))
                for j in range(1, len(allList)):
                    Dict1 = ast.literal_eval(allList[j])
                    if Dict["x1"] < Dict1["x1"] < Dict["x2"] and Dict["y1"] < Dict1["y1"] < Dict["y2"]:
                        Class2 = Dict1["class"]
                        htmlCodeList.append("             " + generate_tag(Class2) + " class = " + Class2 + str(tagNumber) + ">" + str(Dict1["text0"]))

                        htmlCodeList.append("             " + close_tag(Class2))
                htmlCodeList.append("         " + close_tag(Class1))
                print(htmlCodeList)
        basic_html_code_end()
        # print(htmlCodeList)
        open('all.txt', 'w').close()
        def fullCode():
            return {"me": htmlCodeList
                    }

        json_object = json.dumps(fullCode(),indent=4)
        with open("fullCode.json", "w") as outfile:
            outfile.write(json_object)