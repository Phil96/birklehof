export interface Item {
    name: string;
    id: string;
    price: number;
}

export interface Category {
    name: string;
    items: Item[];
}


let beds: Category = {
    "name": "Betten",
    "items": [
        {
            "name": "Bett",
            "id": "Bett_001",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_002",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_003",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_004",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_005",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_006",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_007",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_008",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_009",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_010",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_011",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_012",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_013",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_014",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_015",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_016",
            "price": 500
        }, {
            "name": "Bett",
            "id": "Bett_017",
            "price": 500
        },
    ]

}

let floor: Category = {
    "name": "Fußboden",
    "items": [
        {
            "name": "Fußboden EG, 1",
            "id": "Floor_000",
            "price": 250
        }, {
            "name": "Fußboden EG, 2",
            "id": "Floor_001",
            "price": 250
        }, {
            "name": "Fußboden EG, 3",
            "id": "Floor_002",
            "price": 250
        }, {
            "name": "Fußboden EG, 4",
            "id": "Floor_003",
            "price": 250
        }, {
            "name": "Fußboden EG, 5",
            "id": "Floor_004",
            "price": 250
        }, {
            "name": "Fußboden EG, 6",
            "id": "Floor_006",
            "price": 250
        }, {
            "name": "Fußboden EG, 7",
            "id": "Floor_007",
            "price": 250
        }, {
            "name": "Fußboden EG, 8",
            "id": "Floor_008",
            "price": 250
        }, {
            "name": "Fußboden EG, 9",
            "id": "Floor_009",
            "price": 250
        }, {
            "name": "Fußboden EG, 10",
            "id": "Floor_023",
            "price": 250
        }, {
            "name": "Fußboden EG, 11",
            "id": "Floor_027",
            "price": 250
        }, {
            "name": "Fußboden EG, 12",
            "id": "Floor_028",
            "price": 250
        }, {
            "name": "Fußboden EG, 13",
            "id": "Floor_029",
            "price": 250
        }, {
            "name": "Fußboden OG1, 1",
            "id": "Floor_005",
            "price": 250
        }, {
            "name": "Fußboden OG1, 2",
            "id": "Floor_010",
            "price": 250
        }, {
            "name": "Fußboden OG1, 3",
            "id": "Floor_011",
            "price": 250
        }, {
            "name": "Fußboden OG1, 4",
            "id": "Floor_012",
            "price": 250
        }, {
            "name": "Fußboden OG1, 5",
            "id": "Floor_015",
            "price": 250
        }, {
            "name": "Fußboden OG1, 6",
            "id": "Floor_016",
            "price": 250
        }, {
            "name": "Fußboden OG1, 7",
            "id": "Floor_017",
            "price": 250
        }, {
            "name": "Fußboden OG1, 8",
            "id": "Floor_018",
            "price": 250
        }, {
            "name": "Fußboden OG1, 9",
            "id": "Floor_030",
            "price": 250
        }, {
            "name": "Fußboden OG1, 10",
            "id": "Floor_031",
            "price": 250
        }, {
            "name": "Fußboden OG1, 11",
            "id": "Floor_032",
            "price": 250
        }, {
            "name": "Fußboden OG2, 1",
            "id": "Floor_013",
            "price": 250
        }, {
            "name": "Fußboden OG2, 2",
            "id": "Floor_014",
            "price": 250
        }, {
            "name": "Fußboden OG2, 3",
            "id": "Floor_024",
            "price": 250
        }, {
            "name": "Fußboden OG2, 4",
            "id": "Floor_025",
            "price": 250
        }, {
            "name": "Fußboden OG2, 5",
            "id": "Floor_026",
            "price": 250
        }, {
            "name": "Fußboden Dachgeschoss, 1",
            "id": "Floor_019",
            "price": 250
        }, {
            "name": "Fußboden Dachgeschoss, 2",
            "id": "Floor_020",
            "price": 250
        }, {
            "name": "Fußboden Dachgeschoss, 3",
            "id": "Floor_021",
            "price": 250
        }, {
            "name": "Fußboden Dachgeschoss, 4",
            "id": "Floor_022",
            "price": 250
        },
    ]
}

