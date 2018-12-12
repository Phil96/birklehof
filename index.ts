
import * as BABYLON from 'babylonjs';
import { addLabelToMesh } from "./gui";
import * as GUI from 'babylonjs-gui';
import 'babylonjs-loaders';
import * as IBAN from "ibantools";
import * as DATA from "./database";
import * as DATA_CATEGORY from "./database_category";
import * as DATA_BOUGHT from "./database_bought";
import * as SERVER from "./Main";
import { Checkbox } from 'babylonjs-gui';

let resetPos = document.getElementById("reset");
resetPos.addEventListener("click", resetCameraPosition);

let buy = document.getElementById("buy");
buy.addEventListener("click", buyObjects);

var displayObjects = document.getElementById("display");
displayObjects.addEventListener("click", toggle);

let objectsHTML = document.getElementById("objects");
objectsHTML.addEventListener("click", manipulateCheckout);

let overview = document.getElementById("overview");
overview.addEventListener("click", chooseObjectFromOverview);

let personalData = document.getElementById("personalData");



/* let categorys = document.getElementById("categorys");
categorys.addEventListener("click", chooseCategory); */

var canvas: any = document.getElementById("renderCanvas");
var engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);
var scene: BABYLON.Scene = createScene();

let camera;

engine.loadingUIText = "Das Modell wird geladen, bitte haben Sie etwas Geduld";

let boughtLayer = new BABYLON.HighlightLayer("hl1", scene);
let selectedLayer = new BABYLON.HighlightLayer("hl2", scene);

let actBuy = new DATA_BOUGHT.purchase;
actBuy.name = "Max Mustermann";
actBuy.object_ids = [];

//let buys = DATA_BOUGHT.p;
let purchases = new DATA_BOUGHT.purchases;
//buys.purchase = [];
let testBuy: DATA_BOUGHT.purchase = new DATA_BOUGHT.purchase;
testBuy.name = "Max Mustermann";
testBuy.object_ids = ["Fassade_001", "Fassade_002", "Fassade_003"];

//Materials

let pickMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
pickMaterial.diffuseColor = BABYLON.Color3.Red();
pickMaterial.alpha = 0.5;

let startAlpha;
let startBeta;

//testing camera
var xRot;
var yRot = 0;
var zDist = 0;
// var tCam : Transform;
var bRot = false;
var bPan = false;
var fPan = 1;
var fZoom = 1;
var posOld = BABYLON.Vector3.Zero();


function userMessage(_message: string) {

}

function resetCameraPosition(_event: MouseEvent) {
    let cam = <BABYLON.ArcRotateCamera>scene.getCameraByName("ArcCamera")
    var targetID = (<HTMLElement>_event.target).id;
    if (targetID == "reset") {
        /* cam.alpha = 0;
        cam.beta = 0;
        cam.radius = 10; */
        //cam.setTarget(BABYLON.Vector3.Zero());
        cam.position = new BABYLON.Vector3(15, 8, -20);
        /* cam.alpha = 90;
        cam.beta = 90;
        cam.radius = 10; */

        scene.activeCamera = null;
        camera = new BABYLON.ArcRotateCamera("ArcCamera", 0, 0, 10, new BABYLON.Vector3(15, 8, -20), scene);
        let inputManager = camera.inputs;

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        scene.activeCamera = camera;

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        //console.log(camera.inputs);

        camera._useCtrlForPanning = true;
        camera.wheelPrecision = 20;
        camera.checkCollisions = true;
    }

    //console.log(cam.position);
    //cam.globalPosition = new BABYLON.Vector3(15, 8, -20);
    //cam.position = new BABYLON.Vector3(15, 8, -20);
    //console.log(cam.position);
}

function resetBought(_objID: string) {
    let refToHTML = document.getElementById(_objID);
    let refToMesh = scene.getMeshByID(_objID);

    let childInput = <HTMLInputElement>refToHTML.childNodes[1];
    let childLabel = <HTMLElement>refToHTML.childNodes[2];
    childInput.disabled = false;
    childLabel.id = "_02";
    refToHTML.style.backgroundColor = "";

    if (refToMesh.getChildren().length > 0) {
        let refToMeshChilds = refToMesh.getChildren();
        for (let k = 0; k < refToMeshChilds.length; k++) {
            let currChild = <BABYLON.Mesh>refToMeshChilds[k];
            currChild.isPickable = true;
            boughtLayer.removeMesh(currChild);
            //boughtLayer.addMesh(currChild, BABYLON.Color3.Red());
        }
        refToMesh.isPickable = true;
        boughtLayer.removeMesh(<BABYLON.Mesh>refToMesh);
        //boughtLayer.addMesh(<BABYLON.Mesh>refToMesh, BABYLON.Color3.Red());
    } else {
        refToMesh.isPickable = true;
        boughtLayer.removeMesh(<BABYLON.Mesh>refToMesh);
        //boughtLayer.addMesh(<BABYLON.Mesh>refToMesh, BABYLON.Color3.Red());
    }

}

function setBought(_objID: string) {
    let refToHTML = document.getElementById(_objID);
    let refToMesh = scene.getMeshByID(_objID);

    let childInput = <HTMLInputElement>refToHTML.childNodes[1];
    let childLabel = <HTMLElement>refToHTML.childNodes[2];
    childInput.disabled = true;
    childLabel.id = "";
    refToHTML.style.backgroundColor = "red";

    if (refToMesh.getChildren().length > 0) {
        let refToMeshChilds = refToMesh.getChildren();
        for (let k = 0; k < refToMeshChilds.length; k++) {
            let currChild = <BABYLON.Mesh>refToMeshChilds[k];
            currChild.isPickable = false;
            boughtLayer.addMesh(currChild, BABYLON.Color3.Red());
        }
        refToMesh.isPickable = false;
        if (selectedLayer.hasMesh(<BABYLON.Mesh>refToMesh)) {
            selectedLayer.removeMesh(<BABYLON.Mesh>refToMesh);
        }

        boughtLayer.addMesh(<BABYLON.Mesh>refToMesh, BABYLON.Color3.Red());
    } else {

        if (selectedLayer.hasMesh(<BABYLON.Mesh>refToMesh)) {
            selectedLayer.removeMesh(<BABYLON.Mesh>refToMesh);
        }
        refToMesh.isPickable = false;
        boughtLayer.addMesh(<BABYLON.Mesh>refToMesh, BABYLON.Color3.Red());
    }

}

