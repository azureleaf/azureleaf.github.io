#!/bin/bash

edit()
{
    FNAME=$1

    # Crop
    # output_width : output_height : x of the top-left rectangle origin : y of the top-left rectangle origin
    if [ ! -f "cropped/"$FNAME"_cropped.png" ]
    then
        ffmpeg -i $FNAME".png" -filter:v "crop=1330:1008:0:35" -c:a copy "cropped/"$FNAME"_cropped.png"
    fi

    # Resize
    if [ ! -f "resized/"$FNAME"_resized.png" ]
    then
        ffmpeg -i "cropped/"$FNAME"_cropped.png" -vf scale=800:-1 "resized/"$FNAME"_resized.png"
    fi
}

# Create the dirs in advance
mkdir -p cropped
mkdir -p resized

# Loop for all the images
for i in {101..110} {301..310}
do
    edit $i
done

