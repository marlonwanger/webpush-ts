import { Response, Request, NextFunction } from "express";
import { config } from "../config/config";
import * as webpush from "web-push";

export class WebPushController {

  webp: webpush;
  pushSubscriptions = [];

  constructor() {

    this.config();
  }

  config(): void {
    this.webp = webpush.setVapidDetails(
      "mailto:marlonsoftwares@gmail.com",
      config.VAPID_PUBLIC_KEY,
      config.VAPID_PRIVATE_KEY
    );
  }

  subscription(req: Request, res: Response): void {

    console.log("aew");

    if ( this.arrayObjectIndexOf(this.pushSubscriptions, req.body.subscription.endpoint, "endpoint") === -1) {
      this.pushSubscriptions.push(req.body.subscription);
    }

    res.send({
      text: "Web push subscribed",
      status: "200"
    });
  }

  unsubscribe(req: Request, res: Response): void {

    console.log("aew unsub");

    let subscriptionIndex: any = this.arrayObjectIndexOf(this.pushSubscriptions, req.body.subscription.endpoint, "endpoint");

    if (subscriptionIndex >= 0) {

      this.pushSubscriptions.splice(subscriptionIndex, 1);
    }

    res.send({
      text: "Web push unsubscribe",
      status: 200
    });
  }

  countSubscritption(req: Request, res: Response): void {
    console.log("Count Subscription ");

    res.send({
      status: "200",
      quantidade: 1
    });
  }

  sendNotification(req: Request, res: Response): void {
    if (this.pushSubscriptions) {
      webPush.sendNotification(pushSubscription, payload)
        .then(function (response) {
          logger.info('Push sent')
          logger.debug(payload)
          logger.debug(response)
        })
        .catch(function (error) {
          logger.error('Push error: ', error)
        });
    }
  }

  arrayObjectIndexOf (myArray: any, searchTerm: any, property: any): number {

    for (let i: number = 0, len: any = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) {

        return i;
      }
    }

    return -1;
  }
}