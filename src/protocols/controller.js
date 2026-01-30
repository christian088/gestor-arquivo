import { Controller } from "./Controller.js";

export class LoginController extends Controller {
  async handle(httpRequest) {
    return {
      statusCode: 200,
      body: { ok: true },
    };
  }
}
