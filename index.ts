import * as BABYLON from 'babylonjs';
import { addLabelToMesh } from "./gui";
import * as GUI from 'babylonjs-gui';
import 'babylonjs-loaders';
import * as IBAN from "ibantools";
import * as DATA from "./database";
import * as DATA_CATEGORY from "./database_category";
import * as DATA_BOUGHT from "./database_bought";
import { Checkbox } from 'babylonjs-gui';


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

let boughtLayer = new BABYLON.HighlightLayer("hl1", scene);
let selectedLayer = new BABYLON.HighlightLayer("hl2", scene);

let actBuy = new DATA_BOUGHT.purchase;
actBuy.name = "Max Mustermann";
actBuy.object_ids = [];

let buys = DATA_BOUGHT.p;
//buys.purchase = [];
let testBuy: DATA_BOUGHT.purchase = new DATA_BOUGHT.purchase;
testBuy.name = "Max Mustermann";
testBuy.object_ids = ["Fassade_001", "Fassade_002", "Fassade_003"];

//Materials

let pickMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
pickMaterial.diffuseColor = BABYLON.Color3.Red();
pickMaterial.alpha = 0.5;



let saveMaterial;

function userMessage(_message:string){

}

function setBought(_objID:string){
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
                boughtLayer.addMesh(<BABYLON.Mesh>refToMesh, BABYLON.Color3.Red());
            } else {
                refToMesh.isPickable = false;
                boughtLayer.addMesh(<BABYLON.Mesh>refToMesh, BABYLON.Color3.Red());
            }

}

