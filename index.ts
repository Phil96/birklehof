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
overview.addEventListener("click", chooseObject);

/* let categorys = document.getElementById("categorys");
categorys.addEventListener("click", chooseCategory); */

var canvas: any = document.getElementById("renderCanvas");
var engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);
var scene: BABYLON.Scene = createScene();

let hl = new BABYLON.HighlightLayer("hl1", scene);

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
            child.material = pickMaterial;
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
        for (let j = 0; j < currObjects.object_ids.length; j++) {
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


function setMeshVisibility(_meshID: string, _visibility: boolean) {
    let mesh = scene.getMeshByID(_meshID);

    if (mesh) {
        for (let i = 0; i < mesh.getChildren().length; i++) {
            let child = <BABYLON.Mesh>mesh.getChildren()[i];
            child.isVisible = _visibility;
        }
    }
}

function buyObjects(_event: MouseEvent) {

    let newBuy = new DATA_BOUGHT.purchase;
    newBuy.name = "Max Mustermann";
    newBuy.object_ids = [];

    for (let i = 0; i < objectsHTML.getElementsByTagName("div").length; i++) {
        let data = objectsHTML.getElementsByTagName("div")[i].id;
        newBuy.object_ids.push(data);
    }

    var targetID = (<HTMLElement>_event.target).id;
    //console.log("Eingegebener Name: " + meshName + " ; TargetID: " + targetID);
    if (targetID == "buy") {
        for (let i = 0; i < newBuy.object_ids.length; i++) {
            setBoughtMat(newBuy.object_ids[i]);
            //setMeshVisibility(actBuy.object_ids[i],false);
            console.log(newBuy.object_ids[i]);
        }

        console.log(newBuy);
    }
    buys.purchase.push(newBuy);
    console.log(buys);

    //console.log(actBuy);

    /* //var meshName: string = bearbeitung.getElementsByTagName("div");
    var targetID = (<HTMLElement>_event.target).id;
    console.log("Eingegebener Name: " + meshName + " ; TargetID: " + targetID);
    if (targetID == "buy") {
        setMeshVisibility(meshName, false);
    } */
}

function objectSelected(selectedMesh: string) {
    let referenceToOverview: Element = overview.querySelector("#" + selectedMesh);
    let referenceToCheckout: Element = objectsHTML.querySelector("#" + selectedMesh);
    let referenceToMesh = <BABYLON.Mesh>scene.getMeshByID(selectedMesh);

    let newDiv = document.createElement("div");
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

    referenceToOverview.getElementsByTagName("input")[0].checked = true;

    //referenceToMesh.material = pickMaterial;
    if (referenceToMesh.getChildMeshes() != null) {
        let childs = referenceToMesh.getChildMeshes();
        for (let i = 0; i < childs.length; i++) {
            let child = <BABYLON.Mesh>childs[i];
            hl.addMesh(child, BABYLON.Color3.Green());
        }
    }
    //hl.addMesh(referenceToMesh,BABYLON.Color3.Green());
}

function objectDeselected(selectedMeseh: string) {
    let referenceToOverview: Element = overview.querySelector("#" + selectedMeseh);
    let referenceToCheckout: Element = objectsHTML.querySelector("#" + selectedMeseh);
    let referenceToMesh = scene.getMeshByID(selectedMeseh);

    referenceToOverview.getElementsByTagName("input")[0].checked = false;

    referenceToCheckout.remove();

    if (referenceToMesh.getChildMeshes() != null) {
        let childs = referenceToMesh.getChildMeshes();
        for (let i = 0; i < childs.length; i++) {
            let child = <BABYLON.Mesh>childs[i];
            hl.removeMesh(child);
            //hl.addMesh(child,BABYLON.Color3.Green());
        }
    }

    //referenceToMesh.material = saveMaterial;
}

function manipulateCheckout(_event: MouseEvent) {
    var target = (<HTMLElement>_event.target);

    if (target.tagName == "INPUT") {
        target.parentElement.remove();
        let reference: Element = overview.querySelector("#" + target.parentElement.id);
        reference.getElementsByTagName("input")[0].checked = false;
    }
}

function chooseObject(_event: MouseEvent) {
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

    if (target.id == "_01" && reference.getElementsByTagName("input")[0].checked == true) {

        objectSelected(target.parentElement.id);

    }
    if (target.id == "_01" && reference.getElementsByTagName("input")[0].checked == false) {
        objectDeselected(target.parentElement.id);
        //referenceToCheckout.remove();
    }
    if (target.id == "_02") {
        for (let i = 0; i < scene.meshes.length; i++) {
            scene.meshes[i].isVisible = false;
        }
        console.log(target.parentElement.id);

        if (scene.getMeshByID(target.parentElement.id) != null) {
            let parent = <BABYLON.Mesh>scene.getMeshByID(target.parentElement.id);
            for (let i = 0; i < parent.getChildren().length; i++) {
                let child = parent.getChildMeshes()[i];
                child.isVisible = true;
            }
        }
        scene.getMeshByID(target.parentElement.id).isVisible = true;

        scene.getMeshByName("Stadtplanung Flurstücke").isVisible = true; //untergrund bleibt sichtbar

        var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

        myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
        myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
        myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

        //scene.getMeshByName(target.id).material.
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
        //scene.render();
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

function chooseCategory(_event: MouseEvent) {
    resetField(overview);
    var targetID = (<HTMLElement>_event.target).id;
    initData(targetID);

}

function initCategorys() {
    for (let i = 0; i < DATA_CATEGORY.categorys.categorys.length; i++) {
        let currentCat = DATA_CATEGORY.categorys.categorys[i];
        let newDiv = document.createElement("div");
        newDiv.id = currentCat.name;
        newDiv.className = "category";
        newDiv.innerText = currentCat.name;

        /* let newLabelP = document.createElement("label");
            newLabelP.innerText = currentCat.name;
            newDiv.append(newLabelP); */

        for (let j = 0; j < currentCat.items.length; j++) {
            let newDivChild = document.createElement("div");
            let currentObject = currentCat.items[j];
            newDivChild.id = currentObject.id
            newDivChild.setAttribute("price", currentObject.price.toString());

            let newInput = document.createElement("input");
            newInput.type = "checkbox";
            newInput.id = "_01";

            let newLabel = document.createElement("label");
            newLabel.innerText = currentObject.name;
            newLabel.id = "_02";

            newDivChild.append(newInput);
            newDivChild.append(newLabel);
            newDivChild.style.display = "none";
            newDiv.append(newDivChild);
        }
        overview.append(newDiv);

        /* let newButton = document.createElement("button");
        newButton.innerText = currentObject.name;
        newButton.id = currentObject.name;
        newButton.type = "button";
        //newDiv.setAttribute("price", currentObject.price.toString());

        let newInput = document.createElement("input");
         newInput.type = "checkbox"; 
        //newInput.id = currentObject.name + "_01";
         newInput.id = "_01"; 
        //newInput.checked = true;
        //newInput.value = pickResult.pickedMesh.name;

        let newLabel = document.createElement("label");
        newLabel.innerText = currentObject.name;
        newLabel.id = "_02"; */

        //newDiv.append(newInput);
        //newDiv.append(newLabel);
        //categorys.append(newButton);

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

        /* let currentObject = DATA_CATEGORY.categorys.categorys[i];
        let newDiv = document.createElement("div");
        newDiv.id = currentObject.name;
        //newDiv.setAttribute("price", currentObject.price.toString());

        let newInput = document.createElement("input");
        newInput.type = "checkbox";
        //newInput.id = currentObject.name + "_01";
        newInput.id = "_01";
        //newInput.checked = true;
        //newInput.value = pickResult.pickedMesh.name;

        let newLabel = document.createElement("label");
        newLabel.innerText = currentObject.name;
        newLabel.id = "_02";

        newDiv.append(newInput);
        newDiv.append(newLabel);
        overview.append(newDiv); */

    }
}

function createScene(): BABYLON.Scene {

    console.log(DATA);
    console.log(DATA_CATEGORY);
    console.log(DATA_BOUGHT);

    /* let income = 0;

    /* for (let i = 0; i < DATA_CATEGORY.categorys.categorys.length; i++) {
        console.log("erste schleife");
        for (let j = 0; j < DATA_CATEGORY.categorys.categorys[i].items.length; j++) {
            console.log("zweite schleife");
            income = DATA_CATEGORY.categorys.categorys[i].items[j].price + income;
        }
    } */

    // console.log("income: " + income);

    //initData();
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

        //mousewheel


        if (pointerinfo.type != BABYLON.PointerEventTypes.POINTERDOWN) {
            return;
        }
        //pointerinfo.pickInfo.pickedMesh.visibility = 1;
        if (scene.pick(scene.pointerX, scene.pointerY) != null) {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);
            console.log(pickResult);
            //let pickParent = pickResult.pickedMesh._cache.parent;

            if (pickResult.pickedMesh.parent == null) {
                if ("Stadtplanung Flurstücke" != pickResult.pickedMesh.parent.id) {
                    pickResult.pickedMesh.isVisible = false;
                }

            } else {
                console.log(pickResult.pickedMesh.parent.getChildren());
                for (let i = 0; i < pickResult.pickedMesh.parent.getChildren().length; i++) {
                    let child = <BABYLON.Mesh>pickResult.pickedMesh.parent.getChildren()[i];
                    child.isVisible = false;
                }
            }
            //scene.pick(scene.pointerX, scene.pointerY).pickedMesh.isVisible = false;
            //pickResult.pickedMesh._cache.parent.isVisible = false;

            //hideMesh(pickResult.pickedMesh.name);

            scene.meshes.forEach(function (m) {
                //text1.text = "none";
            });
            if (pickResult.pickedMesh) {

                displayObjects.getElementsByTagName("input")[0].value = pickResult.pickedMesh.name;
                /* console.log("Picked material: " + pickResult.pickedMesh.material);
                console.log("Cache Parent: ");
                console.log(pickParent);
                console.log("Cache: ");
                console.log(pickResult.pickedMesh._cache);
                console.log("Parent: ");
                console.log(pickResult.pickedMesh.parent);
                console.log("Picked Mesh: ")
                console.log(pickResult.pickedMesh); */

                if (pickResult.pickedMesh.parent != null) {
                    console.log("Picked Parent: ")
                    console.log(pickResult.pickedMesh.parent);
                } else {
                    console.log("Picked Mesh: ")
                    console.log(pickResult.pickedMesh);
                }

                /* for(let i = 0; pickParent._children.length > i; i++){
                    //pickParent._children[i].isVisible = false;
                } */

                saveMaterial = pickResult.pickedMesh.material;
                pickResult.pickedMesh.material = pickMaterial;

                objectSelected(pickResult.pickedMesh.parent.id);


                /* let newDiv = document.createElement("div");
                newDiv.id = pickResult.pickedMesh.name;
                //newDiv.setAttribute("price",target.parentElement.price);

                let newInput = document.createElement("input");
                newInput.type = "checkbox";
                //newInput.id = currentObject.name + "_01";
                newInput.id = "_01";
                newInput.checked = true;
                //newInput.value = pickResult.pickedMesh.name;

                let newLabel = document.createElement("label");
                newLabel.innerText = pickResult.pickedMesh.name;
                newLabel.id = "_02";

                newDiv.append(newInput);
                newDiv.append(newLabel);
                objectsHTML.append(newDiv);

                addLabelToMesh(pickResult.pickedMesh); */

                //text1.text = pickResult.pickedMesh.name;
            }
        }
    });

    //addLabelToMesh(sphere);

    //loads old scene (test)

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