import { removeAllChildNodes, postContent } from "../lib/tools.js";
import PostsLoader from "./postsLoader.js";

const displayModal = (title,content,param = null) => {
    const path = document.querySelector('#pathMain').value;

    title & (document.querySelector("#modal-title").innerHTML = title);
    content & (document.querySelector("#modal-content").innerHTML = content);
    let form = document.querySelector(".form-modal");
    if(param != null){
        form.setAttribute('action',form.getAttribute('action') + '/' + param);
    }
    content & form.addEventListener('submit',async function(e){
        e.preventDefault()
        let result = await postContent(this,path+this.getAttribute('action'))
        if(result.success){
            closeModal(true);
        } else {
            let message = result.message + ': ';
            for (const key in result.errors) {
                const element = result.errors[key];
                message +=  key + '-->' + element + '. ';
            }
            document.querySelector("#modal-footer").innerHTML = message;
        }
 
    });
    document.querySelector(".delete").addEventListener('click',()=>{closeModal(false)});
    document.querySelector(".modal").classList.toggle("is-active");
}

const closeModal = (reload) => {   
    document.querySelector(".modal").classList.toggle("is-active");
    if(reload){
        document.querySelector("#modal-title").innerHTML = "";
        document.querySelector("#modal-content").innerHTML = "";
        postsLoader.reset()
    }

}

export {
    displayModal,
    closeModal
}


