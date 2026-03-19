// import app from "../../api/index";
//
// export default {
//     fetch: app.fetch,
// };

import app from "../../api/index";

export const onRequest = (context: any) => {
  return app.fetch(context.request);
};
