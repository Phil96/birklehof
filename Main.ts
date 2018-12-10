
    import * as INDEX from "./index";

    window.addEventListener("load", init);
    let domText: HTMLTextAreaElement;
    // let serverAdress: string = "https://webuser.hs-furtwangen.de/~del/birklehof/";
    let serverAdress: string = "";

    export let orderedData:string;

    export function init(_event: Event): void {
        /* let domSendMail: HTMLButtonElement = document.getElementsByTagName("button")[0];
        let domSendData: HTMLButtonElement = document.getElementsByTagName("button")[1];
        let domLoadData: HTMLButtonElement = document.getElementsByTagName("button")[2];
        domText = document.getElementsByTagName("textarea")[0];
        domSendMail.addEventListener("click", sendMail);
        domSendData.addEventListener("click", sendData);
        domLoadData.addEventListener("click", loadData); */
    }

    export async function sendMail(_data:string): Promise<Response> {
        console.group("sendMail");
        let response: Response = await sendTextToServerAddress(_data, serverAdress + "sendMail.php");
        console.log("Response : " + await response.text());
        console.groupEnd();
        return;
    }

    export async function sendData(_data:string): Promise<Response> {
        console.group("sendData");
        let response: Response = await sendTextToServerAddress(_data, serverAdress + "storeData.php");
        console.log("Response : " + await response.text());
        console.groupEnd();
        return;
    }

    export async function loadData(): Promise<Response> {
        console.group("loadData");
        let response: Response = await sendTextToServerAddress("", serverAdress + "ordered.json");
        let content: string =  await response.text();
        console.log(content);
        orderedData = content;
        //domText.value = content;
        console.groupEnd();
        return;
    }

    export async function sendTextToServerAddress(_text: string, _address: string): Promise<Response> {
        console.log("Client sends: " + _text);
        let reqInfo: RequestInfo = _address;
        let postData: Object = createPostData(_text);
        let response: Promise<Response> = fetch(reqInfo, postData);
        return response;
    }

    export function createPostData(_text: string): Object {
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