let windows: Category = {
    "name": "Fenster",
    "items": [
        {
            "name": "Fenster",
            "id": "Fenster_001",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_002",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_003",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_004",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_005",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_006",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_007",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_008",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_009",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_010",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_011",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_012",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_013",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_014",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_015",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_016",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_017",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_018",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_019",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_020",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_021",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_022",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_023",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_024",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_025",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_026",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_027",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_028",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_029",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_030",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_031",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_032",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_033",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_034",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_035",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_036",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_037",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_038",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_039",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_040",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_041",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_042",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_043",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_044",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_045",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_046",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_047",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_048",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_049",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_050",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_051",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_052",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_053",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_054",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_055",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_056",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_057",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_058",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_059",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_060",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_061",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_062",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_063",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_064",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_065",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_066",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_067",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_068",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_069",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_070",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_071",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_072",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_073",
            "price": 100
        }, {
            "name": "Fenster",
            "id": "Fenster_095",
            "price": 100
        }
    ]
}

//kein preis
let shelves: Category = {
    "name": "Regal",
    "items": [
        {
            "name": "Regal",
            "id": "Regal_000",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_001",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_002",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_003",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_004",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_005",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_006",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_007",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_008",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_009",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_010",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_011",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_012",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_013",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_014",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_015",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_016",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_017",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_018",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_019",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_020",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_021",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_022",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_023",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_024",
            "price": 10
        }, {
            "name": "Regal",
            "id": "Regal_025",
            "price": 10
        }
    ]
}

//kein preis
let cupboards: Category = {
    "name": "Schränke",
    "items": [
        {
            "name": "Schrank",
            "id": "Schrank_000",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_001",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_002",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_003",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_004",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_005",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_006",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_007",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_008",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_009",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_010",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_011",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_012",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_013",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_014",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_015",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_016",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_017",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_018",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_019",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_020",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_021",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_022",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_023",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_024",
            "price": 20
        }, {
            "name": "Schrank",
            "id": "Schrank_025",
            "price": 20
        },
        {
            "name": "Aktenschrank",
            "id": "Aktenschrank_000",
            "price": 30
        }, {
            "name": "Aktenschrank",
            "id": "Aktenschrank_001",
            "price": 30
        }, {
            "name": "Aktenschrank",
            "id": "Aktenschrank_002",
            "price": 30
        },
    ]
}

//kein preis
let walls: Category = {
    "name": "Wände",
    "items": [
        {
            "name": "Wand",
            "id": "Wand_000",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_001",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_002",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_003",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_004",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_005",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_006",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_007",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_008",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_009",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_010",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_011",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_012",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_013",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_014",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_015",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_016",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_017",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_018",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_019",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_020",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_021",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_022",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_023",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_024",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_025",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_026",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_027",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_028",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_029",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_030",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_031",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_032",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_033",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_034",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_035",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_036",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_037",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_038",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_039",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_040",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_041",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_042",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_043",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_044",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_045",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_046",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_047",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_048",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_049",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_050",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_051",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_052",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_053",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_054",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_055",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_056",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_057",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_058",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_059",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_060",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_061",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_062",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_063",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_064",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_065",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_066",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_067",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_068",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_069",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_070",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_071",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_072",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_073",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_074",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_075",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_076",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_077",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_078",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_079",
            "price": 100
        }, {
            "name": "Wand",
            "id": "Wand_080",
            "price": 100
        }
    ]
}

let doorsIn: Category = {
    "name": "Innentüren",
    "items": [
        {
            "name": "Tür",
            "id": "Door_in_001",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_002",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_003",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_004",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_005",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_006",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_007",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_008",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_009",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_010",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_011",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_012",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_013",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_014",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_015",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_016",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_017",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_018",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_019",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_020",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_021",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_022",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_023",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_024",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_025",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_026",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_027",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_028",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_029",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_030",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_031",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_032",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_033",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_034",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_035",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_036",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_037",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_038",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_039",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_040",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_041",
            "price": 50
        }, {
            "name": "Tür",
            "id": "Door_in_042",
            "price": 50
        },
    ]
}

