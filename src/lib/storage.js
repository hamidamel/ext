/*global chrome*/

import axios from 'axios';

export async function getStorage(){
    await chrome.storage.sync.get(['token'],(result)=>{
         console.log(result);
         return result;
     });

}

export async function setStorage(data){
    return await chrome.storage.sync.set(data);
}
