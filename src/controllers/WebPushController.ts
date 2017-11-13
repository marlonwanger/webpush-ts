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


    if ( this.arrayObjectIndexOf(this.pushSubscriptions, req.body.Subscription.endpoint, "endpoint") === -1) {
      this.pushSubscriptions.push(req.body.Subscription);
    }

    res.send({
      text: "Web push subscribed",
      status: "200"
    });
  }

  unsubscribe(req: Request, res: Response): void {

    console.log("aew unsub");

    let subscriptionIndex: any = this.arrayObjectIndexOf(this.pushSubscriptions, req.body.Subscription.endpoint, "endpoint");

    if (subscriptionIndex >= 0) {

      this.pushSubscriptions.splice(subscriptionIndex, 1);
    }

    res.send({
      text: "Web push unsubscribe",
      status: 200
    });
  }

  countSubscritption(req: Request, res: Response): void {
    console.log("Count Subscription ", this.pushSubscriptions.length);

    res.send({
      status: "200",
      quantidade: this.pushSubscriptions.length
    });
  }

  sendNotification(pushSubscription: any, payload: any): void {
    if (pushSubscription) {
      this.webp.sendNotification(pushSubscription, payload)
        .then( res => {
          console.log("Enviado ", res);
        })
        .catch( error => {
          console.log("Error ao enviar ", error);
        });
    }
  }

  arrayObjectIndexOf (myArray: any, searchTerm: any, property: any): number {
    console.log("aew entrei");
    for (let i: number = 0, len: any = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) {

        return i;
      }
    }

    return -1;
  }
}