//kein preis
let fronts: Category = {
    "name": "Fassaden",
    "items": [
        {
            "name": "Fassade EG, Front, rechts",
            "id": "Fassade_001",
            "price": 0
        }, {
            "name": "Fassade EG, Seite, rechts",
            "id": "Fassade_002",
            "price": 0
        }, {
            "name": "Fassade EG, Rückseite, links",
            "id": "Fassade_003",
            "price": 0
        }, {
            "name": "Fassade EG, Rückseite, Ecke",
            "id": "Fassade_004",
            "price": 0
        }, {
            "name": "Fassade EG, Rückseite, Mitte",
            "id": "Fassade_005",
            "price": 0
        }, {
            "name": "Fassade EG, Rückseite, rechts",
            "id": "Fassade_006",
            "price": 0
        }, {
            "name": "Fassade EG, Seite, links",
            "id": "Fassade_007",
            "price": 0
        }, {
            "name": "Fassade EG, Front, links",
            "id": "Fassade_008",
            "price": 0
        }, {
            "name": "Fassade OG1, Rückseite, Ecke",
            "id": "Fassade_009",
            "price": 0
        }, {
            "name": "Fassade OG1, Rückseite, links",
            "id": "Fassade_010",
            "price": 0
        }, {
            "name": "Fassade OG1, Rückseite, rechts",
            "id": "Fassade_011",
            "price": 0
        }, {
            "name": "Fassade OG1, Seite, links",
            "id": "Fassade_012",
            "price": 0
        }, {
            "name": "Fassade OG1, Front, links",
            "id": "Fassade_013",
            "price": 0
        }, {
            "name": "Fassade OG2, Seite, rechts",
            "id": "Fassade_014",
            "price": 0
        }, {
            "name": "Fassade OG2, Seite, links",
            "id": "Fassade_015",
            "price": 0
        },
    ]
}

//kein preis
let chairs: Category = {
    "name": "Stühle",
    "items": [
        {
            "name": "Stuhl",
            "id": "Stuhl_001",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_002",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_003",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_004",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_005",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_006",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_007",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_008",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_009",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_010",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_011",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_012",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_013",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_014",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_015",
            "price": 0
        }, {
            "name": "Stuhl",
            "id": "Stuhl_016",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_001_Stuhl",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_002_Stuhl",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_003_Stuhl",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_004_Stuhl",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_005_Stuhl",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_006_Stuhl",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_007_Stuhl",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_008_Stuhl",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_009_Stuhl",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_010_Stuhl",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_011_Stuhl",
            "price": 0
        }, {
            "name": "Schreibtischstuhl",
            "id": "ST_012_Stuhl",
            "price": 0
        },
    ]
}

//kein preis
let armchairs: Category = {
    "name": "Sessel",
    "items": [
        {
            "name": "Sessel",
            "id": "Sessel_000",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_001",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_002",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_003",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_004",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_005",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_006",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_07",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_008",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_009",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_010",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_011",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_012",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_013",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_014",
            "price": 0
        }, {
            "name": "Sessel",
            "id": "Sessel_015",
            "price": 0
        },
    ]
}

//kein preis
let tables: Category = {
    "name": "Tische",
    "items": [
        {
            "name": "Tisch",
            "id": "Tisch_000",
            "price": 0
        }, {
            "name": "Tisch",
            "id": "Tisch_001",
            "price": 0
        }, {
            "name": "Tisch",
            "id": "Tisch_002",
            "price": 0
        }, {
            "name": "Tisch",
            "id": "Tisch_003",
            "price": 0
        }, {
            "name": "Tisch",
            "id": "Tisch_004",
            "price": 0
        }, {
            "name": "Tisch",
            "id": "Tisch_005",
            "price": 0
        }, {
            "name": "Tisch",
            "id": "Tisch_099",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_001",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_002",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_003",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_004",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_005",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_006",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_007",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_008",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_009",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_010",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_011",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "ST_012",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "Schreibtisch_001",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "Schreibtisch_002",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "Schreibtisch_003",
            "price": 0
        }, {
            "name": "Schreibtisch",
            "id": "Schreibtisch_004",
            "price": 0
        }, {
            "name": "Glastisch",
            "id": "Glastisch_001",
            "price": 0
        }, {
            "name": "Glastisch",
            "id": "Glastisch_002",
            "price": 0
        }, {
            "name": "Glastisch",
            "id": "Glastisch_003",
            "price": 0
        },
    ]
}

//kein preis
let sinks: Category = {
    "name": "Waschbecken",
    "items": [
        {
            "name": "Waschbecken",
            "id": "Waschbecken_001",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_002",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_003",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_004",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_005",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_006",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_007",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_008",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_009",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_010",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_011",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_012",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_013",
            "price": 0
        }, {
            "name": "Waschbecken",
            "id": "Waschbecken_014",
            "price": 0
        },
    ]
}

