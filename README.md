# Crypto Bot contest task

https://t.me/CryptoBotRU/365

All the contest files (designs, animations and task description) is on the contest-files dir.

## Lottie converter

Used to convert lottie animations provided by the organizers into animated pngs. Why? Because lottie animations (at least provided ones) are quite heavy and CPU consuming while animating, well in case if you have 4 items then it's okay, but if you have 10 - 20 then it's a problem. So I've decided to convert lottie to apng, which is running with no problem.

## Client & Server

Located in the **client** and **server** folders, shared code is located in the **shared** folder. You can build client and server separately, by entering the folder and running ```yarn build```, but also you can build all of them at once by running ```./build.sh``` script located in the root directory.
