export function getRealmObjectCollection(objs){

    let docs = [];

    for(let obj of objs){

       let doc = {};
       obj.keys().forEach((val)=>{
            doc[val] = obj[val];
       })

       docs.push(doc);

    }

    return docs;
}