function iniBought() {
    //SERVER.loadData();

    let bought = SERVER.orderedData;
    purchases.purchase = JSON.parse(bought);
    //buys = purchases;

    console.log("Gespeicherte Spenden:")
    //console.log(purchases);

    for (let i = 0; i < purchases.purchase.length; i++) {
        let currBuyIDs = purchases.purchase[i].object_ids;

        for (let j = 0; j < currBuyIDs.length; j++) {
            setBought(currBuyIDs[j]);
        }

    }
    let refToHTML = document.getElementById("")
}

function setBoughtMat(_meshID: string, ) {
    let mesh = scene.getMeshByID(_meshID);

    if (mesh) {
        for (let i = 0; i < mesh.getChildren().length; i++) {
            let child = <BABYLON.Mesh>mesh.getChildren()[i];
            boughtLayer.addMesh(child, BABYLON.Color3.Red());
        }
    }
}

function showBought() {
    for (let i = 0; i < purchases.purchase.length; i++) {
        let currObjects = purchases.purchase[i];
        for (let j = 0; j < currObjects.object_ids.length; j++) {
            let currMeshID = currObjects.object_ids[j];

            setMeshVisibility(currMeshID, true);

        }
    }
    scene.getMeshByName("Stadtplanung Flurstücke").isVisible = true
}

function hideBought() {
    for (let i = 0; i < purchases.purchase.length; i++) {
        let currObjects = purchases.purchase[i];
        for (let j = 0; j < currObjects.object_ids.length; j++) {
            let currMeshID = currObjects.object_ids[j];
            setMeshVisibility(currMeshID, false);
        }
    }
    scene.getMeshByName("Stadtplanung Flurstücke").isVisible = true
}

function showStructur() {
    let balken = DATA_CATEGORY.balken;
    let structur = DATA_CATEGORY.structur;

    for (let i = 0; i < balken.items.length; i++) {
        let currB = balken.items[i].id;
        let obj = scene.getMeshByID(currB);

        if (obj.parent != null) {

            //console.log(obj.parent.getChildren());
            for (let j = 0; j < obj.parent.getChildren().length; j++) {
                let child = <BABYLON.Mesh>obj.parent.getChildren()[j];
                child.isVisible = true;
            }

        } else if (obj.getChildren().length != 0) {
            for (let k = 0; k < obj.getChildren().length; k++) {
                let child = <BABYLON.Mesh>obj.getChildren()[k];
                child.isVisible = true;
            }
        } else {
            if ("Stadtplanung Flurstücke" != obj.id) {
                obj.isVisible = true;
            }
        }
    }
    for (let i = 0; i < structur.items.length; i++) {
        let currB = structur.items[i].id;
        let obj = scene.getMeshByID(currB);

        if (obj.parent != null) {

            //console.log(obj.parent.getChildren());
            for (let j = 0; j < obj.parent.getChildren().length; j++) {
                let child = <BABYLON.Mesh>obj.parent.getChildren()[j];
                child.isVisible = true;
            }

        } else if (obj.getChildren().length != 0) {
            for (let k = 0; k < obj.getChildren().length; k++) {
                let child = <BABYLON.Mesh>obj.getChildren()[k];
                child.isVisible = true;
            }
        } else {
            if ("Stadtplanung Flurstücke" != obj.id) {
                obj.isVisible = true;
            }
        }
    }
}
function hideStructur() {
    let balken = DATA_CATEGORY.balken;
    let structur = DATA_CATEGORY.structur;

    for (let i = 0; i < balken.items.length; i++) {
        let currB = balken.items[i].id;
        let obj = scene.getMeshByID(currB);

        if (obj.parent != null) {

            //console.log(obj.parent.getChildren());
            for (let j = 0; j < obj.parent.getChildren().length; j++) {
                let child = <BABYLON.Mesh>obj.parent.getChildren()[j];
                child.isVisible = false;
            }

        } else if (obj.getChildren().length != 0) {
            for (let k = 0; k < obj.getChildren().length; k++) {
                let child = <BABYLON.Mesh>obj.getChildren()[k];
                child.isVisible = false;
            }
        } else {
            if ("Stadtplanung Flurstücke" != obj.id) {
                obj.isVisible = false;
            }
        }
    }
    for (let i = 0; i < structur.items.length; i++) {
        let currB = structur.items[i].id;
        let obj = scene.getMeshByID(currB);

        if (obj.parent != null) {

            //console.log(obj.parent.getChildren());
            for (let j = 0; j < obj.parent.getChildren().length; j++) {
                let child = <BABYLON.Mesh>obj.parent.getChildren()[j];
                child.isVisible = false;
            }

        } else if (obj.getChildMeshes().length != 0) {
            for (let k = 0; k < obj.getChildMeshes().length; k++) {
                let child = <BABYLON.Mesh>obj.getChildMeshes()[k];
                child.isVisible = false;
            }
        } else {
            if ("Stadtplanung Flurstücke" != obj.id) {
                obj.isVisible = false;
            }
        }
    }
}

