# Crypto Bot contest task

https://t.me/CryptoBotRU/365

All the contest files (designs, animations and task description) is on the contest-files dir.

See the showcase on the following video: https://www.youtube.com/watch?v=hGgdoX31LNc

Here are couple of screenshots:

![photo_2024-11-12_19-32-54](https://github.com/user-attachments/assets/a7436872-394e-42bc-8355-f49fda86e5fe)
![photo_2024-11-12_19-32-49](https://github.com/user-attachments/assets/01fff935-871b-4f25-a1c4-b76bb7f0ad44)
![photo_2024-11-12_19-32-44](https://github.com/user-attachments/assets/00330b0b-0544-4e27-9968-bd1c624cd476)
![photo_2024-11-12_19-32-39](https://github.com/user-attachments/assets/6da8a23c-030b-4f3c-8778-527f1b7fd846)


## Lottie converter

Used to convert lottie animations provided by the organizers into animated pngs. Why? Because lottie animations (at least provided ones) are quite heavy and CPU consuming while animating, well in case if you have 4 items then it's okay, but if you have 10 - 20 then it's a problem. So I've decided to convert lottie to apng, which is running with no problem.

## Client & Server

Located in the **client** and **server** folders, shared code is located in the **shared** folder. You can build client and server separately, by entering the folder and running ```yarn build```, but also you can build all of them at once by running ```./build.sh``` script located in the root directory.

## Running and developing locally

Just go to **client** and run ```yarn start```, then go to **server** and do the same, but before, make sure that you adjust settings in **Settings.ts** (bot token, crypto pay token, and so on). I was able to develop this app completely locally using fake DNS A record that points to my localhost (where I run ssl server), you can do the same using the service like this: http://my.local-ip.co/ (or google for more if that one doesn't work). Webhook setup (for both Telegram and CryptoPayApi) is solved using https://smee.io/, client is already included into the setup, so if you don't have to do anything yourself, just adjust the settings and the rest will be automatically covered.

## Deploying

Obviously you'll need mongodb, domain name, telegram bot, crypto pay account and so on. I won't focus on this. Running it on some kind of VDS is also not a problem, just look at the **Settings.ts** adjust it accordingly and run nginx with SSL in front of it.
