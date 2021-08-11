class HttpRequest{

  static get(url, params = {}){
    return HttpRequest.request('GET', url, params);
  }// get

  static delete(url, params = {}){
    return HttpRequest.request('DELETE',url, params);
  } // delete

  static put(url, params = {}){
    return HttpRequest.request('PUT',url, params);
  } // put

  static post(url, params = {}){
    return HttpRequest.request('POST',url, params);
  } //post

  static request(method, url, params = {}){ 
    // static deixa que o method seja chamado sem que a classe seja estanciada
    return new Promise((resolve, reject) =>{
      let ajax = new XMLHttpRequest();

      ajax.open(method.toUpperCase(), url);

      ajax.onerror = event =>{
        reject(e)
      }
      ajax.onload = event =>{      
        let obj = {}  

        try{
          obj = JSON.parse(ajax.responseText)
        } catch(e) {
          reject(e)
          console.error(e)
        }
        resolve(obj);
      };
      ajax.setRequestHeader('Content-type', 'application/json');
      ajax.send(JSON.stringify(params));
      })
  }
}