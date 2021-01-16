import shop from "@/api/shop"
import Utils from "@/js/utils"

export default {
    namespaced: true,
    
    state: {
        // {id, email, password}
        users: [],
        loggedInUser: null,
    },

    getters: {
        getLoggedInUser(state, getters) {
            return () => {
                return Utils.isNull(state.loggedInUser) ? state.loggedInUser 
                    : getters.getUser({
                        id: state.loggedInUser,
                    });
            } 
        },        

        getUser(state, getters) {
            return (index) => {            
                index = (typeof index !== 'object') ? index : getters.getUserIndex(index);
                return state.users[index];
            } 
        }, 

        getUserIndex(state, getters) {
            return ({id, email}) => {
                return state.users.findIndex(
                    item => item.id === id || item.email.toLowerCase() === email.toLowerCase()
                );
            }  
        },
    },

    mutations: {
        saveUser(state, data) {
            // save user
            state.users.push(data);
        },   
        
        setLoggedInUser(state, data) {
            state.loggedInUser = data;
        }
    },

    actions: {
        createUser(context, data) {
            return new Promise((resolve, reject) => {
                try {
                    if (Utils.isEmpty(data.email)) {
                        throw new Error('Username not specified!');
                    } else if (Utils.isEmpty(data.password)) {
                        throw new Error('Password not specified!');
                    }
                    data.id = getNextId(context);
                    context.commit('saveUser', data);
                    let user = context.getters.getUser({
                        email: data.email,
                    });

                    setTimeout(() => resolve(user), 100);                    
                } catch(e) {
                    reject(e);
                }
            });  
        },

        logIn(context, data) {
            return new Promise((resolve, reject) => {
                try {
                    let user = context.getters.getUser({email: data});
                    if (Utils.isNull(user)) {
                        throw new Error('Unable to determine user');
                    }            
                    
                    setTimeout(() => {
                        context.commit('setLoggedInUser', user.id);
                        resolve(user);
                    }, 1000);  
                } catch (e) {
                    reject(e);
                }
            });
        },

        logOut(context) {
            return new Promise((resolve, reject) => {
                try {
                    let user = context.getters.getLoggedInUser();
                    if (Utils.isNull(user)) {
                        throw new Error('Unable to determine user');
                    }                       

                    setTimeout(() => { 
                        context.commit('setLoggedInUser', null);
                        resolve(user) 
                    }, 200);    
                } catch (e) {
                    reject(e);
                }
            });      
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