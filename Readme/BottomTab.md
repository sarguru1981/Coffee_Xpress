
## Bottom Tab Navigation Bar

In this section, I will explain you what is been done for designing the animated bottom tab

### Create Icons

1. Go to the [Icomoon] website(https://icomoon.io/app/#/select). 

2. Select the icons needed for the app

3. Tap on __Generate Font__ button at the bottom of the screen

4. You will be finding the list of selected icons. Rename the icons if needed

5. Tap on __Download__ button at the bottom of the screen

6. A __zip__ file will be downloaded. Decompress it.

7. Copy and Paste the __selection.json__ file in the root of our project folder

8. Create folder **assets->fonts** in the root of our project folder

9. Copy the __icomoon.ttf__ file from the decompressed folder and paste it inside the __assets -> fonts__ folder

### Designing Bottom Tab

1. For the icons of the bottom bar, it needs to be picked from the __selection.json__ file.

2. Create a folder __widgets__ under __src -> presentation -> components__ and add the custom_icon & custom_icons files

3. Create a set screens to be navigated while tapping on the bottom bar

4. Create a folder __navigation__ under __src -> presentation -> components__ and add the UI implementation for Bottom navigation

### App.tsx

Add the tab navigation in the App.tsx file