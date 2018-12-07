namespace BirklehofServerClient {
    window.addEventListener("load", init);
    let domText: HTMLTextAreaElement;
    // let serverAdress: string = "https://webuser.hs-furtwangen.de/~del/birklehof/";
    let serverAdress: string = "http://localhost/birklehof/";

    function init(_event: Event): void {
        let domSendMail: HTMLButtonElement = document.getElementsByTagName("button")[0];
        let domSendData: HTMLButtonElement = document.getElementsByTagName("button")[1];
        let domLoadData: HTMLButtonElement = document.getElementsByTagName("button")[2];
        domText = document.getElementsByTagName("textarea")[0];
        domSendMail.addEventListener("click", sendMail);
        domSendData.addEventListener("click", sendData);
        domLoadData.addEventListener("click", loadData);
    }

    async function sendMail(_event: Event): Promise<Response> {
        console.group("sendMail");
        let response: Response = await sendTextToServerAddress(domText.value, serverAdress + "sendMail.php");
        console.log("Response : " + await response.text());
        console.groupEnd();
        return;
    }

    async function sendData(_event: Event): Promise<Response> {
        console.group("sendData");
        let response: Response = await sendTextToServerAddress(domText.value, serverAdress + "storeData.php");
        console.log("Response : " + await response.text());
        console.groupEnd();
        return;
    }

    async function loadData(_event: Event): Promise<Response> {
        console.group("loadData");
        let response: Response = await sendTextToServerAddress("", serverAdress + "ordered.json");
        console.log("Response : " + await response.text());
        console.groupEnd();
        return;
    }

    async function sendTextToServerAddress(_text: string, _address: string): Promise<Response> {
        console.log("Client sends: " + _text);
        let reqInfo: RequestInfo = _address;
        let postData: Object = createPostData(_text);
        let response: Promise<Response> = fetch(reqInfo, postData);
        return response;
    }

    function createPostData(_text: string): Object {
        let data: Object = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: _text
        };
        return data;
    }
}