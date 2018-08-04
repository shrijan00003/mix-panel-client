
export const tract = (event , payload) =>{
    console.log('event',event);
    console.log('payload', payload);
}






// export const hello =()=> console.log('hello EVERYONE');

// const identify = (userId = null) => {
//     if (userId === null) {
//       userId = getUUID();
//     }
  
//     localStorage.setItem('id', userId);
//   }
  
//   const track = (event, payload) => {
//     API.track(event, payload, {
//       browser: window.browser,
//       os: window.os,
//       location: getLocation(),
//       userId: localStorage.getItem('id'),
//       clientId: localStorage.getItem('clientId')
//     })
//   }
  
//   const page = () => {
//     API.page(window.location);
//   }
  
//   const load = id => {
//     API.setID(id);
  
//     localStorage.setItem('clientId', id);
//   }
  
//   API.js
//   track = () => {
//     axios.post()
//   }
  
//   export default {
//     load,
//     page,
//     track,
//     identify,
//   }
  
//   import mixpanel from '../../mixpanel';
  
//   mixpanel.load('todo-app-1')
  
//   mixpanel.identify();
  
//   axios.post('/todos', {
//     todo: '123'
//   })
  
//   request.body = {
//     todo: '123'
//   }
  
//   request.user = {
//     id: localStorage.getItem('clentId')
//   }
  