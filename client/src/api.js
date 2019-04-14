const BASE_URL = "http://localhost:4000/api";

export const api = {
    Card: {
        path: `${BASE_URL}/workspaces`,
        all (userId) {
            return fetch(`${this.path}/${userId}/ws`).then(res => res.json());
        },
        one (id) {
            return fetch(`${this.path}/${id}`).then(res => res.json());
        },
        create(params){
            return fetch(`${this.path}/create`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            }).then(res => res.json());
        },
        update(wId, params){
            return fetch(`${this.path}/${wId}/update`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            }).then(res => res.json());
        },
        destroy (wId) {
            return fetch(`${this.path}/${wId}/destroy`).then(res => res.json());
        },
    },
    Blank: {
        path: `${BASE_URL}/workspaces`,
        create (blank) {
            return fetch(`${this.path}/${blank.workspaceId}/blanks/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blank)
            }).then(res => res.json());
        },
        one (wId, index) {
            return fetch(`${this.path}/${wId}/blanks/${index}`).then(res => res.json());
        },
        destroy (wId, index) {
            return fetch(`${this.path}/${wId}/blanks/${index}/destroy`).then(res => res.json());
        },
        all (wId) {
            return fetch(`${this.path}/${wId}/blanks`).then(res => res.json());
        }
    },
    User: {
        path: `${BASE_URL}/users`,
        all () {
            return fetch(`${this.path}/`).then(res => res.json());
        },
        create (params) {
            return fetch(`${this.path}/create`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            }).then(res => res.json());
        },
        authenticate (user) {
            return fetch(`${this.path}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(res => res.json());
        },
        verifyUserName (userName) {
            return fetch(`${this.path}/${userName}`).then(res => res.json())
        },
        update(params){
            return fetch(`${this.path}/update`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            }).then(res => res.json());
        },
    }
    
}