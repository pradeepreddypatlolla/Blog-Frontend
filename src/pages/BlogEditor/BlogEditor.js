import { CompositeDecorator, ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtmlPuri from "draftjs-to-html";
import { URL as BASE_URL } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "../../context/context";
import { stateFromHTML } from 'draft-js-import-html'
import '../BlogEditor/BlogEditor.css'
export default function BlogEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title,setTitle] = useState("")
  const [content, setContent] = useState();
  const navigate = useNavigate()
  const authState = useAuthState()
  const {blogId} = useParams()

  useEffect(()=>{
    if(blogId==='0'){
      setEditorState(EditorState.createEmpty())
      setTitle("")
    }
  },[blogId])

  const findImageEntities=(contentBlock, callback, contentState)=> {
    console.log("findImageEntities",contentBlock);
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'IMAGE'
        );
      },
      callback
    );
  }

  const Image = (props) => {
    console.log("IMAGE");
    const {
      height,
      src,
      width,
    } = props.contentState.getEntity(props.entityKey).getData();
    console.log(props.contentState.getEntity(props.entityKey).getData());
    return (
      <img src={src} height={height} width={width} />
    );
  };
  const findLinkEntities=(contentBlock, callback, contentState)=> {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  }

  const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} >
        {props.children}
      </a>
    );
  };
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
    {
      strategy: findImageEntities,
      component: Image,
    },
  ]);
  useEffect(()=>{
    if(blogId!=0){

      getBlog()

    }
  },[])


  

  const getBlog = async()=>{
    try {
     
       const reqOptions= {
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authState.token}`
            },
            
            
          }
        
         let blog = await fetch(`${BASE_URL}blogs/${blogId}`,reqOptions)
         blog = await blog.json()
      //  let x=`<h2>Hello Everyone!😀</h2>
      //  <p>This is my first blog on this website.<span style="color: rgb(0,0,0);font-size: medium;font-family: Poppins, sans-serif;">Lets write a javascript code to print Hello World.Lets write a javascript code to print Hello World</span></p>
       
      //  <p>Lets attach a image below.&nbsp;<span style="color: rgb(0,0,0);font-size: medium;font-family: Poppins, sans-serif;">Lets write a javascript code to print Hello World.Lets write a javascript code to print Hello World</span></p>
      // <figure> <img src="http://res.cloudinary.com/dejp9aouq/image/upload/v1678550384/wgved6nsdt18lasstbhr.png" alt="undefined" style="height: undefined;width: undefined" > </figure>
      //  <p>Conclusion:</p>
      //  <p>It is working!</p>`
      console.log(blog.blog.content);
        const blocksFromHTML = convertFromHTML(blog.blog.content);
        
        //const x = (blog.blog.content)
        console.log(blocksFromHTML);
        console.log("block from HTML",blocksFromHTML);
          const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
          );

       setEditorState(EditorState.createWithContent(state,decorator))
       setTitle(blog.blog.title)
        
    } catch (error) {
      
    }
  }



  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
  
    const htmlPuri = draftToHtmlPuri(
      convertToRaw(editorState.getCurrentContent())
    );
 
   setContent(htmlPuri)
  };

  const submitBlog=async()=>{
    let blog = `<div id='content'> ${content} </div> `
    const parser = new DOMParser()
  blog = parser.parseFromString(blog, 'text/html')

  blog = blog.getElementById('content')
  
  let blogTitle=title
 
  let imgs = blog.getElementsByTagName('img');
  
  let imgUrls=[]
  for (let i = 0; i < imgs.length; i++) {

   
    
    let res = await fetch(BASE_URL+"blogs/uploadPhoto", {
      method: "POST",
      body: JSON.stringify({data: imgs[i].src}),
      headers:{
        'Content-type':'application/json',
        'Authorization': `Bearer ${authState.token}`
    
    }
    });
   

    
    res = await res.json();
    
    imgs[i].src = res.url;
    imgUrls.push(res.url)
    let imgWithFigure = document.createElement('div')
    
     imgWithFigure.innerHTML=`<figure> <img src="${imgs[i].src}" >  </figure>`
    
    blog.replaceChild(imgWithFigure,imgs[i])
  }
  let url=BASE_URL+"blogs/submit"
  let reqOptions= {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${authState.token}`
    },
    body: JSON.stringify({title:blogTitle,content: blog.innerHTML,imgUrls:imgUrls} ),
  }
  if(blogId!="0"){
   
    url=BASE_URL+"blogs/update-blog"
    reqOptions= {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authState.token}`
      },
      body: JSON.stringify({blogId:blogId,title:blogTitle,content: blog.innerHTML,imgUrls:imgUrls} ),
    }
  }
  console.log("blog",blog);
  let res = await fetch(url,reqOptions);
  res = await res.json();
  if(res.success){
    alert("Submitted successfully!")
    navigate("/blogs")
    
  }
  }

 async function imageUploadCallback (file) {

  const tempPromise =()=>{
    return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    let dataURL=""
      reader.addEventListener(
        "load",
        () => {
         
          dataURL=reader.result
          resolve(dataURL)
        },
        false
      );

      reader.readAsDataURL(file);
  })
}
   
let dataURL = await tempPromise()

   

    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: dataURL } });
      }
    );
  }



  return (
    <div className="editor-container">
   <h2 style={{textAlign:"center"}}>Blog Editor</h2>
      
      <input className="title" type="text" name="title" id="" value={title} placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
    <div className="editor card">
      <Editor
        editorState={editorState}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: { uploadCallback:imageUploadCallback,
            urlEnabled: true,
            uploadEnabled: true,
            previewImage: true
           },
          inputAccept: 'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
        }}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
       
      />
    </div>
     <div className="submit"> <button className="btn " onClick={submitBlog}>Submit </button> </div> 
    </div>
  );
}
