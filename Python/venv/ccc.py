import cv2
image = cv2.imread("F:\SDGP\check\imagecheck1.png")
y1=852
y2=1194
x1=1211
x2=2373
roi = image[y1:y2, x1:x2]
cv2.imshow('so', roi)
cv2.imwrite("../card.jpg", roi)
cv2.waitKey(0)
cv2.destroyAllWindows()