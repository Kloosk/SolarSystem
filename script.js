let pivot9,pivot2,pivot3,pivot4,pivot5,pivot6,pivot7,pivot8,light,planet1Mesh,planet2Mesh,planet3Mesh,planet4Mesh,planet5Mesh,planet6Mesh,planet7Mesh,planet8Mesh,planet9Mesh;
let position = new THREE.Vector3();
const animation = () => {
    planet1Mesh.rotation.y += 0.004;
    planet2Mesh.rotation.y += 0.002;
    planet3Mesh.rotation.y += 0.001;
    planet4Mesh.rotation.y += 0.007;
    planet5Mesh.rotation.y += 0.007;
    planet6Mesh.rotation.y += 0.009;
    planet7Mesh.rotation.y += 0.009;
    planet8Mesh.rotation.y += 0.008;
    planet9Mesh.rotation.y += 0.008;
    pivot2.rotation.y += 0.03;
    pivot3.rotation.y += 0.01;
    pivot4.rotation.y += 0.006;
    pivot5.rotation.y += 0.005;
    pivot6.rotation.y += 0.004;
    pivot7.rotation.y += 0.003;
    pivot8.rotation.y += 0.002;
    pivot9.rotation.y += 0.001;

    renderer.render( scene, camera );
    requestAnimationFrame(animation);
};
let camera = new THREE.PerspectiveCamera( 110, window.innerWidth / window.innerHeight, 0.01, 1000 );
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer( { antialias: true,alpha: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new THREE.TextureLoader();

const planet1 = loader.load('image/sun.jpg');
const planet2 = loader.load('image/merkury.jpg');
const planet3 = loader.load('image/venus.jpg');
const planet4 = loader.load('image/earth_map.jpg');
const planet5 = loader.load('image/mars.jpg');
const planet6 = loader.load('image/jupiter.jpg');
const planet7 = loader.load('image/saturn.jpg');
const planet8 = loader.load('image/uran.jpg');
const planet9 = loader.load('image/neptun.jpg');

light =  new THREE.PointLight( 0xffffff, 2, 50 );
light.position.set( 0, 0, 5 );


let planet1geo = new THREE.SphereGeometry( 2.2, 32, 32 );
let planet1mat = new THREE.MeshPhongMaterial({map:planet1});
planet1Mesh = new THREE.Mesh( planet1geo, planet1mat );

let planet2geo = new THREE.SphereGeometry( 0.38, 32, 32 );
let planet2mat = new THREE.MeshPhongMaterial({map:planet2});
planet2Mesh = new THREE.Mesh( planet2geo, planet2mat );
planet2Mesh.position.set(3,2,0);

let planet3geo = new THREE.SphereGeometry( 0.94, 32, 32 );
let planet3mat = new THREE.MeshPhongMaterial({map:planet3});
planet3Mesh = new THREE.Mesh( planet3geo, planet3mat );
planet3Mesh.position.set(-4,5,0);

let planet4geo = new THREE.SphereGeometry( 1, 32, 32 );
let planet4mat = new THREE.MeshPhongMaterial({map:planet4});
planet4Mesh = new THREE.Mesh( planet4geo, planet4mat );
planet4Mesh.position.set(7,0,0);

let planet5geo = new THREE.SphereGeometry( 0.53, 32, 32 );
let planet5mat = new THREE.MeshPhongMaterial({map:planet5});
planet5Mesh = new THREE.Mesh( planet5geo, planet5mat );
planet5Mesh.position.set(-10,0,0);

let planet6geo = new THREE.SphereGeometry( 1.5, 32, 32 );
let planet6mat = new THREE.MeshPhongMaterial({map:planet6});
planet6Mesh = new THREE.Mesh( planet6geo, planet6mat );
planet6Mesh.position.set(12,10,0);

let planet7geo = new THREE.SphereGeometry( 1.4, 32, 32 );
let planet7mat = new THREE.MeshPhongMaterial({map:planet7});
planet7Mesh = new THREE.Mesh( planet7geo, planet7mat );
planet7Mesh.position.set(-14,-2,0);

let planet8geo = new THREE.SphereGeometry( 1.2, 32, 32 );
let planet8mat = new THREE.MeshPhongMaterial({map:planet8});
planet8Mesh = new THREE.Mesh( planet8geo, planet8mat );
planet8Mesh.position.set(16,-8,0);

let planet9geo = new THREE.SphereGeometry( 1.3, 32, 32 );
let planet9mat = new THREE.MeshPhongMaterial({map:planet9});
planet9Mesh = new THREE.Mesh( planet9geo, planet9mat );
planet9Mesh.position.set(-18,0,0);

pivot2 = new THREE.Object3D(); //0,0,0
pivot3 = new THREE.Object3D(); //0,0,0
pivot4 = new THREE.Object3D(); //0,0,0
pivot5 = new THREE.Object3D(); //0,0,0
pivot6 = new THREE.Object3D(); //0,0,0
pivot7 = new THREE.Object3D(); //0,0,0
pivot8 = new THREE.Object3D(); //0,0,0
pivot9 = new THREE.Object3D(); //0,0,0

pivot2.add(planet2Mesh);
pivot3.add(planet3Mesh);
pivot4.add(planet4Mesh);
pivot5.add(planet5Mesh);
pivot6.add(planet6Mesh);
pivot7.add(planet7Mesh);
pivot8.add(planet8Mesh);
pivot9.add(planet9Mesh);
scene.add(pivot9,pivot2,pivot3,pivot4,pivot5,pivot6,pivot7,pivot8,planet1Mesh,light);

camera.position.z = 20;

const controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.minDistance = 5;
controls.maxDistance = 100;
controls.enableRotate = false;

//DOM PART//
const planets = ["Sun","Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune"];
const planetsMesh = [planet1Mesh,planet2Mesh,planet3Mesh,planet4Mesh,planet5Mesh,planet6Mesh,planet7Mesh,planet8Mesh,planet9Mesh];
const msg = document.querySelector(".message");
const msgName = document.querySelector(".message__name");
const domEvents = new THREEx.DomEvents(camera,renderer.domElement);

for(let i=0; i<9; i++){
    domEvents.addEventListener(planetsMesh[i],'click',e => {
        msg.style.left = `${e.origDomEvent.clientX}px`;
        msg.style.top= `${e.origDomEvent.clientY}px`;
        msg.style.transform = "scale(0.7)";
        msg.style.visibility = "visible";
        msgName.innerText = planets[i];
    });
}
const msgExit = document.querySelector(".message__exit");
msgExit.addEventListener("click",() => {
    msg.style.transform = "scale(0)";
});

animation();

window.addEventListener("resize",() => {
    const {innerWidth,innerHeight} = window;
    renderer.setSize( innerWidth, innerHeight );
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
});





