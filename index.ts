import * as BABYLON from 'babylonjs';
import { addLabelToMesh } from "./gui";
import * as GUI from 'babylonjs-gui';
import 'babylonjs-loaders';
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

let buys = new DATA_BOUGHT.purchases;
buys.purchase = [];

/* let bought: DATA_BOUGHT.purchase;
bought.name = "Max Mustermann";
bought.object_ids = ["Fassade_001", "Fassade_002", "Fassade_003"]; */

//Materials

let pickMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
pickMaterial.diffuseColor = BABYLON.Color3.Red();
pickMaterial.alpha = 0.5;

let saveMaterial;

function setBoughtMat(_meshID: string, ) {
    let mesh = scene.getMeshByID(_meshID);

    if (mesh) {
        for (let i = 0; i < mesh.getChildren().length; i++) {
            let child = <BABYLON.Mesh>mesh.getChildren()[i];
            boughtLayer.addMesh(child, BABYLON.Color3.Red());
            //child.material = pickMaterial;
            //child.material.alpha = 0.3;
        }
    }
}

function showBought() {
    for (let i = 0; i < scene.meshes.length; i++) {
        scene.meshes[i].isVisible = false;
    }
    for (let i = 0; i < buys.purchase.length; i++) {
        let currObjects = buys.purchase[i];
        for (let j = 1; j < currObjects.object_ids.length; j++) {
            let currMeshID = currObjects.object_ids[j];
            let currMesh = <BABYLON.Mesh>scene.getMeshByID(currMeshID);


            if (currMesh.getChildMeshes().length != 0) {
                for (let k = 0; k < currMesh.getChildMeshes().length; k++) {
                    let child = <BABYLON.Mesh>currMesh.getChildMeshes()[k];
                    child.isVisible = true;
                }
            } else {
                currMesh.isVisible = true;
            }



        }
    }
    scene.getMeshByName("Stadtplanung Flurstücke").isVisible = true
}

function setMeshVisibility(_objID: string, _visibility: boolean) {
    let obj = scene.getMeshByID(_objID);

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
    if ("Stadtplanung Flurstücke" == obj.id) {
        obj.isVisible = true;
    }
}

function buyObjects(_event: MouseEvent) {

    let newBuy = new DATA_BOUGHT.purchase;
    let buyName = personalData.getElementsByTagName("input")[0].value + " " + personalData.getElementsByTagName("input")[1].value;
    newBuy.name = buyName;
    newBuy.object_ids = [];

    for (let i = 0; i < objectsHTML.getElementsByTagName("div").length; i++) {
        let data = objectsHTML.getElementsByTagName("div")[i].id;
        newBuy.object_ids.push(data);
    }

    var targetID = (<HTMLElement>_event.target).id;
    //console.log("Eingegebener Name: " + meshName + " ; TargetID: " + targetID);
    if (targetID == "buy") {
        for (let j = 0; j < newBuy.object_ids.length; j++) {
            setBoughtMat(newBuy.object_ids[j]);
            //setMeshVisibility(actBuy.object_ids[i],false);
            console.log(newBuy.object_ids[j]);
        }

        console.log(newBuy);
    }
    buys.purchase.push(newBuy);
    console.log(buys);

    let cartObjs = objectsHTML.getElementsByTagName("div");
    let cartObjsLength = cartObjs.length - 1;

    for (let k = cartObjsLength; k > 0; k--) {
        console.log(cartObjs[k]);
        objectDeselected(cartObjs[k].id);
    }
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

    /* let newDiv = document.createElement("div");
    newDiv.id = selectedMesh;

    let newInput = document.createElement("input");
    newInput.type = "checkbox";
    newInput.id = "_01";
    newInput.checked = true;

    let newLabel = document.createElement("label");
    newLabel.innerText = selectedMesh;
    newLabel.id = "_02";

    newDiv.append(newInput);
    newDiv.append(newLabel);
    objectsHTML.append(newDiv);

    referenceToOverview.getElementsByTagName("input")[0].checked = true; */

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
    if(target.id == "_02"){
        let active = reference.getAttribute("isActive");
        if(active == "false"){
            objectSelected(reference.id);
            active = "true";
            reference.setAttribute("isActive",active);
        }   else if (active == "true"){
            objectDeselected(reference.id);
            active = "false";
            reference.setAttribute("isActive",active);
        } else{

        }

    }
}

