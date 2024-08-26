// import bitmoroService from "bitmoro";

// let bitmoro = new bitmoroService("ef4ff9305a64cfeb6325a57747cfba760463248fbba1d92efd5adcfa1518");

// // // Test sendMessage
// // let data = bitmoro.sendMessage("Hello", ["9841452888"]);
// // console.log(data);

// // Test sendOtp
// let otp = await bitmoro.sendOtp(["9841452888"]);
// console.log(otp);

// // // Test verifyOtp
// // let isValid = bitmoro.verifyOtp("9841452888", otp);
// // console.log(isValid);

// // // Test resendOtp
// // let newOtp = bitmoro.resendOtp("9841452888");
// // console.log(newOtp);

import bitmoroService from "bitmoro";

async function test()
{let bitmoro= new bitmoroService("ef4ff9305a64cfeb6325a57747cfba760463248fbba1d92efd5adcfa1518");
    let data= await bitmoro.sendMessage("Hello",["9869363132"]);
    let otp= await bitmoro.sendOtp(["9869363132"],30);
    let verify=bitmoro.verifyOtp(["9869363132"],otp);
    if(verify)
    {
        console.log("verified")
    }

}
test();