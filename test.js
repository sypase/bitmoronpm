import bitmoroService from "bitmoro";

let bitmoro= new bitmoroService("f5012326ed00c2ca6293f4166b72e124908f62b7b154d3ae8efd24ffb8ec");
let data=bitmoro.sendMessage("Hello",["9841452888"]);
console.log(data);
