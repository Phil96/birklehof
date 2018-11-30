import * as BABYLON from 'babylonjs';
import { addLabelToMesh } from "./gui";
import * as GUI from 'babylonjs-gui';
import 'babylonjs-loaders';

var canvas: any = document.getElementById("renderCanvas");
var engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);

function createScene(): BABYLON.Scene {
    var scene: BABYLON.Scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.FreeCamera('freeCam', new BABYLON.Vector3(10,2,100), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas,true);
        camera.keysUp.push(87);    //W
        camera.keysDown.push(83)   //D
        camera.keysLeft.push(65);  //A
        camera.keysRight.push(68); //S

        var camera1 = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(24,1,139), scene);
        camera1.setTarget(BABYLON.Vector3.Zero());
        camera1.attachControl(canvas,true);

        var camera2 = new BABYLON.FreeCamera('camera2', new BABYLON.Vector3(5,1,139), scene);
        camera2.setTarget(BABYLON.Vector3.Zero());
        camera2.attachControl(canvas,true);

        var camera3 = new BABYLON.FreeCamera('camera3', new BABYLON.Vector3(15,1,147), scene);
        camera3.setTarget(BABYLON.Vector3.Zero());
        camera3.attachControl(canvas,true);

        var texture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var container = new GUI.StackPanel();
        container.width = 0.5;
        container.height = 1;
        //container.color = "blue";
        container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        //advancedTexture.addControl(text1);
        //container.addControl(text);
        
        /*
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var button = BABYLON.GUI.Button.CreateSimpleButton("but", "Raum 1");
        button.width = 0.2;  
        button.height = "40px";
        button.color = "white";
        button.background = "grey";
        advancedTexture.addControl(button);
    //label.addControl(button);
    button.onPointerUpObservable.add(function(){
        scene.activeCamera = camera1
    });
    */


    var light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    scene.clearColor = new BABYLON.Color4(0.5, 0.8, 0.5,1.0);

    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);



    //var sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

    scene.onPointerMove = function (evt) {
        var pickResult = scene.pick(scene.pointerX, scene.pointerY);
        scene.meshes.forEach(function (m) {
            //text1.text = "none";
        });
        if (pickResult.pickedMesh) {
            addLabelToMesh(pickResult.pickedMesh);
            //text1.text = pickResult.pickedMesh.name;
        }
    }

    //addLabelToMesh(sphere);

    BABYLON.SceneLoader.Append("./birkle_assets/new/","birkle_test_02.babylon",scene, function (scene) {
        // do something with the scene
    });

    return scene;
}

var scene: BABYLON.Scene = createScene();

engine.runRenderLoop(() => {
    console.log("Kameraposition: " + scene.getCameraByName("camera1").position);
    scene.render();
});