function iniBought() {
    for (let i = 0; i < DATA_BOUGHT.p.purchase.length; i++) {
        let currBuyIDs = DATA_BOUGHT.p.purchase[i].object_ids;

        for (let j = 0; j < currBuyIDs.length; j++) {
            setBought(currBuyIDs[j]);
            /* let refToHTML = document.getElementById(currBuyIDs[j]);
            let refToMesh = scene.getMeshByID(currBuyIDs[j]);

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
                boughtLayer.addMesh(<BABYLON.Mesh>refToMesh, BABYLON.Color3.Red());
            } else {
                refToMesh.isPickable = false;
                boughtLayer.addMesh(<BABYLON.Mesh>refToMesh, BABYLON.Color3.Red());
            } */

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
    /* for (let i = 0; i < scene.meshes.length; i++) {
        scene.meshes[i].isVisible = false;
    } */
    for (let i = 0; i < buys.purchase.length; i++) {
        let currObjects = buys.purchase[i];
        for (let j = 0; j < currObjects.object_ids.length; j++) {
            let currMeshID = currObjects.object_ids[j];

            setMeshVisibility(currMeshID, true);

            /* let currMesh = <BABYLON.Mesh>scene.getMeshByID(currMeshID);
            if (currMesh.getChildren().length != 0) {
                for (let k = 0; k < currMesh.getChildren().length; k++) {
                    let child = <BABYLON.Mesh>currMesh.getChildren()[k];
                    child.isVisible = true;
                }
            } else {
                currMesh.isVisible = true;
            } */



        }
    }
    scene.getMeshByName("Stadtplanung Flurstücke").isVisible = true
}

function hideBought() {
    /* for (let i = 0; i < scene.meshes.length; i++) {
        scene.meshes[i].isVisible = true;
    } */
    for (let i = 0; i < buys.purchase.length; i++) {
        let currObjects = buys.purchase[i];
        for (let j = 0; j < currObjects.object_ids.length; j++) {
            let currMeshID = currObjects.object_ids[j];

            setMeshVisibility(currMeshID, false);

            /* let currMesh = <BABYLON.Mesh>scene.getMeshByID(currMeshID);
            if (currMesh.getChildren().length != 0) {
                for (let k = 0; k < currMesh.getChildren().length; k++) {
                    let child = <BABYLON.Mesh>currMesh.getChildren()[k];
                    child.isVisible = true;
                }
            } else {
                currMesh.isVisible = true;
            } */



        }
    }
    scene.getMeshByName("Stadtplanung Flurstücke").isVisible = true
}

function showStructur(){
    let balken = DATA_CATEGORY.balken;
    let structur = DATA_CATEGORY.structur;

    for(let i = 0; i<balken.items.length;i++){
        let currB = balken.items[i].id;
        let obj = scene.getMeshByID(currB);

        if (obj.parent != null) {

            console.log(obj.parent.getChildren());
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
    for(let i = 0; i<structur.items.length;i++){
        let currB = structur.items[i].id;
        let obj = scene.getMeshByID(currB);

        if (obj.parent != null) {

            console.log(obj.parent.getChildren());
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
function hideStructur(){
    let balken = DATA_CATEGORY.balken;
    let structur = DATA_CATEGORY.structur;

    for(let i = 0; i<balken.items.length;i++){
        let currB = balken.items[i].id;
        let obj = scene.getMeshByID(currB);

        if (obj.parent != null) {

            console.log(obj.parent.getChildren());
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
    for(let i = 0; i<structur.items.length;i++){
        let currB = structur.items[i].id;
        let obj = scene.getMeshByID(currB);

        if (obj.parent != null) {

            console.log(obj.parent.getChildren());
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

        console.log(obj.parent.getChildren());
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

    let newBuy = new DATA_BOUGHT.purchase;
    let buyName = personalData.getElementsByTagName("input")[0].value + " " + personalData.getElementsByTagName("input")[1].value;
    newBuy.name = buyName;
    newBuy.object_ids = [];
    //newBuy.object_ids.pop;
    DATA_BOUGHT.p.purchase.push(testBuy);

    for (let i = 1; i < objectsHTML.getElementsByTagName("div").length; i++) {
        let data = objectsHTML.getElementsByTagName("div")[i].id;
        newBuy.object_ids.push(data);
    }

    var targetID = (<HTMLElement>_event.target).id;
    //console.log("Eingegebener Name: " + meshName + " ; TargetID: " + targetID);
    if (targetID == "buy") {
        for (let j = 0; j < newBuy.object_ids.length; j++) {
            //setBoughtMat(newBuy.object_ids[j]);

            //check if object allready bought
            for (let k = 0; k < DATA_BOUGHT.p.purchase.length; k++) {
                let currPurchase = DATA_BOUGHT.p.purchase[k];
                for (let l = 0; l < currPurchase.object_ids.length; l++) {
                    let currID = currPurchase.object_ids[l];
                    if (newBuy.object_ids[j] == currID) {
                        console.log(currID + " wurde leider gerade eben gespendet.")
                        iniBought();
                        return;
                    }
                }

            }

            let cartObjs = objectsHTML.getElementsByTagName("div");
            let cartObjsLength = cartObjs.length - 1;

            for (let k = cartObjsLength; k > 0; k--) {
                console.log(cartObjs[k]);
                objectDeselected(cartObjs[k].id);
            }

            //setBought(newBuy.object_ids[j]);

            //setMeshVisibility(newBuy.object_ids[j],false);
            console.log(newBuy.object_ids[j]);
        }

        let iban = <HTMLInputElement>document.getElementById("iban");
        if(IBAN.isValidIBAN(iban.value)==false){
            /* let mod = document.getElementById("err");
            mod.className = "modal";
            let modC = document.createElement("div");
            modC.className = "modal-content";
            let span = document.createElement("span");
            span.className = "close";
            span.innerText = "&times;";

            let con = document.createElement("div");
            con.innerText = "Bitte geben Sie eine gültige IBAN ein."

            modC.append(span);
            modC.append(con);
            mod.append(modC); */
            console.log("keine gültige IBAN")
            return;

        } else {
            console.log("gültige IBAN")
        }

        console.log(newBuy);
    }
    DATA_BOUGHT.p.purchase.push(newBuy);
    iniBought();
    //buys.purchase.push(newBuy);
    console.log(buys);
    console.log(DATA_BOUGHT.p.purchase);

    resetField(objectsHTML);
    let newSum = 0;

    objectsHTML.getElementsByTagName("label")[0].innerText = newSum.toString();
    //console.log(actBuy);

    /* //var meshName: string = bearbeitung.getElementsByTagName("div");
    var targetID = (<HTMLElement>_event.target).id;
    console.log("Eingegebener Name: " + meshName + " ; TargetID: " + targetID);
    if (targetID == "buy") {
        setMeshVisibility(meshName, false);
    } */
}

function objectBuy(selectedMesh: string) {
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

    //referenceToOverview.style.display = "block";

    for (let i = 1; i < referenceToOverview.parentElement.childElementCount; i++) {
        let child: HTMLElement = <HTMLElement>referenceToOverview.parentElement.children[i];
        child.style.display = "block";
    }


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
        console.log(referenceToMesh);
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
    let reference: Element = overview.querySelector("#" + target.parentElement.id);
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

        if (target.className == "glyphicon glyphicon-eye-open") {
            for (let i = 0; i < childs.length; i++) {

            }
        }
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
    if(targetID == "toggleAll"){
        let eyeOpen:boolean;
        if(target.className == "glyphicon glyphicon-eye-open"){

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
        }else {

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
    if(targetID == "toggleBought"){
        if(target.className == "glyphicon glyphicon-eye-open"){
            hideBought();
            target.className = "glyphicon glyphicon-eye-close";
        } else{
            showBought();
            target.className = "glyphicon glyphicon-eye-open";
        }
    }
    if(targetID == "toggleStructur"){
        if(target.className == "glyphicon glyphicon-eye-open"){
            hideStructur();
            target.className = "glyphicon glyphicon-eye-close";
        } else{
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

/* function chooseCategory(_event: MouseEvent) {
    resetField(overview);
    var targetID = (<HTMLElement>_event.target).id;
    initData(targetID);

} */

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

    console.log(DATA);
    console.log(DATA_CATEGORY);
    console.log(DATA_BOUGHT);

    // console.log("income: " + income);

    initCategorys();

    var scene: BABYLON.Scene = new BABYLON.Scene(engine);

    //var camera = new BABYLON.ArcRotateCamera("Camera", 15, 8, -20, new BABYLON.Vector3(0, 0, 0), scene);

    // This positions the camera
    //camera.setPosition(new BABYLON.Vector3(0, 0, -10));

    // This attaches the camera to the canvas
    
    //camera.attachControl(canvas, true);

     var camera = new BABYLON.FreeCamera('freeCam', new BABYLON.Vector3(15, 8, -20), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.keysUp.push(87);    //W
    camera.keysDown.push(83)   //D
    camera.keysLeft.push(65);  //A
    camera.keysRight.push(68); //S  


    /* var camera = new BABYLON.FreeCamera('freeCam', new BABYLON.Vector3(15, 8, -20), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.keysUp.push(87);    //W
    camera.keysDown.push(83)   //D
    camera.keysLeft.push(65);  //A
    camera.keysRight.push(68); //S  */
    

    //cameraArc.setTarget(camera.position);
    //scene.activeCamera = cameraArc;
    //cameraArc.

    /* var arcCamera = new BABYLON.ArcRotateCamera("arcCam",
                    BABYLON.Tools.ToRadians(45),
                    BABYLON.Tools.ToRadians(45),
                    10.0,new BABYLON.Vector3(scene.pointerX,scene.pointerY,0),scene); */


    /* var camera1 = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(24, 1, 139), scene);
    camera1.setTarget(BABYLON.Vector3.Zero());
    camera1.attachControl(canvas, true); */

    var texture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var container = new GUI.StackPanel();
    container.width = 0.5;
    container.height = 1;
    //container.color = "blue";
    container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    var light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    scene.clearColor = new BABYLON.Color4(0.5, 0.8, 0.5, 1.0);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);



     scene.onKeyboardObservable.add((keyboardInfo:BABYLON.KeyboardInfo) =>{

       /*  //Pressing W
        camera.cameraDirection= camera.cameraDirection.add(new BABYLON.Vector3(0,0,0.1));
        //Pressing S
        camera.cameraDirection= camera.cameraDirection.add(new BABYLON.Vector3(0,0,-0.1));
        //Pressing A
        camera.cameraDirection= camera.cameraDirection.add(new BABYLON.Vector3(-0.1,0,0));	
        //Pressing D 
        camera.cameraDirection= camera.cameraDirection.add(new BABYLON.Vector3(0.1,0,0));
        //The rotation is done by creating mouse variable: */

        if(keyboardInfo.type == BABYLON.KeyboardEventTypes.KEYDOWN){
            /* if(keyboardInfo.event.keyCode == 87){
                camera.cameraDirection= camera.cameraDirection.add(new BABYLON.Vector3(0,0,0.1));
            }
            if(keyboardInfo.event.keyCode == 68){
                camera.cameraDirection= camera.cameraDirection.add(new BABYLON.Vector3(0,0,-0.1));
            }
            if(keyboardInfo.event.keyCode == 65){
                camera.cameraDirection= camera.cameraDirection.add(new BABYLON.Vector3(-0.1,0,0));
            }
            if(keyboardInfo.event.keyCode == 83){
                camera.cameraDirection= camera.cameraDirection.add(new BABYLON.Vector3(0.1,0,0));
            } */
        }
    }) 

    scene.onPointerObservable.add((pointerinfo: BABYLON.PointerInfo) => {

        if (scene.pick(scene.pointerX, scene.pointerY) != null) {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);

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
            } else if (pointerinfo.type == BABYLON.PointerEventTypes.POINTERDOWN) {
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
            } else {
                return;
            }

        }
    });



    /*
    BABYLON.SceneLoader.Append("./assets/", "birklehof.babylon", scene, function (scene) {
        // do something with the scene
    });
    */
    BABYLON.SceneLoader.Append("./babylon_export/", "birklehof.babylon", scene, function (scene) {
        // do something with the scene

        scene.clearColor = new BABYLON.Color4(0.5, 0.7, 1.0, 1.0);
        scene.ambientColor = new BABYLON.Color3(0.1, 0.1, 0.1);

        iniBought();

        //scene.getMeshByID("Sessel_000").isPickable = false;
        //boughtLayer.addMesh(<BABYLON.Mesh>scene.getMeshByID("Sessel_000"), BABYLON.Color3.Red());
    });

    return scene;
}

engine.runRenderLoop(() => {
    scene.render();
    //console.log("Kameraposition: " + scene.getCameraByName("freeCam").position);
});