import * as BABYLON from 'babylonjs';
import { addLabelToMesh } from "./gui";
import * as GUI from 'babylonjs-gui';
import 'babylonjs-loaders';
import * as DATA from "./database";
import { Checkbox } from 'babylonjs-gui';


var bearbeitung = document.getElementById("bearbeitung");
bearbeitung.addEventListener("click", toggle);

let objectsHTML = document.getElementById("objects");
objectsHTML.addEventListener("click", manipulateCheckout);

let overview = document.getElementById("overview");
overview.addEventListener("click", chooseObject);

var canvas: any = document.getElementById("renderCanvas");
var engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);
var scene: BABYLON.Scene = createScene();

let pickMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
pickMaterial.diffuseColor = BABYLON.Color3.Red();

let saveMaterial;

function setMeshVisibility(_meshName: string, _visibility: boolean) {
    let mesh = scene.getMeshByName(_meshName);

    if (mesh) {
        mesh.isVisible = _visibility;
    }
}

function objectSelected(selectedMeseh:string){
    let referenceToOverview: Element = overview.querySelector("#" + selectedMeseh);
    let referenceToCheckout: Element = objectsHTML.querySelector("#" + selectedMeseh);
    let referenceToMesh = scene.getMeshByID(selectedMeseh);

    let newDiv = document.createElement("div");
    newDiv.id = selectedMeseh;

    let newInput = document.createElement("input");
    newInput.type = "checkbox";
    newInput.id = "_01";
    newInput.checked = true;
 
    let newLabel = document.createElement("label");
    newLabel.innerText = selectedMeseh;
    newLabel.id = "_02";

    newDiv.append(newInput);
    newDiv.append(newLabel);
    objectsHTML.append(newDiv);

    referenceToOverview.getElementsByTagName("input")[0].checked = true;

    referenceToMesh.material = pickMaterial;

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

    if (target.id == "_01" && reference.getElementsByTagName("input")[0].checked == true) {

        objectSelected(target.parentElement.id);

        /*
        let newDiv = document.createElement("div");
        newDiv.id = target.parentElement.id;
        //newDiv.setAttribute("price",target.parentElement.price);

        let newInput = document.createElement("input");
        newInput.type = "checkbox";
        //newInput.id = currentObject.name + "_01";
        newInput.id = "_01";
        newInput.checked = true;
        //newInput.value = pickResult.pickedMesh.name;

        let newLabel = document.createElement("label");
        newLabel.innerText = target.parentElement.id;
        newLabel.id = "_02";

        newDiv.append(newInput);
        newDiv.append(newLabel);
        objectsHTML.append(newDiv);
        */

    }
    if (target.id == "_01" && reference.getElementsByTagName("input")[0].checked == false) {
        referenceToCheckout.remove();
    }
    if (target.id == "_02") {
        for (let i = 0; i < scene.meshes.length; i++) {
            scene.meshes[i].isVisible = false;
        }
        console.log(target.parentElement.id);
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
    var meshName: string = bearbeitung.getElementsByTagName("input")[0].value;
    var targetID = (<HTMLElement>_event.target).id;
    console.log("Eingegebener Name: " + meshName + " ; TargetID: " + targetID);
    if (targetID == "hide") {
        setMeshVisibility(meshName, false);
    }
    if (targetID == "show") {
        setMeshVisibility(meshName, true);
    }
}

function initData() {
    for (let i = 0; i < DATA.data.objects.length; i++) {
        let currentObject = DATA.data.objects[i];
        let newDiv = document.createElement("div");
        newDiv.id = currentObject.name;
        newDiv.setAttribute("price", currentObject.price.toString());

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
        overview.append(newDiv);

    }
}

function createScene(): BABYLON.Scene {

    console.log(DATA);
    initData();

    var scene: BABYLON.Scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.FreeCamera('freeCam', new BABYLON.Vector3(10, 2, 100), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.keysUp.push(87);    //W
    camera.keysDown.push(83)   //D
    camera.keysLeft.push(65);  //A
    camera.keysRight.push(68); //S

    var camera1 = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(24, 1, 139), scene);
    camera1.setTarget(BABYLON.Vector3.Zero());
    camera1.attachControl(canvas, true);

    var camera2 = new BABYLON.FreeCamera('camera2', new BABYLON.Vector3(5, 1, 139), scene);
    camera2.setTarget(BABYLON.Vector3.Zero());
    camera2.attachControl(canvas, true);

    var camera3 = new BABYLON.FreeCamera('camera3', new BABYLON.Vector3(15, 1, 147), scene);
    camera3.setTarget(BABYLON.Vector3.Zero());
    camera3.attachControl(canvas, true);

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
        if (pointerinfo.type != BABYLON.PointerEventTypes.POINTERDOWN) {
            return;
        }
        //pointerinfo.pickInfo.pickedMesh.visibility = 1;

        var pickResult = scene.pick(scene.pointerX, scene.pointerY);

        //scene.pick(scene.pointerX, scene.pointerY).pickedMesh.isVisible = false;
        //hideMesh(pickResult.pickedMesh.name);

        scene.meshes.forEach(function (m) {
            //text1.text = "none";
        });
        if (pickResult.pickedMesh) {

            bearbeitung.getElementsByTagName("input")[0].value = pickResult.pickedMesh.name;
            console.log("Picked material: " + pickResult.pickedMesh.material);

            saveMaterial = pickResult.pickedMesh.material;
            pickResult.pickedMesh.material = pickMaterial;


            let newDiv = document.createElement("div");
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

            addLabelToMesh(pickResult.pickedMesh);

            //text1.text = pickResult.pickedMesh.name;
        }
    });


    /*
    scene.onPointerObservable = function (evt:BABYLON.Observable<BABYLON.PointerInfo>) {
        var pickResult = scene.pick(scene.pointerX, scene.pointerY);
        scene.meshes.forEach(function (m) {
            //text1.text = "none";
        });
        if (pickResult.pickedMesh) {
            addLabelToMesh(pickResult.pickedMesh);
            //text1.text = pickResult.pickedMesh.name;
        }
    }*/

    //addLabelToMesh(sphere);

    BABYLON.SceneLoader.Append("./birkle_assets/new/", "birkle_test_03.babylon", scene, function (scene) {
        // do something with the scene
    });

    return scene;
}

engine.runRenderLoop(() => {
    //console.log("Kameraposition: " + scene.getCameraByName("camera1").position);
    scene.render();
});