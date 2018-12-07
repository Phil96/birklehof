namespace BirklehofServerClient {
    window.addEventListener("load", init);
    let domText: HTMLTextAreaElement;
    let serverAdress: string = "http://localhost/birklehof/";

    function init(_event: Event): void {
        let domSendMail: HTMLButtonElement = document.getElementsByTagName("button")[0];
        let domSendData: HTMLButtonElement = document.getElementsByTagName("button")[1];
        domText = document.getElementsByTagName("textarea")[0];
        domSendMail.addEventListener("click", sendMail);
        domSendData.addEventListener("click", sendData);
    }

    function sendMail(_event: Event): void {
        console.log("sendMail");
        sendTextToServerAddress(domText.value, serverAdress + "sendMail.php");
        return;
    }

    function sendData(_event: Event): void {
        return;
    }

    async function sendTextToServerAddress(_text: string, _address: string): Promise<Response> {
        console.log("Sending: " + _text);
        let reqInfo: RequestInfo = _address;
        let postData: Object = createPostData(_text);
        let response: Response = await fetch(reqInfo, postData);
        console.log(await response.text());
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