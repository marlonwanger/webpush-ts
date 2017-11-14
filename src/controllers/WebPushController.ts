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
    webpush.setVapidDetails(
      "mailto:mail@gmail.com",
      config.VAPID_PUBLIC_KEY,
      config.VAPID_PRIVATE_KEY
    );
  }

  subscription(req: Request, res: Response): void {


    if ( this.arrayObjectIndexOf(this.pushSubscriptions, req.body.Subscription.endpoint, "endpoint") === -1) {
      this.pushSubscriptions.push(req.body.Subscription);
    }

    res.send({
      text: "Web Push Subscribed",
      status: "200"
    });
  }

  unsubscribe(req: Request, res: Response): void {

    let subscriptionIndex: any = this.arrayObjectIndexOf(this.pushSubscriptions, req.body.Subscription.endpoint, "endpoint");

    if (subscriptionIndex >= 0) {

      this.pushSubscriptions.splice(subscriptionIndex, 1);
    }

    res.send({
      text: "Web Push Unsubscribed",
      status: 200
    });
  }

  sendpush(req: Request, res: Response): void {

    const notificationData: any = {};

    notificationData.notification = {
      title: req.body.title,
      body: req.body.body_push,
      icon: req.body.icon,
      tag: "message-tag"
    };


    for( let item of this.pushSubscriptions) {
      console.log(item);
      this.sendNotification(item, JSON.stringify(notificationData));
    }

    res.send({
      text: "The message notification has been sent",
      status: "200"
    });

  }

  sendNotification(pushSubscription: any, payload: any): void {

    if(pushSubscription) {

      webpush.sendNotification(pushSubscription, payload)
      .then( res => {
        console.log("Sent ", res);
      })
      .catch( error => {
        console.log("Error sending ", error);
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