function setMeshVisibility(_objID: string, _visibility: boolean) {
    let obj = scene.getMeshByID(_objID);
    let objHTML = document.getElementById(_objID);

    if (_visibility == true) {
        objHTML.getElementsByTagName("span")[0].className = "glyphicon glyphicon-eye-open"
    }
    if (_visibility == false) {
        objHTML.getElementsByTagName("span")[0].className = "glyphicon glyphicon-eye-close"
    }

    if ("Stadtplanung Flurstücke" == obj.id) {
        obj.isVisible = true;
        return;
    }

    if (obj.parent != null) {

        //console.log(obj.parent.getChildren());
        for (let i = 0; i < obj.parent.getChildren().length; i++) {
            let child = <BABYLON.Mesh>obj.parent.getChildren()[i];
            child.isVisible = _visibility;
        }

    } else if (obj.getChildren().length != 0) {
        for (let i = 0; i < obj.getChildren().length; i++) {
            let child = <BABYLON.Mesh>obj.getChildren()[i];
            child.isVisible = _visibility;
        }
    } else {
        if ("Stadtplanung Flurstücke" != obj.id) {
            obj.isVisible = _visibility;
        }
    }
}

function buyObjects(_event: MouseEvent) {
    let donationAccess = <HTMLInputElement>document.getElementById("donationCheck");
    let iban = <HTMLInputElement>document.getElementById("iban");
    if (donationAccess.checked) {
        if (IBAN.isValidIBAN(iban.value) == true) {

            let newBuy = new DATA_BOUGHT.purchase;
            let buyName = personalData.getElementsByTagName("input")[0].value + " " + personalData.getElementsByTagName("input")[1].value;
            newBuy.name = buyName;
            newBuy.object_ids = [];

            for (let i = 1; i < objectsHTML.getElementsByTagName("div").length; i++) {
                let data = objectsHTML.getElementsByTagName("div")[i].id;
                newBuy.object_ids.push(data);
            }

            var targetID = (<HTMLElement>_event.target).id;
            //console.log("Eingegebener Name: " + meshName + " ; TargetID: " + targetID);
            if (targetID == "buy") {
                for (let j = 0; j < newBuy.object_ids.length; j++) {
                    //setBoughtMat(newBuy.object_ids[j]);

                    let cartObjs = objectsHTML.getElementsByTagName("div");
                    let cartObjsLength = cartObjs.length - 1;

                    for (let k = cartObjsLength; k > 0; k--) {
                        console.log(cartObjs[k]);

                        let orders = JSON.parse(SERVER.orderedData);
                        for (let l = 0; l < orders.length; l++) {
                            //let orders = JSON.parse(SERVER.orderedData);
                            let currOrder = orders[l];
                            for (let m = 0; m < currOrder.object_ids.length; m++) {
                                if (currOrder.object_ids[m] == cartObjs[k].id) {
                                    alert(cartObjs[k].id + " wurde leider gerade eben gespendet. Es gibt bestimmt noch etwas anderes für Sie.");
                                    return;
                                }
                            }
                        }

                        objectDeselected(cartObjs[k].id);
                    }
                    //setMeshVisibility(newBuy.object_ids[j],false);
                    console.log(newBuy.object_ids[j]);
                }

                console.log("gültige IBAN")
                //return;


                console.log(newBuy);
            }
            //DATA_BOUGHT.p.purchase.push(newBuy);
            purchases.purchase.push(newBuy);
            console.log(purchases);


            for (let j = 0; j < newBuy.object_ids.length; j++) {
                setBought(newBuy.object_ids[j]);
            }

            let data = JSON.stringify(purchases.purchase);
            console.log(data);

            SERVER.sendData(data);

            let mailMessage = personalData.getElementsByTagName("input")[0].value + " " + personalData.getElementsByTagName("input")[1].value + "\n" +
                personalData.getElementsByTagName("input")[2].value + "\n" +
                personalData.getElementsByTagName("input")[3].value + ", " + personalData.getElementsByTagName("input")[4].value + "\n" +
                personalData.getElementsByTagName("input")[5].value + "\n" + "\n" +
                "Gespendete Objekte: " + "\n" +
                newBuy.object_ids + "\n" +
                "Summe in €: " + objectsHTML.getElementsByTagName("label")[0].innerText + "\n" + "\n" +
                "IBAN: " + iban.value;

            //console.log(mailMessage);
            SERVER.sendMail(mailMessage);
            SERVER.loadData();

            //SERVER.sendMail(mailMessage);

            resetField(objectsHTML);
            let newSum = 0;

            objectsHTML.getElementsByTagName("label")[0].innerText = newSum.toString();
            //console.log(actBuy);
            alert("Vielen Dank für Ihre Spende!");
            //iniBought();
            //location.reload();
        } else {
            alert("Bitte geben Sie eine gültige IBAN ein.");
            //console.log("gültige IBAN")
        }
    } else {
        console.log("Wir benötigen Ihre Erlaubnis für einen Bankeinzug.")
        alert("Wir benötigen Ihre Erlaubnis für einen Bankeinzug.");
    }

}

function objectBuy(selectedMesh: string) {
    SERVER.loadData();
    if (selectedMesh == "Stadtplanung Flurstücke") {
        return;
    }
    let referenceToOverview: HTMLElement = overview.querySelector("#" + selectedMesh);
    let referenceToCheckout: Element = objectsHTML.querySelector("#" + selectedMesh);

    let newDiv = document.createElement("div");
    newDiv.id = selectedMesh;

    let newInput = document.createElement("input");
    newInput.type = "checkbox";
    newInput.id = "_01";
    newInput.checked = true;

    let newLabel = document.createElement("label");
    newLabel.innerText = referenceToOverview.innerText;
    newLabel.id = "_02";

    newDiv.append(newInput);
    newDiv.append(newLabel);
    objectsHTML.append(newDiv);

    referenceToOverview.getElementsByTagName("input")[0].checked = true;

    let price = parseInt(referenceToOverview.getAttribute("price"));

    let sum = parseInt(objectsHTML.getElementsByTagName("label")[0].innerText);

    let newSum = sum + price;

    objectsHTML.getElementsByTagName("label")[0].innerText = newSum.toString();

    setBought(selectedMesh);


}

