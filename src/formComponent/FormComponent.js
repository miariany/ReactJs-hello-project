import React from "react";
import {BrowserRouter, Redirect} from "react-router-dom";
import {browserHistory, Router, Route} from "react-router";

import Page1  from "./Page1";
import Page2  from "./Page2";
import Page3  from "./Page3";
import Root from "./Root";
class FormComponent extends React.Component{
    state={
        name:"",
        dob:Date,
        navigate1: false,
        navigate2: false,
        navigate3: false
    }

    change = e =>{
        this.setState({
            [e.target.name]: e.target.value 
        });
    };

    onSubmit = e =>{
        e.preventDefault();
        this.props.onSubmit(this.state);

        console.log(this.state.name);    
        console.log(this.state.age);  
        
        //Calculation for age based on date of birth
        const millisecondsBetweenDOBAnd1970 = Date.parse(this.state.dob)
        const millisecondsBetweenNowAnd1970 = Date.now();
        const ageInMilliseconds = millisecondsBetweenNowAnd1970-millisecondsBetweenDOBAnd1970;

        const milliseconds = ageInMilliseconds;
        const second = 1000;
        const minute = second*60;
        const hour = minute*60;
        const day = hour*24;
        const year = day*365;
        const age = Math.round(milliseconds/year);
        console.log("Age now = "+age)
        
        if(age>0 && age<21){
            console.log("Age 1-20");
            this.setState({navigate1:true})
        }else if(age>20 && age<51){
            console.log("Age 21-50");
            this.setState({navigate2:true})
        }else if(age>50){
            console.log("Age >50");
            this.setState({navigate3:true})
        }
    }

    render(){
        const {navigate1} = this.state;
        const {navigate2} = this.state;
        const {navigate3} = this.state;
        if(navigate1){
            console.log("Navigate1 is true")            
            return (
                <Router history={browserHistory}>
                    <Route path={"/"} component={Root}>
                        <Route path={"/page1"}  component={Page1}/>
                    </Route>                    
                </Router>
            // <Router> <Redirect  to="/page1" push={true} Component={Page1} />
            // </Router>
            );
        }else if(navigate2){
            console.log("Navigate2 is true")
            return (
                <Router history={browserHistory}>
                    <Route path={"/"} component={Root}>
                        <Route path={"/page2"}  component={Page2}/>
                    </Route>                    
                </Router>
            );
        }else if(navigate3){
            console.log("Navigate3 is true")
            return (                
                <Router history={browserHistory}>
                    <Route path={"/"} component={Root}>
                        <Route path={"/page3"}  component={Page3}/>
                    </Route>                    
                </Router>
            );
        }
        
        return(
                <form>
                    <table>
                        <tr>
                            <td width="50%">Name </td>
                            <td width="50%">
                            <input 
                                name = "name"
                                placeholder = "Input your name"
                                value={this.state.name}
                                onChange={e => this.change(e)}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">Date of birth</td>
                            <td width="50%">
                            <input 
                                name="dob"
                                type="date"
                                value={this.state.dob}
                                onChange={e => this.change(e)}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td width="50%"></td>
                            <td width="50%">
                                <button onClick={e => this.onSubmit(e)}>Submit</button>
                            </td>
                        </tr>
                    </table>                     
                </form>
                
        );

       
        
    }
}
export default FormComponent;