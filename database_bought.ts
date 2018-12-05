export interface purchase{
    name:string,
    objects: string[]
}

export interface purchases{
    purchase: purchase[]
}

export let purchases:purchases = {
    "purchase":[{
        "name":"",
        "objects":[""]
    }
    ]
}