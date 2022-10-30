from PIL import Image
import os


def myCrop(input, height, width, area):
    im = Image.open(input)
    im = im.resize((700, 700), Image.ANTIALIAS)
    imgwidth, imgheight = im.size
    for i in range(0,imgheight,height):
        for j in range(0,imgwidth,width):
            box = (j, i, j+width, i+height)
            a = im.crop(box)
            try:
                o = a.crop(area)
                o.save('./out/page'+str(i// 100)+'_'+str(j // 100)+'.jpg')
            except:
                pass

def main():
    input = os.path.join("test-map.jpeg")
    height = 100
    width = 100
    area = (0, 0, 100, 100)
    myCrop(input, height, width, area)

main()
print("Done")