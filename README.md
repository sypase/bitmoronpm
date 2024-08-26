
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