function toggle(_event: MouseEvent) {
    //var meshName: string = displayObjects.getElementsByTagName("input")[0].value;
    var targetID = (<HTMLElement>_event.target).id;
    //console.log("Eingegebener Name: " + meshName + " ; TargetID: " + targetID);
    /* if (targetID == "hide") {
        setMeshVisibility(meshName, false);
    }
    if (targetID == "show") {
        setMeshVisibility(meshName, true);
    } */
    if (targetID == "showAll") {
        //console.log(scene.meshes);
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
        //scene.render();
    }
    if (targetID == "hideAll") {
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
    }
    if (targetID == "showBought") {
        showBought();
    }
}

function resetField(_field: HTMLElement) {
    let field = _field
    let elements = field.getElementsByTagName("div");
    for (let i = 0; i < elements.length; i++) {
        elements[i]
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
            newDivChild.setAttribute("isActive","false");

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

    var camera = new BABYLON.FreeCamera('freeCam', new BABYLON.Vector3(15, 8, -20), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.keysUp.push(87);    //W
    camera.keysDown.push(83)   //D
    camera.keysLeft.push(65);  //A
    camera.keysRight.push(68); //S


    var camera1 = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(24, 1, 139), scene);
    camera1.setTarget(BABYLON.Vector3.Zero());
    camera1.attachControl(canvas, true);

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


    scene.onPointerObservable.add((pointerinfo: BABYLON.PointerInfo) => {

        if (scene.pick(scene.pointerX, scene.pointerY) != null) {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);

            if (pointerinfo.type == BABYLON.PointerEventTypes.POINTERDOUBLETAP) {
                if (scene.pick(scene.pointerX, scene.pointerY) != null) {
                    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
                    console.log(pickResult);
                    //let pickParent = pickResult.pickedMesh._cache.parent;

                    setMeshVisibility(pickResult.pickedMesh.id, false)



                }
            } else if (pointerinfo.type == BABYLON.PointerEventTypes.POINTERDOWN) {
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

                    if(obj.getAttribute("isActive") == "false"){
                        objectSelected(obj.id);
                        obj.setAttribute("isActive","true");
                        //obj.isActive = "true";
                    } else if(obj.getAttribute("isActive") == "true"){
                        objectDeselected(obj.id);
                        obj.setAttribute("isActive","false");
                        //obj.isActive = "false";
                    } else{

                    }

                    /* for (let i = 1; i < elements.length; i++) {
                        let currObject = elements[i].id
                        console.log(currObject);
                        if (pickResult.pickedMesh.parent != null) {
                            if (currObject == pickResult.pickedMesh.parent.id) {
                                console.log("Parent steht auf ausgewählter Liste")
                                pickedParentObjectHTML = currObject;
                                //objectDeselected(pickedObjectHTML);
                            }

                        } else {
                            if (currObject == pickResult.pickedMesh.id) {
                                console.log("Objekt steht auf ausgewählter Liste")
                                pickedObjectHTML = currObject;
                                //objectDeselected(pickedObjectHTML);
                            }
                        }
                    } */


                   /*  if (pickResult.pickedMesh.parent != null) {
                        console.log("Picked Parent: ")
                        console.log(pickResult.pickedMesh.parent.id);
                        if (pickedParentObjectHTML != null) {
                            objectSelected(pickResult.pickedMesh.parent.id);
                        } else {
                            objectDeselected(pickedParentObjectHTML);
                        }
                    } else {
                        if (pickedObjectHTML != null) {
                            objectSelected(pickResult.pickedMesh.id);
                        } else {
                            objectDeselected(pickedObjectHTML);
                        }
                        console.log("Picked Mesh: ")
                        console.log(pickResult.pickedMesh);

                    } */
                }
            } else {
                return;
            }

        }
    });


    BABYLON.SceneLoader.Append("./babylon_export/", "birklehof.babylon", scene, function (scene) {
        // do something with the scene

        scene.clearColor = new BABYLON.Color4(0.5, 0.7, 1.0, 1.0);
        scene.ambientColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    });



    /*
    BABYLON.SceneLoader.Append("./assets/", "birklehof.babylon", scene, function (scene) {
        // do something with the scene
    });
    */

    return scene;
}

engine.runRenderLoop(() => {
    scene.render();
    //console.log("Kameraposition: " + scene.getCameraByName("freeCam").position);
});