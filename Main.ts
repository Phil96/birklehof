namespace BirklehofServerClient {
    window.addEventListener("load", init);
    let domText: HTMLTextAreaElement;
    let serverAdress: string = "http://localhost/birklehof/";

    function init(_event: Event): void {
        let domSendMail: HTMLButtonElement = document.getElementsByTagName("button")[0];
        let domSendData: HTMLButtonElement = document.getElementsByTagName("button")[1];
        domText = document.getElementsByTagName("textarea")[1];
        domSendMail.addEventListener("click", sendMail);
        domSendData.addEventListener("click", sendData);
    }

    function sendMail(_event: Event): void {
        console.log("sendMail");
        sendTextToServerAddress("Hallo", serverAdress + "sendMail.php");
        return;
    }

    function sendData(_event: Event): void {
        return;
    }

    async function sendTextToServerAddress(_text: string, _address: string): void {
        let reqInfo: RequestInfo = _address;
        let response: Response = await fetch(reqInfo);
        console.log(response);
    }
}