function objectBuyNot(selectedMesh: string) {
    if (selectedMesh == "Stadtplanung Flurstücke") {
        return;
    }
    if (selectedMesh != "") {
        let referenceToOverview: HTMLElement = overview.querySelector("#" + selectedMesh);
        let referenceToCheckout: Element = objectsHTML.querySelector("#" + selectedMesh);
        let referenceToMesh = <BABYLON.Mesh>scene.getMeshByID(selectedMesh);

        referenceToOverview.getElementsByTagName("input")[0].checked = false;

        referenceToCheckout.remove();

        let price = parseInt(referenceToOverview.getAttribute("price"));

        let sum = parseInt(objectsHTML.getElementsByTagName("label")[0].innerText);

        let newSum = sum - price;

        objectsHTML.getElementsByTagName("label")[0].innerText = newSum.toString();

        //referenceToOverview.style.display = "none";

        resetBought(selectedMesh);
    }

}

function objectSelected(selectedMesh: string) {

    if (selectedMesh == "Stadtplanung Flurstücke") {
        return;
    }

    let referenceToOverview: HTMLElement = overview.querySelector("#" + selectedMesh);
    let referenceToCheckout: Element = objectsHTML.querySelector("#" + selectedMesh);
    let referenceToMesh = <BABYLON.Mesh>scene.getMeshByID(selectedMesh);

    referenceToOverview.style.backgroundColor = "#0066ff";
    //document.location += #'referenceToOverview';

    //referenceToOverview.style.display = "block";

    for (let i = 0; i < overview.children.length; i++) {
        let currCat = overview.children[i];
        for (let j = 1; j < currCat.children.length; j++) {
            let catChild = <HTMLElement>currCat.children[j];
            catChild.style.display = "none";
        }

    }

    for (let i = 1; i < referenceToOverview.parentElement.childElementCount; i++) {
        let child: HTMLElement = <HTMLElement>referenceToOverview.parentElement.children[i];
        child.style.display = "block";
    }

    var page = <HTMLElement>document.querySelector('#form');
    var scrollable = overview;
    var scrolled = referenceToOverview;
    /* page.scrollTop = scrollable.offsetTop-page.offsetTop;
    scrollable.scrollTop = scrolled.offsetTop-scrollable.offsetTop; */
    page.scrollTop = scrollable.offsetTop - page.offsetTop;
    scrollable.scrollTop = scrolled.offsetTop - scrollable.offsetTop;
    page.scrollTop = 0;


    /* let price = parseInt(referenceToOverview.getAttribute("price"));

    let sum = parseInt(objectsHTML.getElementsByTagName("label")[0].innerText);

    let newSum = sum + price;

    objectsHTML.getElementsByTagName("label")[0].innerText = newSum.toString(); */


    //referenceToMesh.material = pickMaterial;
    if (referenceToMesh.getChildren().length != 0) {
        let childs = referenceToMesh.getChildMeshes();
        for (let i = 0; i < childs.length; i++) {
            let child = <BABYLON.Mesh>childs[i];
            selectedLayer.addMesh(child, BABYLON.Color3.Green());
        }
    } else {
        //console.log(referenceToMesh);
        selectedLayer.addMesh(referenceToMesh, BABYLON.Color3.Green());
    }
    //hl.addMesh(referenceToMesh,BABYLON.Color3.Green());
}

function objectDeselected(selectedMesh: string) {
    if (selectedMesh != "") {
        let referenceToOverview: HTMLElement = overview.querySelector("#" + selectedMesh);
        let referenceToCheckout: Element = objectsHTML.querySelector("#" + selectedMesh);
        let referenceToMesh = <BABYLON.Mesh>scene.getMeshByID(selectedMesh);

        referenceToOverview.getElementsByTagName("input")[0].checked = false;

        //referenceToCheckout.remove();

        /* let price = parseInt(referenceToOverview.getAttribute("price"));

        let sum = parseInt(objectsHTML.getElementsByTagName("label")[0].innerText);

        let newSum = sum - price;

        objectsHTML.getElementsByTagName("label")[0].innerText = newSum.toString(); */

        referenceToOverview.style.backgroundColor = "";

        //referenceToOverview.style.display = "none";

        /* for (let i = 1; i < referenceToOverview.parentElement.childElementCount; i++) {
            let child: HTMLElement = <HTMLElement>referenceToOverview.parentElement.children[i];
            child.style.display = "none";
        } */

        if (referenceToMesh.getChildren().length != 0) {
            let childs = referenceToMesh.getChildMeshes();
            for (let i = 0; i < childs.length; i++) {
                let child = <BABYLON.Mesh>childs[i];
                selectedLayer.removeMesh(child);
                //hl.addMesh(child,BABYLON.Color3.Green());
            }
        } else {
            console.log("Deselect" + referenceToMesh);
            selectedLayer.removeMesh(referenceToMesh);
        }
    }

    //referenceToMesh.material = saveMaterial;
}

function manipulateCheckout(_event: MouseEvent) {
    var target = (<HTMLElement>_event.target);

    if (target.tagName == "INPUT") {
        //target.parentElement.remove();
        let reference: Element = overview.querySelector("#" + target.parentElement.id);
        reference.getElementsByTagName("input")[0].checked = false;
        objectBuyNot(target.parentElement.id);
        //objectDeselected(target.parentElement.id);
    }
}

/* function chooseObjectFromDisplay(_event: MouseEvent) {
    var target = (<HTMLElement>_event.target);
    //let reference: Element = overview.querySelector("#" + target.parentElement.id);
    console.log(target.id);

    if (target.id == "_00") {

        let objID = target.parentElement.id;
        console.log(objID);

        if (target.className == "glyphicon glyphicon-eye-open") {
            target.className = "glyphicon glyphicon-eye-close";



            setMeshVisibility(objID, false);
        } else {
            target.className = "glyphicon glyphicon-eye-open";
            setMeshVisibility(objID, true);
        }

    }

    if (target.id == "_02") {
        let active = reference.getAttribute("isActive");
        if (active == "false") {
            objectSelected(reference.id);
            active = "true";
            reference.setAttribute("isActive", active);
        } else if (active == "true") {
            objectDeselected(reference.id);
            active = "false";
            reference.setAttribute("isActive", active);
        } else {

        }

    }
} */

