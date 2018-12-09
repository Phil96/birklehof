export declare function init(_event: Event): void;
export declare function sendMail(_event: Event): Promise<Response>;
export declare function sendData(_data: string): Promise<Response>;
export declare function loadData(): Promise<Response>;
export declare function sendTextToServerAddress(_text: string, _address: string): Promise<Response>;
export declare function createPostData(_text: string): Object;
