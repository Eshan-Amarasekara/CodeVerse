#import roboflow data set

from roboflow import Roboflow
rf = Roboflow(api_key="m9FUSKdsX7mKElmIOqn8")
project = rf.workspace("university-of-westminster-snot2").project("object-detection-meopq")
dataset = project.version(12).download("yolov8")