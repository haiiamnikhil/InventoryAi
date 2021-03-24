import matplotlib.pyplot as plt
import matplotlib.patches as patches
from PIL import Image

im = Image.open('../media/detected/2O6bgAyZjn.jpg')

# Create figure and axes
fig, ax = plt.subplots()

# Display the image
ax.imshow(im)
plt.gca().invert_yaxis()
# Create a Rectangle patch
rect = patches.Rectangle((16, 11), 125, 178, linewidth=1, edgecolor='r', facecolor='none')

# Add the patch to the Axes
ax.add_patch(rect)

plt.show()