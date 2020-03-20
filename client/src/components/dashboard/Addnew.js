import React, { Component } from 'react'
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import '../../style/navbar.css'

export class Addnew extends Component {
    state = {
        goldid: "",
        ownerName: "",
        weight: "",
        validated: false,
        setValidated: false
    }
    // posting form data
    onSubmit = e => {
        // const form = e.currentTarget;
        // if (form.checkValidity() === false) {
        //     e.preventDefault();
        //     e.stopPropagation();
        // }
        // this.setState({
        //     setValidated: true
        // });
        const newdata = {
            goldid: this.state.goldid,
            ownerName: this.state.ownerName,
            weight: this.state.weight
        }
        axios.post(`/api/gold`, newdata)
            .then(res => {
                ToastsStore.success("Details added Successfully");
                console.log(res);
                console.log(res.data);
            })
            .catch((err) => {
                console.log("Error: ", err);
                ToastsStore.error("Error Occured!");
            });
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    render() {

        return (
            <div className="row justify-content-center">
                <div className="col-sm-6 align-items-center ">
                    <br></br><br></br><br></br>
                    <Form validated={this.state.validated} onSubmit={this.onSubmit}>
                        <Form.Group>
                            <Form.Label>GoldID</Form.Label>
                            <Form.Control
                                placeholder="GoldID"
                                onChange={this.onChange}
                                value={this.state.goldid}
                                id="goldid"
                                type="text"
                                required />
                            {/* <Form.Text className="text-muted">

                            </Form.Text> */}
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Id.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                placeholder="Name"
                                onChange={this.onChange}
                                value={this.state.ownerName}
                                id="ownerName"
                                type="text"
                            />
                            <Form.Text className="text-muted">

                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                                placeholder="Weight"
                                onChange={this.onChange}
                                value={this.state.weight}
                                id="weight"
                                type="text"
                                required />
                            <Form.Text className="text-muted">

                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Weigth.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            ADD
                        </Button>
                    </Form>
                    {/* To display Toaster */}
                    <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
                </div>
            </div>
        )
    }
}

export default Addnew