function chooseObjectFromOverview(_event: MouseEvent) {
    var target = (<HTMLElement>_event.target);
    let reference: Element = overview.querySelector("#" + encodeURI(target.parentElement.id));
    let referenceToCheckout: Element = objectsHTML.querySelector("#" + target.parentElement.id);
    console.log(target.id);

    if (target.className == "category") {
        let elements = target.getElementsByTagName("div");

        console.log("clicked category" + target.id);
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].style.display == "none") {
                elements[i].style.display = "block";
            } else {
                elements[i].style.display = "none";
            }
        }

    }

    if (target.id == "displayCategory") {
        let childs = target.parentElement.getElementsByTagName("div");

        if (target.className == "glyphicon glyphicon-eye-open") {
            target.className = "glyphicon glyphicon-eye-close";

            for (let i = 0; i < childs.length; i++) {
                setMeshVisibility(childs[i].id, false);
                childs[i].getElementsByTagName("span")[0].className = "glyphicon glyphicon-eye-close";
            }

        } else {
            target.className = "glyphicon glyphicon-eye-open";
            for (let i = 0; i < childs.length; i++) {
                setMeshVisibility(childs[i].id, true);
                childs[i].getElementsByTagName("span")[0].className = "glyphicon glyphicon-eye-open";
            }
        }

        /*         if (target.className == "glyphicon glyphicon-eye-open") {
                    for (let i = 0; i < childs.length; i++) {
        
                    }
                } */
    }

    if (target.id == "_00") {

        let objID = target.parentElement.id;
        console.log(objID);

        if (target.className == "glyphicon glyphicon-eye-open") {
            target.className = "glyphicon glyphicon-eye-close";

            setMeshVisibility(objID, false);
        } else {
            target.className = "glyphicon glyphicon-eye-open";
            setMeshVisibility(objID, true);
        }

    }

    if (target.id == "_01" && reference.getElementsByTagName("input")[0].checked == true) {

        //objectSelected(target.parentElement.id);
        objectBuy(target.parentElement.id);

    }
    if (target.id == "_01" && reference.getElementsByTagName("input")[0].checked == false) {
        objectBuyNot(target.parentElement.id);
        //objectDeselected(target.parentElement.id);
        //referenceToCheckout.remove();
    }
    if (target.id == "_02") {
        let active = reference.getAttribute("isActive");
        if (active == "false") {
            objectSelected(reference.id);
            active = "true";
            reference.setAttribute("isActive", active);
        } else if (active == "true") {
            objectDeselected(reference.id);
            active = "false";
            reference.setAttribute("isActive", active);
        } else {

        }

    }
}

function toggle(_event: MouseEvent) {
    //var meshName: string = displayObjects.getElementsByTagName("input")[0].value;
    let target = (<HTMLElement>_event.target);
    var targetID = (<HTMLElement>_event.target).id;
    //console.log("Eingegebener Name: " + meshName + " ; TargetID: " + targetID);
    /* if (targetID == "hide") {
        setMeshVisibility(meshName, false);
    }
    if (targetID == "show") {
        setMeshVisibility(meshName, true);
    } */
    if (targetID == "toggleAll") {
        let eyeOpen: boolean;
        if (target.className == "glyphicon glyphicon-eye-open") {

            for (let i = 0; i < scene.meshes.length; i++) {
                let curr = scene.meshes[i];
                //console.log(i);
                curr.isVisible = false;

                if ("Stadtplanung Flurstücke" == curr.id) {
                    curr.isVisible = true;
                }
            }


            let displayIcons = document.getElementsByClassName("glyphicon glyphicon-eye-open");
            let lengthSave = displayIcons.length - 1;
            for (let j = lengthSave; j >= 0; j--) {
                let currIcon = displayIcons[j];
                currIcon.className = "glyphicon glyphicon-eye-close";
                //displayIcons[j].className
                /* console.log(displayIcons[j].className);
                console.log(lengthSave); */
            }
            target.className = "glyphicon glyphicon-eye-close";
        } else {

            for (let i = 0; i < scene.meshes.length; i++) {
                let curr = scene.meshes[i];
                //console.log(i);
                curr.isVisible = true;
            }

            let displayIcons = document.getElementsByClassName("glyphicon glyphicon-eye-close");
            let lengthSave = displayIcons.length - 1;
            //console.log(displayIcons.length);

            for (let j = lengthSave; j >= 0; j--) {
                let currIcon = displayIcons[j];
                currIcon.className = "glyphicon glyphicon-eye-open";
                //displayIcons[j].className
                /* console.log(displayIcons[j].className);
                console.log(lengthSave); */
            }
            target.className = "glyphicon glyphicon-eye-open";
        }

    }
    if (targetID == "toggleBought") {
        if (target.className == "glyphicon glyphicon-eye-open") {
            hideBought();
            target.className = "glyphicon glyphicon-eye-close";
        } else {
            showBought();
            target.className = "glyphicon glyphicon-eye-open";
        }
    }
    if (targetID == "toggleStructur") {
        if (target.className == "glyphicon glyphicon-eye-open") {
            hideStructur();
            target.className = "glyphicon glyphicon-eye-close";
        } else {
            showStructur();
            target.className = "glyphicon glyphicon-eye-open";
        }
    }

    if (target.id == "_00") {

        let objID = target.parentElement.id;
        console.log(objID);
        let structures = DATA_CATEGORY.structur.items;

        if (target.className == "glyphicon glyphicon-eye-open") {
            target.className = "glyphicon glyphicon-eye-close";

            setMeshVisibility(objID, false);
        } else {
            target.className = "glyphicon glyphicon-eye-open";
            setMeshVisibility(objID, true);
        }

    }
}

