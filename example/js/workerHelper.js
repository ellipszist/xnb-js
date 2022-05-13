import {XnbData} from "./libs/xnb.module.js";

const bufferToXnb = (function(){
	const worker = new Worker("./js/libs/unpackWorker.js", {type:"module"});

	return function bufferToXnb(buffer)
	{
		return new Promise( (resolve)=>{
			worker.postMessage(buffer);
			worker.onmessage = (e)=>{
				const {header, readers, content} = e.data;
				resolve( new XnbData(header, readers, content) );
			}
		});
	}
})();


export {bufferToXnb};