var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var BirklehofServerClient;
(function (BirklehofServerClient) {
    window.addEventListener("load", init);
    let domText;
    let serverAdress = "http://localhost/birklehof/";
    function init(_event) {
        let domSendMail = document.getElementsByTagName("button")[0];
        let domSendData = document.getElementsByTagName("button")[1];
        domText = document.getElementsByTagName("textarea")[1];
        domSendMail.addEventListener("click", sendMail);
        domSendData.addEventListener("click", sendData);
    }
    function sendMail(_event) {
        console.log("sendMail");
        sendTextToServerAddress("Hallo", serverAdress + "sendMail.php");
        return;
    }
    function sendData(_event) {
        return;
    }
    function sendTextToServerAddress(_text, _address) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqInfo = _address;
            let response = yield fetch(reqInfo);
            console.log(response);
        });
    }
})(BirklehofServerClient || (BirklehofServerClient = {}));
//# sourceMappingURL=Main.js.map