export interface purchase{
    name:string,
    object_ids: string[]
}

export interface purchases{
    purchase: purchase[]
}

export let purchases:purchases = {
    "purchase":[{
        "name":"",
        "object_ids":[""]
    }
    ]
}