//kein preis
let toilets: Category = {
    "name": "Toiletten",
    "items": [
        {
            "name": "Toilette",
            "id": "wc_000",
            "price": 0
        }, {
            "name": "Toilette",
            "id": "wc_001",
            "price": 0
        }, {
            "name": "Toilette",
            "id": "wc_002",
            "price": 0
        }, {
            "name": "Toilette",
            "id": "wc_003",
            "price": 0
        }, {
            "name": "Toilette",
            "id": "wc_004",
            "price": 0
        }, {
            "name": "Toilette",
            "id": "wc_005",
            "price": 0
        }, {
            "name": "Toilette",
            "id": "wc_006",
            "price": 0
        }, {
            "name": "Toilette",
            "id": "wc_007",
            "price": 0
        }, {
            "name": "Toilette",
            "id": "wc_008",
            "price": 0
        }, {
            "name": "Toilette",
            "id": "wc_009",
            "price": 0
        }, {
            "name": "Toilette",
            "id": "wc_010",
            "price": 0
        },
    ]
}

//kein preis
let stairs: Category = {
    "name": "Treppen",
    "items": [
        {
            "name": "Treppe EG",
            "id": "Treppe_001",
            "price": 0
        }, {
            "name": "Treppe EG",
            "id": "Treppe_002",
            "price": 0
        }, {
            "name": "Treppe EG",
            "id": "Treppe_007_000",
            "price": 0
        }, {
            "name": "Treppe OG1",
            "id": "Treppe_003",
            "price": 0
        }, {
            "name": "Treppe OG1",
            "id": "Treppe_006_000",
            "price": 0
        }, {
            "name": "Treppe OG2",
            "id": "Treppe_004",
            "price": 0
        }, {
            "name": "Treppe, Tenne",
            "id": "Treppe_005_000",
            "price": 0
        },
    ]
}

//kein preis
let bathtub: Category = {
    "name": "Badewannen",
    "items": [
        {
            "name": "Badewanne",
            "id": "Badewanne_000",
            "price": 0
        }, {
            "name": "Badewanne",
            "id": "Badewanne_001",
            "price": 0
        }, {
            "name": "Badewanne",
            "id": "Badewanne_002",
            "price": 0
        }, {
            "name": "Badewanne",
            "id": "Badewanne_003",
            "price": 0
        }
    ]
}

//kein preis
let showers: Category = {
    "name": "Duschen",
    "items": [
        {
            "name": "Dusche",
            "id": "dusche_000",
            "price": 0
        }, {
            "name": "Dusche",
            "id": "dusche_001",
            "price": 0
        }, {
            "name": "Dusche",
            "id": "dusche_002",
            "price": 0
        }, {
            "name": "Dusche",
            "id": "dusche_003",
            "price": 0
        }, {
            "name": "Dusche",
            "id": "dusche_004",
            "price": 0
        }, {
            "name": "Dusche",
            "id": "dusche_005",
            "price": 0
        }, {
            "name": "Dusche",
            "id": "dusche_006",
            "price": 0
        }, {
            "name": "Dusche",
            "id": "dusche_007",
            "price": 0
        },
    ]
}

let doorsOut: Category = {
    "name": "Aussentüren",
    "items": [
        {
            "name": "Aussentüre",
            "id": "Door_out_001",
            "price": 2000
        }, {
            "name": "Aussentüre",
            "id": "Door_out_002",
            "price": 2000
        }, {
            "name": "Aussentüre",
            "id": "Door_out_003",
            "price": 2000
        }, {
            "name": "Aussentüre",
            "id": "Door_out_005",
            "price": 2000
        }, {
            "name": "Aussentüre",
            "id": "Door_out_006",
            "price": 2000
        }, {
            "name": "Aussentüre",
            "id": "Door_out_007",
            "price": 2000
        }, {
            "name": "Einganstüre",
            "id": "Door_out_004",
            "price": 10000
        },
    ]
}

let balcony: Category = {
    "name": "Balkone",
    "items": [
        {
            "name": "Balkon Front",
            "id": "Balkon_00",
            "price": 7500
        }, {
            "name": "Balkon Rückseite",
            "id": "Balkon_01",
            "price": 5000
        },
    ]
}

let kitchens: Category = {
    "name": "Küchen",
    "items": [
        {
            "name": "Küche",
            "id": "kitchen_001",
            "price": 5000
        }, {
            "name": "Küche",
            "id": "kitchen_002",
            "price": 5000
        }, {
            "name": "Küche",
            "id": "kitchen_003",
            "price": 5000
        }, {
            "name": "Rauchküche",
            "id": "kitchen_smoke",
            "price": 8000
        },
    ]
}

//kein preis
let couches: Category = {
    "name": "Sofas",
    "items": [
        {
            "name": "Sofa",
            "id": "Sofa",
            "price": 0
        }, {
            "name": "Sofa",
            "id": "Sofa_000",
            "price": 0
        }, {
            "name": "Sofa",
            "id": "Sofa_ecke",
            "price": 0
        },
    ]
}

