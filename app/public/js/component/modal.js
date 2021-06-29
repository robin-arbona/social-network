import { removeAllChildNodes, postContent } from "../lib/tools.js";

const displayModal = (title,content,param = null) => {
    title & (document.querySelector("#modal-title").innerHTML = title);
    content & (document.querySelector("#modal-content").innerHTML = content);
    let form = document.querySelector(".form-modal");
    if(param != null){
        form.setAttribute('action',form.getAttribute('action') + '/' + param);
    }
    content & form.addEventListener('submit',async function(e){
        e.preventDefault()
        result = await postContent(this,pathMain+this.getAttribute('action'))
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
        removeAllChildNodes(document.querySelector('.post'));
        pageLoader = new PageLoader(path+'/post',param,target);
    }

}

export {
    displayModal,
    closeModal
}