function resetField(_field: HTMLElement) {
    let field = _field
    let elements = field.getElementsByTagName("div");
    for (let i = elements.length - 1; i > 0; i--) {
        elements[i].remove();
    }
}

function initCategorys() {
    for (let i = 0; i < DATA_CATEGORY.categorys.categorys.length; i++) {
        let currentCat = DATA_CATEGORY.categorys.categorys[i];
        let newDiv = document.createElement("div");
        newDiv.id = currentCat.name;
        newDiv.className = "category";

        let nameSpan = document.createElement("span");
        nameSpan.innerText = currentCat.name;
        nameSpan.id = "categoryName";

        let newIcon = document.createElement("span");
        newIcon.className = "glyphicon glyphicon-eye-open";
        newIcon.id = "displayCategory";
        //newIcon.setAttribute("function","displayCategory");



        newDiv.append(newIcon);

        newDiv.insertAdjacentText("beforeend", " " + currentCat.name);

        for (let j = 0; j < currentCat.items.length; j++) {
            let newDivChild = document.createElement("div");
            let currentObject = currentCat.items[j];
            newDivChild.id = currentObject.id
            newDivChild.className = "categoryElement";
            newDivChild.setAttribute("price", currentObject.price.toString());
            newDivChild.setAttribute("isActive", "false");

            let newIcon = document.createElement("span");
            newIcon.className = "glyphicon glyphicon-eye-open"
            newIcon.id = "_00"
            //newIcon.className = "displayIcon";
            //<span class="glyphicon glyphicon-eye-open"></span>

            let newInput = document.createElement("input");
            newInput.type = "checkbox";
            newInput.id = "_01";

            let newLabel = document.createElement("label");
            newLabel.innerText = currentObject.name;
            newLabel.id = "_02";

            newDivChild.append(newIcon);
            newDivChild.append(newInput);
            newDivChild.append(newLabel);
            newDivChild.style.display = "none";
            newDiv.append(newDivChild);
        }
        overview.append(newDiv);

    }
}

function initData(category: string) {
    for (let i = 0; i < DATA_CATEGORY.categorys.categorys.length; i++) {

        if (DATA_CATEGORY.categorys.categorys[i].name == category) {
            let currCat = DATA_CATEGORY.categorys.categorys[i];
            for (let j = 0; j < currCat.items.length; j++) {
                let currentObject = currCat.items[j];

                let newDiv = document.createElement("div");
                newDiv.id = currentObject.id;
                newDiv.setAttribute("price", currentObject.price.toString());

                let newInput = document.createElement("input");
                newInput.type = "checkbox";
                newInput.id = "_01";

                let newLabel = document.createElement("label");
                newLabel.innerText = currentObject.name;
                newLabel.id = "_02";

                newDiv.append(newInput);
                newDiv.append(newLabel);
                overview.append(newDiv);
            }
        }
    }
}

