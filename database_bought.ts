export class purchase{
    name:string;
    object_ids: string[];
    
}

export class purchases{
    purchase: purchase[]
}

export let p:purchases = {
    "purchase":[{
        "name":"Philip G",
        "object_ids":["Balkon_00","Tor_zur_Tenne"]
    },{
        "name":"Max Mustermann",
        "object_ids":["Floor_001"]
    }
    ]
}