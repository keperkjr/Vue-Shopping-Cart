import shop from "@/api/shop"
import * as Utils from "@/js/utils"

export default {
    namespaced: true,
    
    state: {
        users: [],
    },

    getters: {
        getUser(state, getters) {
            return (index) => {
                index = (typeof index !== 'object') ? index : getters.getUserIndex(index);
                return state.users[index];
            } 
        }, 
        getUserIndex(state, getters) {
            return ({id, username}) => {
                return state.users.findIndex(
                    item => item.id === id || item.username === username
                );
            }  
        },
    },

    mutations: {
        saveUser(state, data) {
            // save user
            state.users.push(data);
        },      
    },

    actions: {
        createUser(context, data) {
            if (Utils.isEmpty(data.username)) {
                throw new Error('Username not specified!');
            } else if (Utils.isEmpty(data.password)) {
                throw new Error('Password not specified!');
            }
            data.id = getNextId(context);
            context.commit('saveUser', data);  
        },
    },
}

function getNextId(context) {
    let maxId = 0;
    if (context.state.users.length > 0) {
        maxId = Utils.arrayMax(context.state.users, (user) => user.id);        
    }
    ++maxId;
    return maxId;
}