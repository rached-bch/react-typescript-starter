//let Dispatcher = require("flux");
//import Dispatcher from "flux";

//export default new Dispatcher();
// const Dispatcher = () => {
//   let Dispatcher = require("flux");
//   return new Dispatcher();
// };
// export default  const Dispatcher = (function() {
//   let Dispatcher = require("flux");
//   return new Dispatcher();
// })();

import * as Flux from "flux";
let Dispatcher = new Flux.Dispatcher();
export default Dispatcher;
