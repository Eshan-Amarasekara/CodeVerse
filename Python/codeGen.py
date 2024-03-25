import pandas as pd
import ast
import sectionBreak
import CssData
import json
class CodeGen:
    # Clear contents of 'fullCode.json' when the class is defined
    open('fullCode.json', 'w').close()

    def __init__(self,img):
        self.img = img

    def generateCode(self):


        excel_file_path = 'HTML TAGS DATASET.xlsx'

        # Read the Excel file into a DataFrame
        df = pd.read_excel(excel_file_path)
        # Call sectionBreak function from the imported module
        sectionBreak.sectionBreak(self.img)
        # Open and read contents from 'all.txt' file
        file = open("all.txt", "r")
        allList = []
        repeatList = []
        htmlCodeList=[]
        for i in file:
            allList.append(i)

        # Define function for starting basic HTML code
        def basic_html_code_start():
            # Define HTML code for the start of the document
            htmlCode='''<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>My First HTML Page</title> <style>'''
            # Append the HTML code to htmlCodeList
            htmlCodeList.append(htmlCode)

        # Define function for ending basic HTML code
        def basic_html_code_end():
            # Define HTML code for the end of the document
            htmlCode ='''</body> </html>'''
            # Append the HTML code to htmlCodeList
            htmlCodeList.append(htmlCode)


        def generate_tag(Class):
            element_to_generate = Class  # Replace with the actual index you want

            row_index = \
                df.index[df.apply(lambda row: row.astype(str).str.contains(element_to_generate).any(), axis=1)].tolist()[0]
            # Get the opening tag from the DataFrame
            open_tag = df.loc[row_index, df.columns[1]]

            return open_tag


        def close_tag(Class):
            element_to_generate = Class  # Replace with the actual index you want

            row_index = \
                df.index[df.apply(lambda row: row.astype(str).str.contains(element_to_generate).any(), axis=1)].tolist()[0]
            # Get the closing tag from the DataFrame
            close_tag = df.loc[row_index, df.columns[4]]

            return close_tag


        def Inner_Open_Tag(Class):
            # Find the index of the row containing the class in the DataFrame
            element_to_generate = Class
            row_index = \
                df.index[df.apply(lambda row: row.astype(str).str.contains(element_to_generate).any(), axis=1)].tolist()[0]
            # Get the inner opening tag from the DataFrame
            Inner_Tag = df.loc[row_index, df.columns[2]]
            return Inner_Tag


        def Inner_Close_Tag(Class):
            # Find the index of the row containing the class in the DataFrame
            element_to_generate = Class
            row_index = \
                df.index[df.apply(lambda row: row.astype(str).str.contains(element_to_generate).any(), axis=1)].tolist()[0]
            # Get the inner closing tag from the DataFrame
            Inner_C_Tag = df.loc[row_index, df.columns[3]]
            return Inner_C_Tag

        def count(Class, y1,x1):
            # Initialize count to 1
            Count = 1
            # Loop through each element in allList starting from the second element
            for next in range(1, len(allList)):
                # Convert the string to a dictionary
                Dict3 = ast.literal_eval(allList[next])
                # Check if the class and y1 of the current dictionary match the inputs
                if (Class == Dict3["class"]) and (y1 >= Dict3['y1']):
                    # Check if y1 is exactly equal to Dict3's y1
                    if (y1 == Dict3["y1"]):
                        # Check if x1 is exactly equal to Dict3's x1
                        if (x1 == Dict3["x1"]):
                            break
                        else:
                            # Increment count if x1 is not equal to Dict3's x1
                            Count = Count + 1
                    else:
                        # Increment count if y1 is greater than Dict3's y1
                        Count = Count + 1
            return Count

        def inside(Dict):
            # Loop through each element in allList starting from the second element
            for after in range(1, len(allList)):
                # Convert the string to a dictionary
                Dict4 = ast.literal_eval(allList[after])
                # Check if Dict4's x1 and y1 are within the range of Dict's x1, x2, y1, y2
                if Dict["x1"] < Dict4["x1"] < Dict["x2"] and Dict["y1"] < Dict4["y1"] < Dict["y2"]:
                    repeatList.append(Dict4)

            # Initialize Boolean to True
            Boolean = True

            # Check if Dict is in repeatList
            for i in range(len(repeatList)):
                if Dict == repeatList[i]:
                    Boolean = False
            return Boolean


        def responsive():
            for tag in range(0, len(allList)):
                Dictionary = ast.literal_eval(allList[tag])




        basic_html_code_start()

        # Loop through each element in allList
        for tag in range(0, len(allList)):
            # Convert the string to a dictionary
            dictionary = ast.literal_eval(allList[tag])
            # Extract necessary values from the dictionary
            Class1 = dictionary['class']
            y1 = dictionary["y1"]
            x1 = dictionary["x1"]
            # Count occurrences of Class1 based on y1 and x1
            tagNumber = count(Class1, y1,x1)
            # Check if dictionary is inside another dictionary
            echo = inside(dictionary)

        # Call mustData and crateCss methods from CssData class
        CssData.mustData()
        CssData.crateCss()
        # Get the CSS data
        css=CssData.printCss()
        print (len(css))

        # Add CSS data to htmlCodeList
        for i in range(0,len(css)):
            htmlCodeList.append(css[i])


        # Add closing tags to htmlCodeList
        htmlCodeList.append("</style>")
        htmlCodeList.append("</head>")
        htmlCodeList.append("<body>")

        # Loop through each element in allList
        for i in range(0, len(allList)):
            # Convert the string to a dictionary
            Dict = ast.literal_eval(allList[i])
            # Extract necessary values from the dictionary
            Class1 = Dict['class']
            y1 = Dict["y1"]
            x1 = Dict["x1"]
            # Count occurrences of Class1 based on y1 and x1
            tagNumber = count(Class1, y1,x1)
            # Check if dictionary is inside another dictionary
            echo = inside(Dict)
            # If dictionary is not inside another dictionary, skip to the next iteration
            if echo == False:
                continue

            # Check if Class1 is "Navigation Bar"
            if Class1 == "Navigation Bar":
                Nav_text = Dict["text0"]
                # Append inner opening tag for Navigation Bar
                htmlCodeList.append("         " + generate_tag(Class1) + " class = " +"NavigationBar" + str(tagNumber) + ">")
                for text in range(len(Nav_text)):
                    htmlCodeList.append("             " + Inner_Open_Tag(Class1)+">" + str(Nav_text))
                    htmlCodeList.append("             " + Inner_Close_Tag(Class1))
                # Append closing tag for Navigation Bar
                htmlCodeList.append("         " + close_tag(Class1))
                print(htmlCodeList)
            else:
                # Append opening tag for non-Navigation Bar elements
                htmlCodeList.append("         " + generate_tag(Class1) + " class = " + Class1 + str(tagNumber) + ">" + str(Dict["text0"]))
                # Check for nested elements
                for j in range(1, len(allList)):
                    Dict1 = ast.literal_eval(allList[j])
                    if Dict["x1"] < Dict1["x1"] < Dict["x2"] and Dict["y1"] < Dict1["y1"] < Dict["y2"]:
                        Class2 = Dict1["class"]
                        # Append opening tag for nested element
                        htmlCodeList.append("             " + generate_tag(Class2) + " class = " + Class2 + str(tagNumber) + ">" + str(Dict1["text0"]))
                        # Append closing tag for nested element

                        htmlCodeList.append("             " + close_tag(Class2))
                htmlCodeList.append("         " + close_tag(Class1))
                # Append closing tag for non-Navigation Bar elements

        basic_html_code_end()
        # print(htmlCodeList)
        # Clear contents of 'all.txt'
        open('all.txt', 'w').close()

        # Define function to return full code
        def fullCode():
            return {"me": htmlCodeList
                    }

        # Convert full code to JSON format and write to file
        json_object = json.dumps(fullCode(),indent=4)
        with open("fullCode.json", "w") as outfile:
            outfile.write(json_object)