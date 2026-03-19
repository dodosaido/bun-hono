import app from "../../api/index";

export const onRequest = (context: any) => {
  return app.fetch(context.request);
};
