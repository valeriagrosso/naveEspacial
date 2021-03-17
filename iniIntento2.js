'use strict'
let GAME = {
  draw:function(){},
  setup:function(){},
  objects:{},
  canvas: document.querySelector("#miCanvas"),
  sources: {
    meteorito:
    "https://images.vexels.com/media/users/3/203033/isolated/preview/bad8b13b449cf80e9cdbf1c355d63f4f-ilustraci-oacute-n-de-gran-asteroide-by-vexels.png",
    mercurio: 
    "https://images.vexels.com/media/users/3/205473/isolated/preview/8248c00ffcf15106da21d9a8e03fb292-ilustraci-oacute-n-del-planeta-mercurio-by-vexels.png",
    venus:
    "https://images.vexels.com/media/users/3/203449/isolated/preview/5c54f244e824bc49de3eba5c9351f3cd-ilustraci-oacute-n-del-planeta-venus-by-vexels.png",
    tierra:
    "https://images.vexels.com/media/users/3/152418/isolated/preview/098366e6994dd75ab46b47cd27b2c9d4-icono-de-planeta-tierra-by-vexels.png",
    marte:
    "https://images.vexels.com/media/users/3/205472/isolated/preview/62c3ddcae4b835271eb633cb80c8c797-ilustraci-oacute-n-de-planeta-marte-by-vexels.png",
    jupiter:
    "https://images.vexels.com/media/users/3/152509/isolated/preview/e058e7f53d319e0628763c70ab7dce14-icono-del-planeta-j-uacute-piter-by-vexels.png",
    saturno:
    "https://images.vexels.com/media/users/3/205476/isolated/preview/56e1687ae914c14cb0ed474f0982f45f-ilustraci-oacute-n-del-planeta-saturno-by-vexels.png",
    urano:
    "https://images.vexels.com/media/users/3/152680/isolated/preview/22e162e0d0066ad0881e1ee797574680-icono-del-planeta-urano-by-vexels.png",
    neptuno:
    "https://images.vexels.com/media/users/3/203296/isolated/lists/6bb35250c67c068b44e2aac95775050e-ilustracion-del-planeta-neptuno.png",
    pluton:
    "https://images.vexels.com/media/users/3/205475/isolated/preview/d6e61f6b598125253f41172057b1d675-ilustraci-oacute-n-del-planeta-plut-oacute-n-by-vexels.png",
    sol:
    "https://images.vexels.com/media/users/3/203427/isolated/preview/b937e0ca42c084b9f2daca7971203be5-ilustraci-oacute-n-de-estrella-sol-by-vexels.png",
    nave:
    "https://images.vexels.com/media/users/3/150034/isolated/preview/29e322a8fe068f39d666137f7c1fc8f8-ilustraci-oacute-n-de-ni-ntilde-os-de-nave-espacial-by-vexels.png"
  },
  images:{},
  mainInterval:undefined,
  dT : 30,
  running  : false,
  initialSetUpDone : false,
  assetsLoaded : false,

  loadImages: async function() {
    return new Promise((resolve, reject)=>{
      let loadedImages = 0;
      let numImages = Object.keys(this.sources).length;
      for (let name in this.sources) {
        this.images[name] = new Image();
        // console.log('loading images', name, loadedImages,numImages)
        this.images[name].onload = function () {
          loadedImages++;
          // console.log(loadedImages)
          if (loadedImages >= numImages) {
            this.assetsLoaded = true;
            resolve()
          }
        };
        this.images[name].src = this.sources[name];
      }
    })
  },
  getCtx:function() {
    this.ctx = this.canvas.getContext("2d");
    // console.log('get ctx')
  },
  loadAssets:async function(){
    await this.loadImages();
  },
  start: async function(){
    this.getCtx()
    await this.loadAssets();
    // while(!this.assetsLoaded)console.log('loading')
    this.setup();// function defined by the user
    this.play();
    
  },
  play: function(){
    if (this.running == false)
    {
      // draw is a function implemented by the user
      this.mainInterval = window.setInterval(this.draw, this.dT);
      this.running = true;
    }
  },
  pause: function(){
    if (this.running == true)
    {
      window.clearInterval(this.mainInterval);
      this.running = false;
    }
  },

  reset:function()
  {
    this.pause();
    this.objects = [];
    this.setup();// function defined by the user
    this.play();
  },
  drawRotatedImage(image, x, y, angle, w, h)
  {
    this.ctx.save();
    this.ctx.translate(x, y);

    this.ctx.rotate(angle * Math.PI/180);

    this.ctx.drawImage(image, -w/2, -h/2, w, h);
    this.ctx.restore();
  }
}

export {GAME}