function createScene(): BABYLON.Scene {

    SERVER.loadData();

    //console.log(DATA);
    console.log(DATA_CATEGORY);
    //console.log(DATA_BOUGHT);

    // console.log("income: " + income);

    let control = document.getElementById("control");
    let controlText = "linke Maustaste:" + "\t" + "\t" + "Objekt auswählen (bei gedrückter Taste: rotieren)" + "\n" +
        "linke Maustaste + STRG:" + "\t" + "bei gedrückten Tasten: Kamera schwenken" + "\n" +
        "Mausrad:" + "\t" + "\t" + "\t" + "Zoom" + "\n" +
        "Info:" + "\t" + "\t"+"\t"+"Mit doppeltem Mausklick können Objekte des Modells unsichtbar gemacht werden";
    control.title = controlText;

    initCategorys();

    var scene: BABYLON.Scene = new BABYLON.Scene(engine);

    //var cameraArc = new BABYLON.ArcRotateCamera("CameraArc", -Math.PI / 1,  Math.PI / 1, 50, new BABYLON.Vector3(15, 8, -20), scene);

    // Parameters: alpha, beta, radius, target position, scene
    camera = new BABYLON.ArcRotateCamera("ArcCamera", 0, 0, 10, new BABYLON.Vector3(15, 8, -20), scene);
    let inputManager = camera.inputs;

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    //console.log(camera.inputs);

    camera._useCtrlForPanning = true;
    camera.wheelPrecision = 20;


    let pointers = <BABYLON.ArcRotateCameraPointersInput>camera.inputs.attached["pointers"];
    //BABYLON.ArcRotateCameraKeyboardMoveInput

    /* if (pointers) {
      pointers.buttons[0] = 2; // respond to only right button. reserve left button for picking etc
    } */

    // Let's remove default keyboard:
    /*      camera.inputs.removeByType("ArcRotateCameraKeyboardMoveInput");
    
         // Create our own manager:
         var ArcRotateCameraKeyboardMoveInput = function () {
                 this._keys = [];
                 this.keysUp = [38];
                 this.keysLeft = [37];
                 this.keysRight = [39];
                 this.keysDown = [40];
                 this.sensibility = 0.01;
         }
     
         // Hooking keyboard events
         ArcRotateCameraKeyboardMoveInput.prototype.attachControl = function (element, noPreventDefault) {
             var _this = this;
             if (!this._onKeyDown) {
                 element.tabIndex = 1;
                 this._onKeyDown = function (evt) {
                     if (_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                         _this.keysRight.indexOf(evt.keyCode) !== -1) {
                         var index = _this._keys.indexOf(evt.keyCode);
                         if (index === -1) {
                             _this._keys.push(evt.keyCode);
                         }
                         if (!noPreventDefault) {
                             evt.preventDefault();
                         }
                     }
                 };
                 this._onKeyUp = function (evt) {
                     if (_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                         _this.keysRight.indexOf(evt.keyCode) !== -1) {
                         var index = _this._keys.indexOf(evt.keyCode);
                         if (index >= 0) {
                             _this._keys.splice(index, 1);
                         }
                         if (!noPreventDefault) {
                             evt.preventDefault();
                         }
                     }
                 };
     
                 element.addEventListener("keydown", this._onKeyDown, false);
                 element.addEventListener("keyup", this._onKeyUp, false);
                 BABYLON.Tools.RegisterTopRootEvents([
                     { name: "blur", handler: this._onLostFocus }
                 ]);
             }
         };
     
         // Unhook
         ArcRotateCameraKeyboardMoveInput.prototype.detachControl = function (element) {
             if (this._onKeyDown) {
                 element.removeEventListener("keydown", this._onKeyDown);
                 element.removeEventListener("keyup", this._onKeyUp);
                 BABYLON.Tools.UnregisterTopRootEvents([
                     { name: "blur", handler: this._onLostFocus }
                 ]);
                 this._keys = [];
                 this._onKeyDown = null;
                 this._onKeyUp = null;
             }
         };
     
         // This function is called by the system on every frame
         ArcRotateCameraKeyboardMoveInput.prototype.checkInputs = function () {
             if (this._onKeyDown) {
                 var camera = this.camera;
                 // Keyboard
                 for (var index = 0; index < this._keys.length; index++) {
                     var keyCode = this._keys[index];
                     if (this.keysLeft.indexOf(keyCode) !== -1) {
                         camera.cameraRotation.y += this.sensibility;
                     }
                     else if (this.keysRight.indexOf(keyCode) !== -1) {
                         camera.cameraRotation.y -= this.sensibility;
                     }
                 }
             }
         };
         ArcRotateCameraKeyboardMoveInput.prototype.getTypeName = function () {
             return "ArcRotateCameraKeyboardMoveInput";
         };
         ArcRotateCameraKeyboardMoveInput.prototype._onLostFocus = function (e) {
             this._keys = [];
         };
         ArcRotateCameraKeyboardMoveInput.prototype.getSimpleName = function () {
             return "keyboardMove";
         };
     
         // Connect to camera:
         camera.inputs.add(new ArcRotateCameraKeyboardMoveInput()); */

    //camera._panningMouseButton = 0;


    //camera.inputs.attached.

    //camera.inputs.removeByType("ArcRotateCameraPointersInput");
    /*     let ArcRotateCameraPointersInput = function () {
            this.buttons[0] = [2];
            this.buttons[1] = [0];
            this.buttons[2] = [1];
            this.angularSensibilityX = 1000;
            this.angularSensibilityY = 1000;
    
        }
    
        ArcRotateCameraPointersInput.prototype.getTypeName = function () {
            return "ArcRotateCameraPointersInput";
        };
        ArcRotateCameraPointersInput.prototype.getSimpleName = function () {
            return "PointersInput";
        };
    
    
        camera.inputs.add(new ArcRotateCameraPointersInput()); */

    ////console.log(camera.inputs);

    //let ARc

    //camera.inputs.

    /*  var ArcRotateCameraKeyboardMoveInput = function () {
        this._keys = [];
        this.keysUp = [87];    //W
        this.keysDown = [83];   //D
        this.keysLeft = [65];  //A
        this.keysRight = [68];; //S 
        this.sensibility = 1;
    } */


    //testing del camera
    //zDist = camera.position.z;

    //scene.activeCamera = cameraArc;

    scene.registerAfterRender(function () {
        //cameraArc.setTarget(new BABYLON.Vector3(canvas.pointerX,canvas.pointerY,0));
    });


    //camera.inputs.add(new BABYLON.ArcRotateCameraKeyboardMoveInput());

    /*  let cameraInput = new BABYLON.ArcRotateCameraKeyboardMoveInput();
     cameraInput.keysUp.push(87);    //W
     cameraInput.keysDown.push(83)   //D
     cameraInput.keysLeft.push(65);  //A
     cameraInput.keysRight.push(68); //S 
     cameraInput.camera = camera; */


    //camera.inputs.addKeyboard();

    //camera.inputs.add(cameraInput);
    // Positions the camera overwriting alpha, beta, radius
    /* camera.setPosition(new BABYLON.Vector3(15, 8, -20));
    scene.activeCamera = camera; */

    // This attaches the camera to the canvas
    //camera.attachControl(scene, true);



    /* var camera = new BABYLON.FreeCamera('freeCam', new BABYLON.Vector3(15, 8, -20), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.keysUp.push(87);    //W
    camera.keysDown.push(83)   //D
    camera.keysLeft.push(65);  //A
    camera.keysRight.push(68); //S 
    camera.speed = 0.15; */

    //var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 0.5, scene);
    /* let box = BABYLON.Mesh.CreateBox('box', 0.5, scene);
    box.visibility = 0;
    let sphere = box;

    sphere.position = new BABYLON.Vector3(15, 8, -18);

    camera.panningSensibility = 1 / (camera.radius * Math.tan(camera.fov / 2) * 2) * engine.getRenderHeight(true)

    camera.parent = sphere; */

    //camera.setTarget(sphere);


    //var texture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var container = new GUI.StackPanel();
    container.width = 0.5;
    container.height = 1;
    //container.color = "blue";
    container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    var light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    scene.clearColor = new BABYLON.Color4(0.5, 0.8, 0.5, 1.0);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    scene.collisionsEnabled = true;

    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    //camera.applyGravity = true;



    //Camera testing 2
    /*    var map = {}; //object for multiple key presses
       scene.actionManager = new BABYLON.ActionManager(scene);
   
       scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
           map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
   
       }));
   
       scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
           map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
       }));
   
       //dir = camera.getTarget();
   
       scene.registerAfterRender(function () {
           let forward = camera.getFrontPosition(0.01).subtract(camera.position);
   
           let rayDir = camera.getForwardRay(0.01).direction;
           //let forward = camera.position.subtract(camera.getFrontPosition(1));
   
           if ((map["w"] || map["W"])) {
               //sphere.position.z += 0.2;
               //sphere.position.addInPlace(sphere.forward);
               sphere.position.addInPlace(rayDir);
   
               console.log(camera.getTarget());
               console.log(camera.getDirection(new BABYLON.Vector3(1, 0, 0)));
           };
   
           if ((map["s"] || map["S"])) {
               //sphere.position.z -= 0.2;
               //sphere.position.addInPlace(sphere.forward.negate());
               sphere.position.addInPlace(rayDir.negate());
           };
   
           if ((map["a"] || map["A"])) {
               sphere.rotation.y -= 0.1;
               //camera.rotation.y -= 0.1;
           };
   
           if ((map["d"] || map["D"])) {
               sphere.rotation.y += 0.1;
               //sphere.position.x += 0.2;
              // camera.rotation.y += 0.1;
           };
   
       }); */



    scene.onKeyboardObservable.add((keyboardInfo: BABYLON.KeyboardInfo) => {

        if (keyboardInfo.type == BABYLON.KeyboardEventTypes.KEYDOWN) {

        }
    })

    /*   scene.onPrePointerObservable.add((prePointerInfo:BABYLON.PointerInfoPre) =>{
  
          var event = prePointerInfo
          var delta = 0;
          if (event.wheelDelta) {
              delta = event.wheelDelta;
          }
          else if (event.detail) {
              delta = -event.detail;
          }
          if (delta) {
              console.log(delta);
              var dir = scene.activeCamera.getDirection(BABYLON.Axis.Z);
              console.log("dir: ", dir);
              //scene.activeCamera.position.z += delta/10;
              if (delta>0)
                  scene.activeCamera.position.addInPlace(dir);
              else
                  scene.activeCamera.position.subtractInPlace(dir);
  
          }
      }, BABYLON.PointerEventTypes.POINTERWHEEL, false);
      })
  
      scene.onPrePointerObservable.add( function(pointerInfo, eventState) {
          // console.log(pointerInfo);
          var event = pointerInfo.event;
          var delta = 0;
          if (event.wheelDelta) {
              delta = event.wheelDelta;
          }
          else if (event.detail) {
              delta = -event.detail;
          }
          if (delta) {
              console.log(delta);
              var dir = scene.activeCamera.getDirection(BABYLON.Axis.Z);
              console.log("dir: ", dir);
              //scene.activeCamera.position.z += delta/10;
              if (delta>0)
                  scene.activeCamera.position.addInPlace(dir);
              else
                  scene.activeCamera.position.subtractInPlace(dir);
  
          }
      }, BABYLON.PointerEventTypes.POINTERWHEEL, false); */

    scene.onPointerObservable.add((pointerinfo: BABYLON.PointerInfo) => {


        if (scene.pick(scene.pointerX, scene.pointerY) != null) {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);

            if (pickResult != null) {
                //camera.setTarget(pickResult.pickedMesh);
            }

            if (pointerinfo.type == BABYLON.PointerEventTypes.POINTERDOUBLETAP) {
                if (scene.pick(scene.pointerX, scene.pointerY) != null) {
                    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
                    console.log(pickResult);
                    //let pickParent = pickResult.pickedMesh._cache.parent;

                    if (pickResult.pickedMesh.parent != null) {
                        setMeshVisibility(pickResult.pickedMesh.parent.id, false)
                    } else {
                        setMeshVisibility(pickResult.pickedMesh.id, false)
                    }

                }
            } else if (pointerinfo.type == BABYLON.PointerEventTypes.POINTERPICK) { // vorher pointerinfo.type == BABYLON.PointerEventTypes.POINTERDOWN
                //camera.rotation = pointerinfo.pickInfo.pickedPoint;

                if (pickResult.pickedMesh) {

                    let obj;

                    //let elements = objectsHTML.getElementsByTagName("div");
                    let pickedParentObjectHTML;
                    let pickedObjectHTML;

                    if (pickResult.pickedMesh.parent != null) {
                        obj = document.getElementById(pickResult.pickedMesh.parent.id);
                        //pickedParentObjectHTML = pickResult.pickedMesh.parent.id;

                    } else {
                        obj = document.getElementById(pickResult.pickedMesh.id);
                        //pickedObjectHTML = pickResult.pickedMesh.id;

                    }

                    if (obj.getAttribute("isActive") == "false") {
                        objectSelected(obj.id);
                        obj.setAttribute("isActive", "true");
                        //obj.isActive = "true";
                    } else if (obj.getAttribute("isActive") == "true") {
                        objectDeselected(obj.id);
                        obj.setAttribute("isActive", "false");
                        //obj.isActive = "false";
                    } else {

                    }
                }
            } else if (pointerinfo.type == BABYLON.PointerEventTypes.POINTERDOWN) {
                //if(pointerinfo.event.button == 2){
                //BABYLON.PointerEventTypes.
                //camera.target = pickResult.pickedPoint;
                //camera.panningOriginTarget= pickResult.pickedPoint;
                console.log(pointerinfo);

                //}

            } else {
                return;
            }

        }
    });


    BABYLON.SceneLoader.Append("./babylon_export/", "birklehof.babylon", scene, function (scene) {
        // do something with the scene
        SERVER.loadData();


        scene.clearColor = new BABYLON.Color4(0.5, 0.7, 1.0, 1.0);
        scene.ambientColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        let ground = scene.getMeshByID("Stadtplanung Flurstücke");
        ground.checkCollisions = true;

        iniBought();

        //scene.getMeshByID("Sessel_000").isPickable = false;
        //boughtLayer.addMesh(<BABYLON.Mesh>scene.getMeshByID("Sessel_000"), BABYLON.Color3.Red());
    });

    return scene;
}

engine.runRenderLoop(() => {
    scene.render();

    //console.log(dir);
    //console.log("Kameraposition: " + scene.getCameraByName("freeCam").position);
});