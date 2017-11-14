import { Router } from "express";
import { WebPushController } from "../controllers/WebPushController";


class WebPushRouter {

  router: Router;
  webPushController: WebPushController;

  constructor() {

    this.router = Router();
    this.webPushController = new WebPushController();
    this.routerLoader();
  }

  routerLoader(): void {

    this.router.post("/subscription", (request, response) => {
      this.webPushController.subscription(request, response);
    });

    this.router.post("/sendpush", (request, response) => {
      this.webPushController.sendpush(request, response);
    });

    // this.router.post("/sendpush", (request, response) => {
    //   this.webPushController.sendNotification(request, response);
    // });
  }
}

const webPushRouter: WebPushRouter = new WebPushRouter();
webPushRouter.routerLoader();
export default webPushRouter.router;