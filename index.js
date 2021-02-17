'use strict';


const { DownloaderHelper} = require('node-downloader-helper');
const decompress = require('decompress')
const path = require("path");
const fse = require('fs-extra');

function download(from,to){
    const file = new DownloaderHelper(`${from}`,__dirname+`${to}`);
    file.on('end',()=>{
        console.log("download completed")
    })
    file.start()

}

function extract(from,to){

    (async function() {
        try{
            const files = await decompress(`${from}`, `${to}`,
            {
                map:file =>{
                    file.path = `my-${file.path}`;
                    return file;
                }
            });
            //console.log(files);
    
        }
        catch(error){
            console.log(error);
        }
    })();
}

function execute(from,to){
    fse.copy( `${from}`, `${to}`, function (err) {
        if (err){
            console.log('An error occured while copying the folder.')
            return console.error(err)
        }
        console.log('Copy completed!')
      });
}

module.exports=download;
module.exports=extract;
module.exports=execute;