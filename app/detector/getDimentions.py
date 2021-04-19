import cv2 as cv
import numpy as np

image = np.zeros([400,800,3],dtype=np.uint8)
image.fill(255)

print(int(image.shape[0]/2),int(image.shape[1]/2))

line = cv.line(image,(int(image.shape[1]/2),0),(int(image.shape[1]/2),int(image.shape[0])),(0,255,0),5)
cv.imshow("testimage",image)

cv.waitKey(0)
cv.destroyAllWindows()