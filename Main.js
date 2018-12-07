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
    // let serverAdress: string = "https://webuser.hs-furtwangen.de/~del/birklehof/";
    let serverAdress = "http://localhost/birklehof/";
    function init(_event) {
        let domSendMail = document.getElementsByTagName("button")[0];
        let domSendData = document.getElementsByTagName("button")[1];
        domText = document.getElementsByTagName("textarea")[0];
        domSendMail.addEventListener("click", sendMail);
        domSendData.addEventListener("click", sendData);
    }
    function sendMail(_event) {
        console.group("sendMail");
        sendTextToServerAddress(domText.value, serverAdress + "sendMail.php");
        return;
    }
    function sendData(_event) {
        sendTextToServerAddress(domText.value, serverAdress + "storeData.php");
        return;
    }
    function sendTextToServerAddress(_text, _address) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Client sends: " + _text);
            let reqInfo = _address;
            let postData = createPostData(_text);
            let response = yield fetch(reqInfo, postData);
            console.log(yield response.text());
            console.groupEnd();
            return response;
        });
    }
    function createPostData(_text) {
        let data = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: _text
        };
        return data;
    }
})(BirklehofServerClient || (BirklehofServerClient = {}));
//# sourceMappingURL=Main.js.map