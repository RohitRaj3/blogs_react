import { useState, useRef, useEffect, useReducer } from "react";
//Blogging App using Hooks
function blogsReducer(state,action){
    switch(action.type){
        case "ADD":
            return [action.blog, ...state];
        case "REMOVE":
            return state.filter((blog,index)=> index !== action.index);
        default:
            return [];
    }
}
export default function Blog(){
    
    // const [title, setTitle] = useState("");
    // const [context, setContext] = useState("");
    const [formData, setFormData] = useState({title:"", context:""});
    const[blogs,dispatch]= useReducer(blogsReducer, []);    //useReducer  syntax and replace below line which is useState
    // const [blogs, setBlogs] = useState([]);
    const titleRef = useRef("null");

    useEffect(()=> {
        titleRef.current.focus();   //this will do CDM  and make focus as we render or visit page first
    },[])

    useEffect(()=>{
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }
        else{
            document.title = "No Blogs!"
        }
    })
    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
        e.preventDefault();

        // setBlogs([{title: formData.title, context: formData.context}, ...blogs]) //Rest operator is use get whatever is in array get it as it is.
        dispatch({type: "ADD", blog:({title: formData.title, context: formData.context})})
        setFormData({title:"", context: ""})
        titleRef.current.focus();
        // setTitle("");
        // setContext("");  // this will make input empty to reuse
        console.log(blogs);
    }

    function removeBlog(i){
        // setBlogs(blogs.filter((blog,index) => i!==index))
        dispatch({ type : 'REMOVE', index: i });
        titleRef.current.focus();        //this will bring the focus back to title whenever we delete blogs
    }

    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                    value={formData.title}
                                    ref={titleRef}
                                    onChange={(e) => {setFormData({title: e.target.value, context: formData.context})}}

                                />
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.context}
                                    onChange={(e) => {setFormData({title: formData.title, context: e.target.value})}}
                                />
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog,i) => (
            <div className="blog" key={i}>
                <h3>{blog.title}</h3>
                <hr/>
                <p>{blog.context}</p>
                <div className="blog-btn">
                    <button onClick={()=> removeBlog(i)} className="btn remove">Delete</button>
                </div>
            </div>
        ))}

        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
    }