import React, {useState} from 'react'

export default function TextForm(props) {

    const [text, setText] = useState("");
    const hendleonchange = (event) =>{
        setText(event.target.value);
    }
    const hendelonclick = () =>{
        let newtext = text.toUpperCase();
        setText(newtext);
    } 
    const hendelonclickLowercse = () =>{
        let newtext = text.toLowerCase();
        setText(newtext);
    }
    const hendleSapce = () =>{
        let newtext = '';
        setText(newtext);
    }
    const hendleCopyTest = () =>{
        let text = document.getElementById("Mytextarea");
        text.select();
         document.execCommand("copy"); 
    }
    const hendleExtraSpace = () =>{
        let newtext = text.split(/[ ]+/);
        setText(newtext.join(" "))
    }   
  return (
    <>
    <div className='container' style={{color: props.mode === 'dark' ? 'white' : 'black'}}>
    <h2>{props.heading}</h2>
  <div className="mb-3">
  <textarea className="form-control" value={text} onChange={hendleonchange} style={{backgroundColor:props.mode === 'dark' ? 'gray' : 'white'}} id="Mytextarea" rows="12"></textarea>
</div>
<button className="btn btn-primary mx-2" onClick={hendelonclick} > Covert to uper case</button>
<button className="btn btn-primary mx-2" onClick={hendelonclickLowercse} > Covert to lower case</button>
<button className="btn btn-primary mx-2" onClick={hendleSapce} >CopyText</button>
<button className="btn btn-primary mx-2" onClick={hendleCopyTest} > CopyTest</button>
<button className="btn btn-primary mx-2" onClick={hendleExtraSpace} > ExtraSpace</button>
    </div>
    <div className="container my-3" style={{color: props.mode === 'dark' ? 'white' : 'black'}}> 
        <h2>Your text summary</h2>
        <p>{text.trim().split(/\s+/).filter((word) => word !== "").length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").length} minutes to read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Enter something in the textbox above to preview it here"}</p>
    </div>
    </>
  )
}
