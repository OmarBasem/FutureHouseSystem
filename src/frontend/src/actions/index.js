// In this file, you import all your functions in the actions folder and export them, so you can easily import them from any screen, or component,
// by just specifying the actions folder, without having to specify the specific file or function.

import * as auth from "./auth";
import * as houses from './houses'

export {
  auth,
  houses
}