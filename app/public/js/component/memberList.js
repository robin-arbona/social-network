export default class MemberList {
    constructor({path,rootEl}){
        this.path = path;
        this.rootEl = rootEl;
        this.rights_type = sessionStorage.getItem('rights_type')
        this.getList();
    }
    async getList(){
        this.members = await fetch(this.path + '/users').then(response => response.json())
        this.members.data.forEach(member => this.displayMember(member))
    }
    displayMember(member){
        let newEl = document.createElement('div');
        newEl.innerHTML = this.formatMember(member);
        newEl.classList.add('is-grid');
        this.rootEl.appendChild(newEl);
    }
    formatMember(member){
        const rights = ( this.rights_type == 'ADMINISTRATOR' ) 
            ? this.formatRights(member)
            : '';

        return `
        <div class="media m-2">
            <div class="media-content">
                <a href="${this.path}/wall/${member.user_pk_id}"><p  class="title has-text-right is-5">${member.user_firstname}<br /><span class="is-uppercase">${member.user_name}</span></p></a>
                <p class="subtitle has-text-right is-7">${member.user_mail}</p>
            </div>
            <div class="media-left is-vcentered">
                <figure class="image is-48x48">
                    <img class="is-rounded" src="${member.user_picture}" alt="Placeholder image">
                </figure>
            </div>
        </div>
        ${rights}
        <hr />`
    }
    formatRights(member){
        return `
        <div class="select is-small is-rounded is-danger is-centered">
            <select name="RIGHTS" onChange="handleChange(event, ${member.user_pk_id})">
                <option ${member.rights_type == 'USER' ? 'selected' : ''} value="1">USER</option>
                <option ${member.rights_type == 'MODERATOR' ? 'selected' : ''} value="2">MODERATOR</option>
                <option ${member.rights_type == 'ADMINISTRATOR' ? 'selected' : ''} value="3">ADMINISTRATOR</option>
                <option ${member.rights_type == 'NOT_WELCOME' ? 'selected' : ''} value="4">NOT_WELCOME</option>
            </select>
        </div>
        `
    }
}

function handleChange(event,user_id){
    console.log(event.target.value);
    console.log(user_id);
    let url = '/user_rights/' + user_id + '/' + event.target.value;
    fetch(url,{
        method: 'PUT'
    }).then(r=>r.json()).then(json=>console.log(json))
}

window.handleChange = handleChange;