//kein preis
let electronics: Category = {
    "name": "Elektroartikel",
    "items": [
        {
            "name": "Trockner",
            "id": "Trockner_001",
            "price": 0
        }, {
            "name": "Trockner",
            "id": "Trockner_002",
            "price": 0
        }, {
            "name": "Trockner",
            "id": "Trockner_003",
            "price": 0
        }, {
            "name": "Waschmaschine",
            "id": "Waschmaschine_001",
            "price": 0
        }, {
            "name": "Waschmaschine",
            "id": "Waschmaschine_002",
            "price": 0
        }
    ]
}

//kein preis
let steps: Category = {
    "name": "Stufen",
    "items": [
        {
            "name": "Stufen, aussen",
            "id": "Stufen_000",
            "price": 0
        }, {
            "name": "Stufen, aussen",
            "id": "Stufen_001",
            "price": 0
        }, {
            "name": "Stufen, innen",
            "id": "Stufen_002",
            "price": 0
        }, {
            "name": "Stufen, innen",
            "id": "Stufen_003",
            "price": 0
        },
    ]
}

let windowShutters: Category = {
    "name": "Fensterläden",
    "items": [
        {
            "name": "Fensterladen",
            "id": "Fensterladen_001",
            "price": 50
        },
        {
            "name": "Fensterladen",
            "id": "Fensterladen_002",
            "price": 50
        },
        {
            "name": "Fensterladen",
            "id": "Fensterladen_003",
            "price": 50
        },
        {
            "name": "Fensterladen",
            "id": "Fensterladen_004",
            "price": 50
        },
        {
            "name": "Fensterladen",
            "id": "Fensterladen_00",
            "price": 50
        },
    ]
}

//kein preis
let benches: Category = {
    "name": "Bänke",
    "items": [
        {
            "name": "Sitzbank",
            "id": "Bank_001",
            "price": 0
        }, {
            "name": "Eckbank",
            "id": "Eckbank_001",
            "price": 0
        }
    ]
}

let roof: Category = {
    "name": "Dach",
    "items": [{
        "name": "Dach",
        "id": "Roof_000",
        "price": 10000
    }]
}

let ofen: Category = {
    "name": "Kachelofen",
    "items": [{
        "name": "Kachelofen",
        "id": "Kachelofen",
        "price": 5000
    }]
}

//kein preis
let gutter: Category = {
    "name": "Regenrinne",
    "items": [{
        "name": "Regenrinne",
        "id": "Regenrinne_001",
        "price": 0
    }]
}

//kein Preis
let tenne: Category = {
    "name": "Tenne",
    "items": [{
        "name": "Tor zur Tenne",
        "id": "Tor_zur_Tenne",
        "price": 5000
    }, {
        "name": "Tenne",
        "id": "Tenne",
        "price": 0
    }
    ]
}

let herrgott: Category = {
    "name": "Herrgottswinkel",
    "items": [{
        "name": "Herrgottswinkel",
        "id": "herrgottswinkel",
        "price": 8000
    }]
}



//keine verkaufsobjekte
export let structur: Category = {
    "name": "Hof Strukturen",
    "items": [
        {
            "name": "Hof Struktur",
            "id": "Hof_Struktur_000",
            "price": 0
        }, {
            "name": "Hof Struktur",
            "id": "Hof_Struktur_001",
            "price": 0
        }, {
            "name": "Hof Struktur",
            "id": "Hof_Struktur_002",
            "price": 0
        }, {
            "name": "Hof Struktur",
            "id": "Hof_Struktur_003",
            "price": 0
        }, {
            "name": "Hof Struktur",
            "id": "Hof_Struktur_004",
            "price": 0
        }, {
            "name": "Hof Struktur",
            "id": "Hof_Struktur_005",
            "price": 0
        }, {
            "name": "Hof Struktur",
            "id": "Hof_Struktur_006",
            "price": 0
        }, {
            "name": "Hof Struktur",
            "id": "Hof_Struktur_006_01",
            "price": 0
        },
    ]
}
export let balken: Category = {
    "name": "Balken",
    "items": [
        {
            "name": "Balken",
            "id": "Balken",
            "price": 0
        }, 
    ]
}

export let categorys={
    "categorys":[
    balcony,bathtub,beds,benches,
    chairs,couches,cupboards,
    doorsIn,doorsOut,
    electronics,
    floor,fronts,
    gutter,
    herrgott,
    kitchens,
    ofen,
    roof,
    shelves,showers,sinks,stairs,steps,
    tables,tenne,
    walls,windows,windowShutters]
}