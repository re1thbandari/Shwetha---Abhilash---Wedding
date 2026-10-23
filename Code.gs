const FOLDER_NAME = 'AbhiShweKalyanam Wedding Photos';
const EVENTS = {haldi:'Haldi Photos',wedding:'Wedding Photos',reception:'Reception Photos'};
function getFolders(){
  const folders=DriveApp.getFoldersByName(FOLDER_NAME);
  const parent=folders.hasNext()?folders.next():DriveApp.createFolder(FOLDER_NAME);
  const result={};
  for(const [event,name] of Object.entries(EVENTS)){
    const matches=parent.getFoldersByName(name);
    result[event]=matches.hasNext()?matches.next():parent.createFolder(name);
  }
  return result;
}
function jsonResponse(data,callback){
  const json=JSON.stringify(data);
  // Only permit safe JavaScript identifier callback names.
  if(callback && /^[A-Za-z_$][A-Za-z0-9_$]{0,99}$/.test(callback)){
    return ContentService.createTextOutput(callback+'('+json+');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
function doGet(e){
  const p=e&&e.parameter?e.parameter:{};
  try{
    if(!EVENTS[p.event])return jsonResponse({success:true,message:'AbhiShweKalyanam Photo Service'},p.callback);
    return jsonResponse({success:true,photos:getPhotos(p.event)},p.callback);
  }catch(err){return jsonResponse({success:false,error:String(err.message||err)},p.callback);}
}
function doPost(e){
  try{
    if(!e||!e.postData||!e.postData.contents)throw new Error('Missing upload data');
    const data=JSON.parse(e.postData.contents);
    const photo=uploadPhoto(data.event,data.filename,data.base64Data,data.mimeType);
    return jsonResponse({success:true,photo});
  }catch(err){console.error(err);return jsonResponse({success:false,error:String(err.message||err)});}
}
function uploadPhoto(event,filename,base64Data,mimeType){
  if(!EVENTS[event])throw new Error('Invalid event');
  if(mimeType!=='image/jpeg')throw new Error('Only processed JPEG photos accepted');
  if(typeof filename!=='string'||!/^guest_[A-Za-z0-9_.-]{8,80}\.jpg$/.test(filename))throw new Error('Invalid filename');
  if(typeof base64Data!=='string'||base64Data.length>9000000)throw new Error('Photo too large');
  const bytes=Utilities.base64Decode(base64Data);
  if(bytes.length<4||bytes[0]!==255||bytes[1]!==216)throw new Error('Invalid JPEG');
  const file=getFolders()[event].createFile(Utilities.newBlob(bytes,mimeType,filename));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);
  return {id:file.getId(),name:file.getName(),url:'https://drive.google.com/thumbnail?id='+encodeURIComponent(file.getId())+'&sz=w1200'};
}
function getPhotos(event){
  if(!EVENTS[event])throw new Error('Invalid event');
  const files=getFolders()[event].getFiles(),photos=[];
  while(files.hasNext()){
    const file=files.next();
    if(file.getMimeType().startsWith('image/'))photos.push({id:file.getId(),name:file.getName(),url:'https://drive.google.com/thumbnail?id='+encodeURIComponent(file.getId())+'&sz=w1200',created:file.getDateCreated().getTime()});
  }
  photos.sort((a,b)=>b.created-a.created);
  return photos;
}
