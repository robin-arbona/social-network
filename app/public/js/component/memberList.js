export default class MemberList {
    constructor({path,rootEl}){
        this.path = path;
        this.rootEl = rootEl;
        this.getList();
    }
    async getList(){
        this.members = await fetch(this.path + '/users').then(response => response.json())
        this.members.data.forEach(member => this.displayMember(member))
    }
    displayMember(member){
        let newEl = document.createElement('div');
        newEl.innerHTML = this.formatMember(member);
        this.rootEl.appendChild(newEl);
    }
    formatMember(member){
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
        <hr />`
    }
}